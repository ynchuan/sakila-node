/**
 * Created by wangxunxun on 2016/9/4.
 */
var fs=require("fs");
fs.readFile("testDbHelper.js",function(err,data){
    if (err){
       return console.error(err);
    }
    console.log(data.toString());
});//该方法将文件一次全部读取，大文件采用createReadStream\

var input=fs.createReadStream('"testDbHelper.js"');
input.on('data',function(data){
    console.log(data);
});

input.on('end',function(data){

});

function printMemoryUsage(){
    var info=process.memoryUsage();
    function mb (v) {
        return (v / 1024 / 1024).toFixed(2) + 'MB';
    }
    console.log('rss=%s, heapTotal=%s, heapUsed=%s', mb(info.rss), mb(info.heapTotal), mb(info.heapUsed));
}