/**
 * Created by wangxunxun on 2016/8/22.
 */
    //用request模拟http客户端请求。通过method区分post|get请求，get不用req.write即可，同时header注意添加content-type为表单元素
var http = require("http");
var Promise = require("bluebird");
var querystring = require('querystring');
var data = querystring.stringify({
    info:'hi',
    test:5
});
var options = {
    hostname: 'v.baidu.com',
    port: 80,
    path: '/',
    method: 'post',
    headers: {
        'Content-Type':'application/x-www-form-urlencoded',
        'Content-Length': data.length
    }
};
var request=Promise.promisify(http.request);
var req = http.request(options, function (res) {
    console.log(res.statusCode);
    console.log(JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log(chunk);
        console.log("chunk data end.");
    });
    res.on('end', function () {
        console.log('No more data in response.')
    })
});
req.write(data);
req.end();

//var req=request(options).then( function (res) {
//    console.log(res.statusCode);
//    console.log(JSON.stringify(res.headers));
//    res.setEncoding('utf8');
//    res.on('data', function (chunk) {
//        console.log(chunk);
//        console.log("chunk data end.");
//    });
//    res.on('end', function () {
//        console.log('No more data in response.')
//    })
//});
//req.write(data);
//req.end();