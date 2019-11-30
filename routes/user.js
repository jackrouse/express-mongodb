var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken")
const userSchema = require("../models/userSchema")
const authMiddleware = require("../middleware/auth")
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next){
  const {username,password} = req.body

  userSchema.find({username})
  .then(result=>{
    if(result.length){
      return Promise.reject(username+'已存在')
    }
  })
  .then(result=>{
    return userSchema.create({
      username,
      password
    })
  })
  .then((result)=>{
    res.json({
      message:"注册成功",
      status:"success",
      code:20000,
    })
  })
  .catch(err=>{
    res.json({
      message:err,
      status:"fail"
    });
  })
})

router.post('/login', function(req, res, next){
  //用户名、密码、验证码
  const {username,password} = req.body
  userSchema.findOne({
    username,
    password
  })
  .then(data=>{
    const content = {id:data.id}
    if(data){
      const token = jwt.sign(content, 'bing', {
        expiresIn: 60*60*1  // 1小时过期
      });
      res.json({
        message:"登录成功",
        status:"success",
        code:20000,
        data:{token}
      });
    }else{
      return Promise.reject()
    }
  })
  .catch(err=>{
    res.json({
      message:"账号或密码错误",
      status:"fail",
    });
  })
});


router.post('/logout', (req, res, next) => {
  res.json({ status: 'success' })
})

router.get('/info',authMiddleware, async (req, res, next)=>{
  console.log(req)
  if(req.user){
    res.json({
      message:"success",
      status:"success",
      code:20000,
      data:req.user
    });
  }else{
    res.json({
      message:"账号或密码错误",
      status:"fail",
    });
  }
})

// export function getRoutes() {
//   return request({
//     url: '/api/routes',
//     method: 'get'
//   })
// }

// export function getRoles() {
//   return request({
//     url: '/api/roles',
//     method: 'get'
//   })
// }

// export function addRole(data) {
//   return request({
//     url: '/api/role',
//     method: 'post',
//     data
//   })
// }

// export function updateRole(id, data) {
//   return request({
//     url: `/api/role/${id}`,
//     method: 'put',
//     data
//   })
// }

// export function deleteRole(id) {
//   return request({
//     url: `/api/role/${id}`,
//     method: 'delete'
//   })
// }



router.get('/info',authMiddleware, async (req, res, next)=>{

})

module.exports = router;
