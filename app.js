var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv',).config()

var indexRouter = require('./routes/index');
var adminArticlesRouter = require('./routes/admin/artcles');
var adminCategoryRouter = require('./routes/admin/category');
var adminRoleRouter = require('./routes/admin/role');
var adminUserRouter = require('./routes/admin/user');
var adminAuthRouter = require('./routes/admin/auth');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin/articles', adminArticlesRouter);
app.use('/admin/category', adminCategoryRouter);
app.use('/admin/role', adminRoleRouter);
app.use('/admin/user', adminUserRouter);
app.use('/admin/auth', adminAuthRouter);

module.exports = app;

// const express = require('express');
// const { PrismaClient } = require('@prisma/client');

// const app = express();
// const prisma = new PrismaClient();

// // 解析 JSON 请求体
// app.use(express.json());

// // 创建用户
// app.post('/users', async (req, res) => {
//   const { name, mobile } = req.body;
//   try {
//     const user = await prisma.user.create({
//       data: {
//         name,
//         mobile
//       }
//     });
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// });

// // 获取所有用户
// app.get('/users', async (req, res) => {
//   try {
//     const users = await prisma.user.findMany();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch users' });
//   }
// });

// const port = process.env.PORT || 3010;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// module.exports = app;