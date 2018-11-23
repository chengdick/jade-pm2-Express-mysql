var express = require('express');
var router = express.Router();

var URL = require('url');
//加载mysql模块
var mysql      = require('mysql');
//创建连接
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : 'root',
database : 'test'
});

var  sql = 'INSERT INTO blogs_details (name,details) VALUES  '
var  sqls = 'SELECT * FROM blogs_details WHERE id='
var  sqlupdate= "UPDATE blogs_details SET "
var  isId;
var  upId;
/* GET home page. */
router.get('/', function(req, res, next) {
        console.log(req.query)
        isId=req.query.edieId;
        upId=req.query.id;
        var obj={
            name:"",
            details:""
        }
        if(req.query.edieId==1){
            connection.query(sqls + req.query.id,function (err, result,fields) {
                if(err){
                  console.log('[SELECT ERROR] - ',err.message);
                  return;
                } 
                res.render('add',{title:'修改日志',obj:result[0]});
            });
        }else{
            res.render('add',{title:'新增日志',obj:obj});
        }
        
});

router.all('/addBlogs', function(req, res, next) {
    //解析请求参数
    if(isId==1){
        // 修改

        connection.query(sqlupdate + "name=" + connection.escape(req.body.name) + ", details="+connection.escape(req.body.details)+" WHERE id="+upId,function (err, result,fields) {
            if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
            } 

            res.send(JSON.stringify({"code":"1","result":"添加成功"}));
        });
    }else{
       // 添加
        connection.query(sql + '('+connection.escape(req.body.name)+','+connection.escape(req.body.details)+')',function (err, result,fields) {
            if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
            } 

            res.send(JSON.stringify({"code":"1","result":"添加成功"}));
        });
    }
    
});


module.exports = router;

