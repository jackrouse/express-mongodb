const jwt = require("jsonwebtoken")
const assert = require("http-assert");
const userSchema = require("../models/userSchema")

module.exports = async (req, res, next) => {
  const token = req.headers.authorization
  assert(token, 401, "请提供jwt token");
  
  const { id } = jwt.verify(token, 'bing');
  assert(id, 401, "无效的jwt token");

  req.user = await userSchema.findById(id);
  assert(req.user, 401, "请先登录");

  await next();
};