/**
 * Created by wangxunxun on 2016/8/21.
 */
var Promise = require("bluebird");
var mysql = require('mysql');
var pool;
var query;
//var Pool=Promise.promisifyAll(require("mysql/lib/Pool").prototype);
module.exports.getQuery=function(opt){
    if(!query){
        pool=mysql.createPool({
            host: 'localhost' || opt.ip,
            user: 'root' || opt.user,
            password: 'root' || opt.pwd,
            database: "sakila",
            port: 3306
        });
        query=Promise.promisify(pool.query, {
            context: pool
        });
    }
    return query;
};

module.exports.endPool=function(opt){
    if(query){
        query.end(function (err) {

        });
    }
    query=undefined;
};