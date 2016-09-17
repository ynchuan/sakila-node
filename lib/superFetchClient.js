/**
 * Created by wangxunxun on 2016/8/28.
 */

var fetch = require('superfetch');
fetch.get('http://127.0.0.1:3000/jsonp').then(function (body) {
    console.log(body);
}).catch(function (response) {

});

