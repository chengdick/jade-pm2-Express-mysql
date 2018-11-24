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

var  sql = 'SELECT * FROM blogs_details '

/* GET home page. */
router.get('/', function(req, res, next) {
  //查
  connection.query(sql+'limit '+(req.query.page-1)*10+', 10' ,function (err, result,fields) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        } 
        connection.query(sql, function (err, results,fields) {
          if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        } 
        res.render('index', {result:result,page:req.query.page,results:Math.ceil(results.length/10)});
       });
    });
  // res.sendFile("/myapp/views/" + "index.html" )
});



/* post home page. */
router.post('/page', function(req, res, next) {
  
  //查
  connection.query(sql+'limit '+(req.body.page-1)*10+', 10' ,function (err, result,fields) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        } 
        connection.query(sql, function (err, results,fields) {
          if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        } 
        res.json({"code":"1","result":result})
        // res.render('index', {result:result,page:req.query.page,results:Math.ceil(results.length/10)});
       });
  });
});

var  sqls = 'DELETE FROM blogs_details WHERE id = '

router.all('/delete', function(req, res, next) {
  //解析请求参数

  //查
  connection.query(sqls+connection.escape(req.body.id),function (err, result,fields) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      } 
      //把搜索值输出
      res.send(JSON.stringify({"code":"1","result":"删除成功"}));
  });
  
});

module.exports = router;

