const mongoose = require('mongoose')

const testSchema = mongoose.Schema({
  name :String,
  age : Number,
}, { collection: 'my_col'})
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据


const Test = module.exports = mongoose.model('test',testSchema);
