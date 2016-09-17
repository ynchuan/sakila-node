/**
 * Created by wangxunxun on 2016/8/18.
 */
var query=require("../../lib/dbHelper.js").getQuery();
var filmModelHandler={
    getData:function(req){
        var sql='select * from film order by film_id desc limit 0,10';
        return query(sql).then(function(rows){
            return rows;
        });
    }
};

exports.getData=filmModelHandler.getData;