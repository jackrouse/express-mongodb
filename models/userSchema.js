const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username : { type: String, unique: true,required:true },
  password : {type:String,select:false,required:true},
  roles:[],
  avatar:String
}, { collection: 'user'})
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据

module.exports = mongoose.model('user',userSchema);
