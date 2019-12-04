const fs = require('fs')
const fsPromises = fs.promises;
const path = require('path')

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
  file.url = `//static.zhansha.love/upload/${file.filename}`
  uploadModel.findOneAndUpdate(
    {
      filename:file.filename
    },
    {
      $set:file
    },
    {
      new:true
    }
  )
  .then(result=>{
    if(result){
      return result
    }else{
      return uploadModel.create(file)
    }
  })
  .then(result=>{
    res.json({
      status:"success",
      data:result,
    });
  })
  .catch(err=>{
    res.json({
      status:"fail",
      error:err
    })
  })
});


router.delete("/delete/:id", (req, res) => {

  uploadModel.findById(req.params.id)
    .then(result => {
      // const url = path.resolve('..','..',result.path)
      const url = path.resolve('..','..',result.path)
      return fsPromises.unlink(url)
    })
    .then(()=>{
      return uploadModel.findByIdAndRemove(req.params.id)
    })
    .then((result)=>{
        res.json({
          status:"success",
          code:20000,
          message:"删除成功"
        })
      })
    .catch(err => res.json({
      status:"fail",
      message:"删除失败"
    }));
});

router.post('/getList', async function(req, res, next) {
  const query = req.body
  const page = +query.page || 1;
  const limit = +query.limit || 10;
  // articleListSchema
  // .findById(req.params.id)
  // .populate('comments')
  // comments
  // .find({article:req.params.id})
  const total = await uploadModel.countDocuments()
  uploadModel
  .find({})
  .skip((page - 1)*limit)
  //对剩下来的数据进行限制返回个数
  .limit(limit)
  .then(result=>{
    res.json({
      status:"success",
      data:result,
      total
    });
  })
  .catch(err=>{
    res.json({
      status:"fail",
      error:err
    });
  })

});


module.exports = router;
