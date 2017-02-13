require('./removeByValue')();

module.exports = function(io) {
    var userList = [];
    var userCount = 1;
    io.on('connection', function(socket){

        var session = socket.request.session.passport;
        var user = (typeof session !== 'undefined') ? ( session.user ) : "";
        
        // userList 필드에 사용자 명이 존재 하지 않으면 삽입
        if(userList.indexOf(user.username) === -1){
            userList.push(user.username);
        }
        io.emit('join', userList);

        socket.on('chat message', function(data){
            io.emit('chat message', { message : data.message , username : user.username });
        });

        socket.on('disconnect', function(){            
            userList.removeByValue(user.username);
            io.emit('leave', userList);
        });
    });
};