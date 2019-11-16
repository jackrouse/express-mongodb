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
  Test.create({ name: 'bingbing' }, function (err, test) {
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
    // saved!
  })
});

router.get('/test',function(req, res, next){
  console.log(req)
  console.log(res)
  console.log(next)
})


module.exports = router;
