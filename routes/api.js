var express = require('express');
var router = express.Router();
const Test = require("../models/testSchema");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    name:'123'
  });
});

router.get('/all', function(req, res, next) {
  var sqlObj = {}
  Test.find(sqlObj,function(err,test){
    if (err) {
      res.json({
        status:"fail",
        error:err
      });
    }else{
      res.json({
        status:"success",
        total:test.length,
        testList:test
      });
    }
  })
});

router.get('/create', function(req, res, next) {
  const {name,age} = req.query
  if(!age){
    return res.json({
      status:"fail",
      error:"age不能为空"
    })
  }
  Test.find({name})
  .then(qq=>{
    if(qq.length){
      return Promise.reject(name+'已存在')
    }
  })
  .then(()=>{
    Test.create({ name, age}, function (err, test) {
      if (err) {
        res.json({
          status:"fail",
          error:err
        });
      }else{
        res.json({
          status:"success",
          message:"新增成功"
        });
      }
    })
  })
  .catch((err)=>{
   res.json({
      status:"fail",
      error:err
    })
    // res.json({
    //   status:"fail",
    //   message:name+"已存在"
    // })
  })

});


module.exports = router;
