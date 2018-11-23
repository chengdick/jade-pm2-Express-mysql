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

// var connection = mysql.createConnection({
// host     : 'rm-bp1505575w78f52d3o.mysql.rds.aliyuncs.com',
// user     : 'zeustestdbuser',
// password : 'KMph9Q8U0bVyCB6P6lRZohcby2Y1K_',
// database : 'zeus'
// });

router.get("/",function(req,res,next){
    res.render("login")
})
// //执行创建连接 
connection.connect();
//SQL语句
var  sql = 'SELECT * FROM blogs_login '
router.post('/userlogin', function(req, res, next) {
    //解析请求参数
    //查
    connection.query(sql+'WHERE pass='+connection.escape(req.body.userpassword) +'AND name='+connection.escape(req.body.name) ,function (err, result,fields) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        } 
        if(result.length==0){
            res.json({"code":"-1","result":'账号或密码不对'})
     
            return 
        }
        //把搜索值输出
        res.json({"code":"1","result":result})
   
    });
    
});

var  sqls = 'SELECT * FROM blogs_details '
/* post home page. */
router.post('/page', function(req, res, next) {
    //查
    connection.query(sqls+'limit '+(req.body.page-1)*10+', 10' ,function (err, result,fields) {
          if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
          } 
          connection.query(sqls, function (err, results,fields) {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return;
          } 
          res.json({"code":"1","result":result,total:results.length})
          // res.render('index', {result:result,page:req.query.page,results:Math.ceil(results.length/10)});
         });
      });
  });

module.exports = router;