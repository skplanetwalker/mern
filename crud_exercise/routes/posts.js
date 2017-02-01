var express = require('express');
var router = express.Router();
var PostModel = require('../models/PostModel');
var CommentModel = require('../models/CommentModel');
var loginRequired = require('../libs/loginRequired');

var path = require('path');
var uploadDir = path.join( __dirname , '../uploads' );
var fs = require('fs');

//multer 셋팅
var multer  = require('multer');
var storage = multer.diskStorage({
    destination : function (req, file, callback) {
        callback(null, '/tmp/uploads');
    },
    filename : function (req, file, callback) {
        callback(null, 'posts-' + Date.now() + '.'+ file.mimetype.split('/')[1] );
    }
});
var upload = multer({ storage: storage });

// csrf 셋팅
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
var bodyParser = require('body-parser');
var parseForm = bodyParser.urlencoded({ extended: false });

router.get('/', function(req, res) {
    PostModel.find({}, function(err, postList) {
        res.render('posts/list', { postList : postList });
    });
});

router.get('/detail/:id', csrfProtection, function(req, res) {
    PostModel.findOne({ id : req.params.id}, function(err, post) {
        CommentModel.find({ post_id : req.params.id } , function(err, comments){
            res.render('posts/detail', { post: post , comments : comments , csrfToken : req.csrfToken() });
        });

    });
});

router.post('/ajax_comment/insert', parseForm, csrfProtection, function(req, res){
    if(req.xhr){ //ajax 일때만 응답
        var Comment = new CommentModel({
            content : req.body.content,
            post_id : parseInt(req.body.post_id)
        });
        Comment.save(function(err, comment){
            res.json({ message : "success" , id : comment.id , content : comment.content });
        });
    }else{
        res.status(404).send('Not found');
    }

});

router.post('/ajax_comment/delete', function(req, res){
    if(req.xhr){ //ajax 일때만 응답
        CommentModel.remove({ id : parseInt(req.body.comment_id) } , function(err){
            res.json({ message : "success" });
        });
    }else{
        res.status(404).send('Not found');
    }
});

router.get('/write', loginRequired, parseForm, csrfProtection, function(req, res) {
    var post = {};
    res.render('posts/edit', { post : post, csrfToken: req.csrfToken() });
});

router.post('/write', upload.single('thumbnail'), csrfProtection, function(req, res) {
    var Post = new PostModel({
        title : req.body.title,
        content : req.body.content,
        thumbnail : (req.file) ? req.file.filename : "",
        username : req.user.username
    });
    var validationError = Post.validateSync();
    if (validationError) {
        res.send(validationError);
    } else {
        Post.save(function(err) {
            if(req.file){
                fs.rename( req.file.path , uploadDir +'/' + req.file.filename , function (err){
                    res.redirect('/posts');
                });
            }else{
                res.redirect('/posts');
            }
        })
    }
});

router.get('/edit/:id', parseForm, csrfProtection, function(req, res) {
    PostModel.findOne({ id : req.params.id }, function(err, post) {
        res.render('posts/edit', { post : post, csrfToken: req.csrfToken() });
    });
});

router.post('/edit/:id', upload.single('thumbnail'), csrfProtection, function(req, res){
    //그 이전 파일명을 먼저 받아온다.
    PostModel.findOne( {id : req.params.id} , function(err, post){
        if (req.file) { //요청중에 파일이 존재 할시 지운다.
            fs.unlinkSync(uploadDir + '/' + post.thumbnail);
        }

        var query = {
            title : req.body.title,
            content : req.body.content,
            thumbnail : (req.file) ? req.file.filename : post.thumbnail
        };
        PostModel.update({ id : req.params.id }, { $set : query } , function(err){
            if(req.file){
                fs.rename( req.file.path , uploadDir + '/' + req.file.filename , function (err){
                    res.redirect('/posts');
                });
            }else{
                res.redirect('/posts');
            }
        });
    });
});

router.get('/delete/:id', parseForm, function(req, res) {
    PostModel.remove({ id : req.params.id }, function(err) {
        res.redirect('/posts');
    });
});

module.exports = router;