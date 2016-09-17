/**
 * Created by wangxunxun on 2016/8/21.
 */
var query=require('./dbHelper').getQuery();
var sql='select * from film order by film_id desc limit 0,10';
query(sql).then(function(rows){
    rows.forEach(function(i,r){
        console.log('The result is: '+r, JSON.stringify(i));
    });
});