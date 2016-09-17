/**
 * Created by wangxunxun on 2016/8/18.
 */
var filmModel=require("../model/film");
var filmHandler={
    getData:function(req){
        return filmModel.getData();
    },
    render:function(req,res){
        this.getData(req).then(function(rows){
            //res.send(JSON.stringify(rows));
            res.render('page/films', { films: rows });
        });
    }
};

module.exports=function(req,res){
    filmHandler.render(req,res);
}