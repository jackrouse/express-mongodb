var express = require('express');
const multer  = require('multer');

var router = express.Router();

const uploadModel = require("../models/uploadSchema");


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

router.post('/', upload.single('avatar'), function(req, res, next) {
  let file = req.file;
  console.log(file)
  file.url = `//static.zhansha.love/upload/${file.filename}`
  uploadModel.create(file,function(err,result){
    if(err){
      res.json({
        status:"fail",
        error:err
      });
    }else{
      res.json({
        status:"success",
        data:result
      });
    }
  })
});

module.exports = router;
