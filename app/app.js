var express = require("express");
var swig = require("swig");
var url = require("url");
var path = require("path");
var lessMiddleware = require('less-middleware');
var app = express();
app.use(lessMiddleware(path.resolve(__dirname , '../static'),{
    once:true
}));//lessMiddleware必须在express.static前
app.use(express.static(path.resolve(__dirname , '../static')));//托管静态文件
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname , '../views'));

app.get("/", function (req, res,next) {
    //req (请求) 和 res (响应) 与 Node 提供的对象完全一致
    //res.send("hello express and node");
    console.info("/-first");
    next("route");
    //next("route");//与中间件不同，中间件会继续执行后续中间件，但是本router中会中止后续路由句柄的执行，转向下一个router的句柄执行。
},function (req, res, next) {
    // 渲染常规页面
    console.info("/-second");
    next();
});
// 没有挂载路径的中间件，应用的每个请求都会执行该中间件【中间件要在路由处理之前挂载，或者路由处理后执行next】
app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});
app.get("/", function (req, res) {
    //req (请求) 和 res (响应) 与 Node 提供的对象完全一致
    res.send("11--hello express and node");
    console.info(url.parse(req.url));
});

app.get('/getfilm',function(req, res){
    require('./action/film.js')(req,res);
});
app.post('/', function (req, res) {
    res.send('Got a POST request');
});

// /user 节点接受 PUT 请求
app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user');
});

// /user 节点接受 DELETE 请求
app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user');
});

app.get('/jsonp',function(req,res,next){
    res.jsonp({status:'jsonp'});
});

app.post('/jsonp',function(req,res,next){
    req.on('data', function (chunk) {
        console.log(new Buffer(chunk).toString());
    });
    res.jsonp({status:'jsonp',method:'post'});
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("app info--" + host + ":" + port);
});
app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


