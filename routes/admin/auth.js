const express = require('express');
const router= express.Router();
const { User } = require('./user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = require('../../prisma/prismaClient');
const { NotFoundResponse, UnauthorizedError, success, failure} = require('../../utils/response');

/**
 *@Author：hayAloe
 *@Date: 2025-03-19 14:24:01
 *@Description: 用户登录
 **/
router.post('/login', async(req, res) => {
  try{
    console.log("请求数据：", req.body)
    const { username, password } = req.body
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true
      }
    })
    if(!user){
      throw new NotFoundResponse('用户不存在')
    }
    if(!bcrypt.compareSync(password, user.password)){
      throw new UnauthorizedError('密码错误')
    }
    const token = jwt.sign({
      id: user.id,
      username: user.username
    }, process.env.SECRET, { expiresIn: '1h' })
    success(res, { token })
  }catch(err){
    failure(res, err)
  }
})

module.exports = router;