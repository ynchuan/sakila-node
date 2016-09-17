process.on('message', function(m, server) {
    console.log("child process message");

    if (m === 'server') {
        server.on('connection', function (socket) {
            console.log("child process connection");

            socket.end('handled by child');
        });
    }
});

process.on("exit",function(code,signal){
    console.log("exit code="+code);
    console.log("exit signal="+signal);
});