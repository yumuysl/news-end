const express = require('express');
const { query, validationResult } = require('express-validator');
const router = express.Router();
const prisma = require('../../prisma/prismaClient')
const { NotFoundResponse, success, failure} = require('../../utils/response')

async function getArticleDetail(id){
  const article = await prisma.article.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true
    }
  })
  if(!article){
    throw new NotFoundResponse('ID为'+ id + '的文章不存在')
  }
  return article
}
 
//获取文章列表
router.get('/', async(req, res) => {
  try{
    const query = req.query
    console.log("打印query：", query)
    let filters = {}
    const pagination   = {
      offset: (query && (query.currentPage - 1) * ( query.limit || 10)) || 0,
      limit: (query && query.limit) || 10
    }
    if(query && query.title){
      filters.title = {
        contains: query.title
      }
    }
 
    console.log("打印filter和pagination：", filters, pagination)
    const list = await prisma.article.findMany(
      {
        relationLoadStrategy: 'join',
        where: filters,
        include: {
          user: {
            select: {
              id: true,
              username: true,
              nickname: true,
              avatar: true,
              email: true,
              mobile: true,
            }
          },
          category_article: true
        },
        skip: Math.abs(parseInt(pagination.offset)),
        take: Math.abs(parseInt(pagination.limit)),
      }
    ) 
    const total = await prisma.article.count({
      where: filters 
    })
    const result = {
      total,
      currentPage: query.currentPage || 1,
      limit: pagination.limit || 10, 
      data: list, 
    }
    success(res, result)
  }catch(err){
    failure(res, err)
  }
})

//获取文章详情
router.get('/detail/:id', query('id').notEmpty(), async(req, res) => {
  try{
    // const validationData = validationResult(req)
    // console.log("打印validationData：", validationData)
    // if(validationData.errors.length > 0){
    //   throw new Error('参数错误')
    // }
    const id = req.params.id
    console.log("请求数据：", req.params)
    const article  = await getArticleDetail(Math.abs(parseInt(id)))
    success(res, article)
  }catch(err){
    failure(res, err)
  }
})


router.post('/', async(req, res) => {
  try{
    console.log("请求数据：", req.body)
    const { title, content, author, category} = req.body
    const article = await prisma.article.create({
      data: {
        title,
        content,
        author: parseInt(author),
        category: parseInt(category),
        create_time: new Date().toISOString(),
        update_time: new Date().toISOString()
      }
     }).catch(err => {
        failure(res, err)
     })
     
     success(res, article, null, 201)
  }catch(err){
    failure(res, err)
  }
})

router.delete('/:id', async(req, res) => {
  try{
    let { id } = req.params
    console.log("请求数据：", req.params)
    const article  = await getArticleDetail(Math.abs(parseInt(id)))
    await prisma.article.delete({
      where: { id: article.id }
    }).catch(err => {
      failure(res, err)
    })
    success(res, article)

  }catch(err){
    failure(res, err) 
  }

})

router.put('/:id', async(req, res) => {
  try{
    let { id } = req.params
    console.log("请求数据：", req.params)
    const article  = await getArticleDetail(Math.abs(parseInt(id)))
    const { title, content} = req.body
    const updateArticle = await prisma.article.update({
      where: { id: article.id },
      data: {
        title,
        content
      } 
    })
    success(res, updateArticle)

  }catch(err){
    failure(res, err)
  }
})

module.exports = router;