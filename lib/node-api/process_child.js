var child=require('child_process').fork("process_child_sub.js");

// 创建一个handle对象，发送一个句柄.
var server = require('net').createServer();
server.on('connection', function (socket) {
    console.log("main process connection");
    socket.end('handled by parent');
});
server.listen(1337, function() {
    console.log("main process listen");

    child.send('server', server);
});