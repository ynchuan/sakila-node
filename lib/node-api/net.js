var net =require("net");
var server=net.createServer(function(s){
    console.log("server connection");
    s.on("end",function(){
        console.log("server disconnet");
    });
    s.write("hello net!");
    s.end();

});
server.listen(8550,function(){
    console.log("server listening");
})