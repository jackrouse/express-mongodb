const jwt = require("jsonwebtoken")
const assert = require("http-assert");
const userSchema = require("../models/userSchema")

module.exports = async (req, res, next) => {
  const token = req.headers.authorization
  if(!token){
    req.errMessage = '无效的jwt token'
    return res.status(401).send({error:'请提供jwt token'})
  }
  // try {
   
  //   if(!id){
  //     req.errMessage = '无效的jwt token'
  //   }
    
  // } catch (error) {
  //   req.errMessage = '无效的jwt token'
  // }

  jwt.verify(token, 'bing',async function(err,decoded){
    if(err) {
      req.errMessage = '无效的jwt token'
      // new Error('无效的jwt token')
      // next()
      return res.status(401).send(err)
    }else{
      console.log(decoded)
      const id = decoded.id
      req.user = await userSchema.findById(id);
      if(!req.user){
        req.errMessage = '请先登录'
        return res.status(401).send({error:'请先登录'})
      }
      next();
    }
  });
 
  // assert(id, 401, "无效的jwt token");

  
  // assert(req.user, 401, "请先登录");

  
};