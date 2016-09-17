var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");
var mine = require("./mine").type;
var zlib = require("zlib");
var formidable = require('formidable');
var i = 0;
var serv = http.createServer(function (req, res) {
    //console.log(i);
    i++;
    var pathname = path.normalize(url.parse(req.url).pathname.replace(/\.\./g, ""));
    if (pathname == "\\") {
        res.writeHeader(200, {
            'Content-Type': "text/plain"
        });
        res.write("welcome index");
        res.end();
        return;
    }else if(pathname=="\\upload"){
        //req.on("data",function(a){
        //    console.log(a.toString());
        //});
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        form.uploadDir = "../static-page/20160513-sd-v1.13/upload";
        form.keepExtensions = true;
        form.maxFieldsSize = 2 * 1024 * 1024;

        form.parse(req, function(err, fields, files) {
            res.writeHeader(200, {
                'Content-Type': "text/plain"
            });
            res.write("upload success!");
            res.end();
            console.log("files.fulAvatar="+files.fulAvatar);
        });
        return;
    }
    var realPath = path.join(__dirname, "../static-page/20160513-sd-v1.13", pathname);
    var ext = path.extname(realPath).split(".");
    ext = ext ? ext.slice(1) : "unknow";
    fs.exists(realPath, function (exists) {
        if (!exists) {
            res.writeHead(404, {
                "Content-Type": "text/plain"
            });
            res.write("url:" + pathname + " is not exisits!");
            res.end();
        } else {
            //res.writeHead(200, {
            //    "Content-Type": mine[ext] || "text/plain"
            //});

            fs.stat(realPath, function (err, stat) {
                var lastModified = stat.mtime.toUTCString();
                var size=stat.size;
                if (req.headers["if-modified-since"] && lastModified == req.headers["if-modified-since"]) {
                    res.writeHead(304, "Not Modified");
                    res.end();
                } else {
                    var expires = new Date();
                    expires.setTime(expires.getTime() + 20 * 1000);
                    //res.setHeader("Expires", expires.toUTCString());
                    //res.setHeader("Cache-Control", "max-age=20000");
                    //res.setHeader("Last-Modified", lastModified);
                    res.setHeader("content-length", size);
                    //res.setHeader('Accept-Ranges', 'bytes');
                    res.writeHeader(200, {
                        'Content-Type': mine[ext] || "text/plain",
                        'Content-Encoding': 'gzip'
                    });
                    fs.createReadStream(realPath).pipe(zlib.createGzip()).pipe(res);
                    //fs.readFile(realPath, function (err, file) {
                    //    if (err) {
                    //        res.writeHeader(500, {
                    //            'Content-Type': 'text/plain'
                    //        });
                    //        res.end(err);
                    //    } else {
                    //        var expires = new Date();
                    //        expires.setTime(expires.getTime() + 10 * 1000);
                    //        res.setHeader("Expires", expires.toUTCString());
                    //        res.setHeader("Last-Modified", lastModified);
                    //        res.writeHeader(200, {
                    //            'Content-Type': mine[ext] || "text/plain",
                    //            "Cache-Control": "max-age=10000"
                    //        });
                    //        res.write(file);
                    //        res.end();
                    //    }
                    //});
                }
            });

        }
    });

}).listen(80).on("request", function (req, res) {
    //res.writeHead(200);
    //res.write("hello world"+i);
    //res.end("okay");
});