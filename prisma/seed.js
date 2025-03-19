const { PrismaClient } = require('@prisma/client')
const mock = require('mockjs')

const prisma = new PrismaClient()

// const userData = mock.mock({
//   'user|10': [
//     {
//       'username': '@last' + '@first',
//       'nickname': '@cname',
//       'password': '123456',
//       'email': '@email',
//       'mobile': '@string("130123456789", 11)',
//       'avatar': '@image("100x100", "#50B347", "#FFF", "Mock.js")',
//       'create_time': new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
//       'update_time': nnew Date(Date.now() + 8 * 60 * 60 * 1000).toISOString()
//     }
//   ]
// })

// const categoryData = mock.mock({
//   'category': [
//     {
//       'name': '其他',
//       'create_time': new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
//       'update_time': new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString()
//     }
//   ]
// })

const articleData = mock.mock({
  'article|3': [
    {
      'title': '@ctitle(5, 20)',
      'content': '@cparagraph(1, 3)',
      'author|1': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      'category': 1,
      'create_time': new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
      'update_time': new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    }
  ] 
})

async function main(){

//   //插入用户数据
//   const hangdleUserData =  await prisma.user.createMany({
//     data: userData.user
//   })
//   console.log(hangdleUserData.count)

//   //插入分类数据
//   const handleCategoryData = await prisma.category.createMany({
//     data: categoryData.category
//   })
//   console.log(handleCategoryData.count)

  //插入文章数据
  const handleArticleData = await prisma.article.createMany({
    data: articleData.article
  })
  console.log(handleArticleData.count)
}

main().then(async () => {
  await prisma.$disconnect() 
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1) 
})