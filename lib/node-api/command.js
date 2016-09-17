/**
 * Created by lenovo on 2016/6/3.
 */
var work=require("child_process");

work.exec("dir",function(err,stdout,stderr){
    console.log(stdout);
})
