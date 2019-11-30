var express = require('express');
var router = express.Router();
const Test = require("../models/testSchema");
const uploadModel = require("../models/uploadSchema");

const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/www/static/upload/');
  },
  filename: function (req, file, cb) {
    let extName = ''
    if(file.originalname.lastIndexOf('.')!==-1){
      extName = file.originalname.substr(file.originalname.lastIndexOf('.'))
    }
    // cb(null, file.fieldname + extName);
    cb(null, file.originalname);
  }
})

var upload = multer({storage}) // 文件储存路径

router.post('/upload', upload.single('avatar'), function(req, res, next) {
  let file = req.file;
  console.log(file)
  uploadModel.create(file,function(err,result){
    if(err){
      res.json({
        status:"fail",
        error:err
      });
    }else{
      res.json({
        status:"success",
        result
      });
    }
  })
});

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
    console.log(qq)
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
