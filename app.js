var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv',).config()
const adminAuth = require('./middlewares/admin_auth');

//后台管理系统路由
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

//前端路由接口


//后台管理路由接口
app.use('/admin/articles', adminAuth, adminArticlesRouter);
app.use('/admin/category', adminAuth, adminCategoryRouter);
app.use('/admin/role', adminAuth, adminRoleRouter);
app.use('/admin/user', adminAuth, adminUserRouter);
app.use('/admin/auth', adminAuthRouter);

module.exports = app;