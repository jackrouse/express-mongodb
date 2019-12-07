var express = require('express');
var router = express.Router();
const assert = require("http-assert");

const bannerSchema = require("../models/bannerSchema");

/* GET home page. */
router.post('/create', function(req, res, next) {
  bannerSchema
  .create(req.body)
  .then(result => res.json({
    status:"success",
    code:20000,
    message:"创建成功"
  }))
  .catch(err => res.json({
    status:"fail",
    message:"创建失败"
  }));
});

router.get('/list', function(req, res, next) {
  // assert(false, 402, "请提供jwt token");
  bannerSchema
  .find({})
  .sort('sortIndex -updateTime')
  .then(result => res.json({
    data:result,
    status:"success",
    code:20000,
    message:"查询成功"
  }))
  .catch(err => res.json({
    status:"fail",
    message:"查询失败"
  }));
});


router.post('/sort', function(req, res, next) {
  const sortArr = req.body.sortArr
  try {
    sortArr.forEach(async(item,index) => {
      await bannerSchema.findByIdAndUpdate(
        item,
        {
          $set:{
            sortIndex:index
          }
        },
        {
          new:true
        }
      )
    });
    res.json({
      status:"success",
      code:20000,
      message:"更改成功"
    })
  } catch (error) {
    res.json({
      status:"fail",
      message:"更改失败"
    })
  }
});

router.delete('/delete/:id', function(req, res, next) {
  const id = req.params.id
  bannerSchema
  .findByIdAndRemove(id)
  .then(result => res.json({
    status:"success",
    code:20000,
    message:"删除成功"
  }))
  .catch(err => res.json({
    status:"fail",
    message:"删除失败"
  }));
});



module.exports = router;
