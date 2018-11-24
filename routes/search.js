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
  console.log()
  connection.query(sql+'WHERE id='+req.query.id,function (err, result,fields) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        } 

        res.render('search', {detalis:result[0]});
    });

  // res.sendFile("/myapp/views/" + "index.html" )
});



module.exports = router;

