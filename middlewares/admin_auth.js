const jwt = require("jsonwebtoken");
const prisma  = require("../prisma/prismaClient")
const {
  failure,
  UnauthorizedError,
  NotFoundResponse,
} = require("../utils/response");

module.exports = async (req, res, next) => {
 try {
  //判断token是否存在
  const { token } = req.headers;
  if(!token){
    throw new UnauthorizedError('待认证')
  }

  const decoded = jwt.verify(token, process.env.SECRET);
  const { id } = decoded

  //查询用户是否存在
  const user = await prisma.user.findUnique({
    where: {
      id: id
    }
  })

  if(!user){
    throw new UnauthorizedError('用户不存在') 
  }

  //通过验证，将user对象挂载到req上，方便后续中间件或路由使用
  req.user = user

  //加上next，进入后续路由
  next()

 }catch(err){
  failure(res, err)
 }
}