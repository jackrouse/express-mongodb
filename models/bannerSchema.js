const mongoose = require('mongoose')
const bannerSchema = mongoose.Schema({
  imgUrl: String,
  title: String,
  desc: String,
  sortIndex:{
    type:Number,
    default:0
  }
}, {
  
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  },
  collection: 'banner'
})

bannerSchema.index({sortIndex:1})

module.exports = mongoose.model('banner', bannerSchema);