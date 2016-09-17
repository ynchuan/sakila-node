var os=require("os");
for(var key in os){
    if(os.hasOwnProperty(key)){
        if(os[key] instanceof Function){
            console.log(key+"---"+os[key]());
        }else{
            console.log(key+"--32-"+os[key]);
        }
    }
}

//endianness---LE
//hostname---wangxunxunPC
//loadavg---0,0,0
//uptime---479828.7090882
//freemem---1409814528
//totalmem---3947278336
//cpus---[object Object],[object Object],[object Object],[object Object]
//type---Windows_NT
//release---6.1.7601
//networkInterfaces---[object Object]
//arch---x64
//platform---win32
//tmpdir---C:\Users\WANGXU~1\AppData\Local\Temp
//tmpDir---C:\Users\WANGXU~1\AppData\Local\Temp
//getNetworkInterfaces is now called `os.networkInterfaces`.
//    getNetworkInterfaces---[object Object]
//EOL--32-