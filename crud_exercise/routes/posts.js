var express = require('express');
var router = express.Router();
var PostModel = require('../models/PostModel');

router.get('/', function(req, res) {
    PostModel.find({}, function(err, postList) {
        res.render('posts/list', { postList : postList });
    });
});

router.get('/detail/:id', function(req, res) {
    PostModel.findOne({ id : req.params.id}, function(err, post) {
        res.render('posts/detail', { post : post })
    });
});

router.get('/write', function(req, res) {
    var post = {};
    res.render('posts/edit', { post : post});
});

router.post('/write', function(req, res) {
    var Post = new PostModel({
        title : req.body.title,
        content : req.body.content
    });
    Post.save(function(err) {
        res.redirect('/posts');
    });
});

router.get('/edit/:id', function(req, res) {
    PostModel.findOne({ id : req.params.id }, function(err, post) {
        res.render('posts/edit', { post : post });
    });
});

router.post('/edit/:id', function(req, res) {
    var query = {
        title : req.body.title,
        content : req.body.content
    };
    PostModel.update( { id : req.params.id }, { $set : query }, function(err) {
        res.redirect('/posts');
    });
});

router.get('/delete/:id', function(req, res) {
    PostModel.remove({ id : req.params.id }, function(err) {
        res.redirect('/posts');
    });
});

module.exports = router;