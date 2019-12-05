const mongoose = require('mongoose')
const uploadSchema = mongoose.Schema({
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: Number,
  url:String
}, {
  timestamps: { createdAt: 'createTime',updatedAt:'updateTime'},
  collection: 'uploadFile'
})
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据


const upload = module.exports = mongoose.model('upload',uploadSchema);
