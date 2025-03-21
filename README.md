# 项目文档

## 项目介绍
- 项目名称：新闻发布系统
- 提供API接口给前端
- 核心功能：用户管理、新闻管理、新闻分类管理、评论管理、点赞、审核管理、角色管理、权限管理、统计、消息通知等。

## 技术栈
- Node.js + Express + MySQL + Prisma

## 数据库设计
### 用户表user
- id：主键，自增
- username：用户名，唯一
- nickname：昵称
- password：密码
- avatar：头像
- email：邮箱
- mobile：手机号
- status：状态，0：禁用，1：启用
- ban_start: 禁用开始时间
- ban_end: 禁用结束时间
- is_active: 是否激活
- create_time：创建时间
- update_time：更新时间

### 新闻表news
- id：主键，自增
- title：新闻标题
- content：新闻内容
- author：作者ID
- category_id：分类ID
- status：状态，0：草稿，1：待审核，2：已发布 3. 已驳回
- is_active: 是否激活
- create_time：创建时间
- update_time：更新时间

###  新闻分类表 category
- id：主键，自增
- name：分类名称
- is_active: 是否激活
- create_time：创建时间
- update_time：更新时间

### 评论表comment
- id：主键，自增
- content：评论内容
- from_author：评论人ID
- target_author：被评论人ID
- father_comment_id：父评论ID
- news_id：新闻ID
- is_active: 是否激活
- create_time：创建时间
- update_time：更新时间

### 点赞表like
- id: 主键，自增
- from_author: 点赞人ID
- target_author: 被点赞人ID
- news_id: 新闻ID
- is_active: 是否激活
- create_time: 创建时间
- update_time: 更新时间

### 审核记录表checknews
- id: 主键，自增
- news_id: 新闻ID
- title: 标题
- content: 内容
- check_author: 审核人ID
- result: 0驳回  1通过
- reason: 驳回原因
- check_time: 审核时间
- is_active: 是否激活
- create_time: 创建时间
- update_time: 更新时间

### 角色表role
- id: 主键，自增
- name: 角色名称
- auth_list: 权限列表
- auth_list: 权限列表
- is_active: 是否激活
- create_time: 创建时间
- update_time: 更新时间

### 消息通知
- id: 主键，自增
- title: 通知标题
- content: 通知内容
- author: 作者ID
- type: 1系统通知  2.审核通知  3.作品通知
- is_active: 是否激活
- create_time: 创建时间
- update_time: 更新时间EWQ3