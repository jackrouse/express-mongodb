const mongoose = require('mongoose')
const comment =  mongoose.Schema({
  article:{type: mongoose.Schema.Types.ObjectId, ref: 'articleList'},
  addTime:{
    type: Date,
    default: Date.now
  },
  from:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  content:String
})

module.exports =  mongoose.model('comment',comment);
