//引入express模块
const express = require("express");
const mongoose = require('mongoose')
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const articleListSchema = require("../models/articleListSchema");
const comments = require("../models/comments");
// const userSchema = require("../models/userSchema");


/* GET home page. */
router.post('/create', function(req, res, next) {
    articleListSchema.create(req.body, (err, result) => {
      if (err) {
        res.json({
          status:"fail",
          error:err
        });
      } else {
        res.json({
          code:20000,
          status:"success",
          message:"新增成功"
        });
      }
    });
});


// 查询所有英雄信息路由
router.get("/list", async (req, res) => {
  // var heroPosition = new RegExp(req.body.heroPosition),
  
    var title = req.query.title,
      author = req.query.author,
      page = +req.query.page||1,
      limit = +req.query.limit||10;

  // 根据查询入参个数，动态生成sql查询语句
  var sqlObj = {};

  // if(heroPosition){
  //   sqlObj.heroPosition = heroPosition;
  // }
  if(title){
    sqlObj.title = title;
  }
  if(author){
    sqlObj.author = author;
  }

  
  var articleList = articleListSchema.find(sqlObj);

      //对查询的结果进行筛选，skip跳过结果集中的前多少
      articleList.skip((page - 1)*limit);
      //对剩下来的数据进行限制返回个数
      articleList.limit(limit)
      articleList.select('-content')

    const total = (await articleListSchema.find(sqlObj)).length

    // 实现分页的关键步骤
    articleList.exec(function(err,result){
        if(err){
          res.json({
            status:"fail",
            error:err
          });
        }else{
          res.json({
            status:"success",
            code:20000,
            data:result,
            total:total
          });
          // articleListSchema.find(sqlObj,function(err,res1){
          //   res.json({
          //     status:"success",
          //     code:20000,
          //     data:result,
          //     total:res1.length
          //   });
          // })
          
        }
    })
});


router.delete("/delete/:id", (req, res) => {
  articleListSchema.findOneAndRemove({
    _id: req.params.id
  })
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


router.get("/getDetail/:id", (req, res) => {
  articleListSchema.findById(req.params.id)
    // .populate('comments')
    .select('-comments')
    .then(data => {
      res.json({
        data,
        status:"success",
        code:20000,
      });
    })
    .catch(err => {
      res.json(err);
    });
});


function filterObj(obj,arr){
  return Object.keys(obj).filter(x=>{
    return arr.includes(x)
  }).map(y=>{
    return {
      [y]:obj[y]
    }
  })
}

//更新一条英雄信息数据路由
router.put("/modify/:id", (req, res) => {
  const {title,summary,content,publishTime,importance,author,imgUrl} = req.body
  articleListSchema.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title,summary,content,publishTime,importance,author,imgUrl
      }
    },
    {
      new: true
    }
  )
    .then(hero => res.json({
      status:"success",
      message:"修改成功",
      code:20000,
    }))
    .catch(err => res.json({
      status:"fail",
      error:"修改失败"
    }));
});

router.post('/comment/:id', async function(req, res, next) {
  const {content,from} = req.body



  // .then(result=>{
  //     res.json({
  //       status:"success",
  //       message:"评论成功",
  //       code:20000,
  //     })
  //   })
  
  // const comment = new comments()
  const post = await articleListSchema.findById(req.params.id)
  // const userObj = await userSchema.findById(from)

  const theComment = await comments.create({
    content,
    from:mongoose.Types.ObjectId(from),
    article:post._id
  })

  post.comments.push(theComment._id)
  post.save()
  .then(result=>{
      res.json({
        data:theComment,
        status:"success",
        message:"评论成功",
        code:20000,
      })
    })
    .catch(err=>{
      res.json({
        status:"fail",
        error:err
      });
    })

  
  // const post = new theComment();
  // post.comments.push({
  //   content,
  //   from
  // })

  // post.save()
  // .then(result=>{
  //   res.json({
  //     status:"success",
  //     message:"评论成功",
  //     code:20000,
  //   })
  // })
  // .catch(err=>{
  //   res.json({
  //     status:"fail",
  //     error:err
  //   });
  // })
  // articleListSchema.create(req.body, (err, result) => {
  //   if (err) {
  //     res.json({
  //       status:"fail",
  //       error:err
  //     });
  //   } else {
  //     res.json({
  //       code:20000,
  //       status:"success",
  //       message:"新增成功"
  //     });
  //   }
  // });
});

router.get('/comment/list/:id', async function(req, res, next) {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  // articleListSchema
  // .findById(req.params.id)
  // .populate('comments')
  // comments
  // .find({article:req.params.id})
  const commentData = comments.find({article:req.params.id})
  const total = (await commentData).length

  commentData
  // .find({article:req.params.id})
  .skip((page - 1)*limit)
  //对剩下来的数据进行限制返回个数
  .limit(limit)
  .populate('from')
  .then(result=>{
    res.json({
      data:result,
      status:"success",
      message:"查询成功",
      code:20000,
      total
    })
  })
  .catch(err=>{
    res.json({
      status:"fail",
      error:err
    });
  })
})



module.exports = router;
