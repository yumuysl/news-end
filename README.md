## 项目说明
- 项目描述：提供新闻社交类型的后端接口
- 技术栈：Express.js + Prisma + MySQL
- 包管理器：pnpm

## 安装和运行
- 将.env.example文件重命名为.env
- 默认端口号3000，可在.env文件中配置
```bash
# 安装依赖
pnpm install
```
- 新建你自己的数据库，在prisma/schema.prisma和.env文件中配置数据库连接信息
- 运行prisma创建数据表
```bash
prisma migrate dev --name init
```
- 通过种子文件（/prisma/seed.js）填充数据
- 启动项目
```bash
pnpm start
```

## 其他配置 
- 在.env文件中配置JWT密钥SECRET