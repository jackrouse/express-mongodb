const mongoose = require('mongoose')
// const comment =  mongoose.Schema({
//   addTime:{
//     type: Date,
//     default: Date.now
//   },
//   from:String,
//   content:String
// })

const articleList = mongoose.Schema({
  title:String,
  summary:String,
  content:String,
  publishTime:Date,
  importance:Number,
  author:String,
  imgUrl:String,
  comments:[{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}]
  // comments:[comment]
}, { collection: 'articleList'})
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据

module.exports =  mongoose.model('articleList',articleList);
