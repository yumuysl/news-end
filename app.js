const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv',).config()
const adminAuth = require('./middlewares/admin_auth');

//后台管理系统路由
const indexRouter = require('./routes/index');
const adminArticlesRouter = require('./routes/admin/artcles');
const adminCategoryRouter = require('./routes/admin/category');
const adminRoleRouter = require('./routes/admin/role');
const adminUserRouter = require('./routes/admin/user');
const adminAuthRouter = require('./routes/admin/auth');
const cors = require('cors');


const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//CORS跨域配置，需要在其他路由上面
const corsOptions = {
    origin: 'http://127.0.0.1:5000'
}
app.use(cors(corsOptions))

app.use('/', indexRouter);

//前端路由接口


//后台管理路由接口
app.use('/admin/articles', adminAuth, adminArticlesRouter);
app.use('/admin/category', adminAuth, adminCategoryRouter);
app.use('/admin/role', adminAuth, adminRoleRouter);
app.use('/admin/user', adminAuth, adminUserRouter);
app.use('/admin/auth', adminAuthRouter);

module.exports = app;