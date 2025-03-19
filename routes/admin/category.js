const express = require('express');
const { query, validationResult } = require('express-validator');
const router = express.Router();
const prisma = require('../../prisma/prismaClient')
const { NotFoundResponse, success, failure} = require('../../utils/response')

async function getCategoryDetail(id){
  const category = await prisma.category.findUnique({
    where: { id },
    select: {
      id: true,
      name: true
    }
  })
  if(!category){
    throw new NotFoundResponse('ID为'+ id + '的分类不存在')
  }
  return category
}
 
//获取分类列表
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
    const list = await prisma.category.findMany(
      {
        relationLoadStrategy: 'join',
        where: filters,
        skip: Math.abs(parseInt(pagination.offset)),
        take: Math.abs(parseInt(pagination.limit)),
      }
    ) 
    const total = await prisma.category.count({
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

//获取分类详情
router.get('/detail/:id', query('id').notEmpty(), async(req, res) => {
  try{
    const validationData = validationResult(req)
    console.log("打印validationData：", validationData)
    if(validationData.errors.length > 0){
      throw new Error('参数错误')
    }
    const id = req.params.id
    console.log("请求数据：", req.params)
    const category  = await getCategoryDetail(Math.abs(parseInt(id)))
    success(res, category)
  }catch(err){
    failure(res, err)
  }
})


router.post('/', async(req, res) => {
  try{
    console.log("请求数据：", req.body)
    const { name } = req.body
    const categoryData = await prisma.category.create({
      data: {
        name,
        create_time: new Date().toISOString(),
        update_time: new Date().toISOString()
      }
     }).catch(err => {
        failure(res, err)
     })
     
     success(res, categoryData, null, 201)
  }catch(err){
    failure(res, err)
  }
})

router.delete('/:id', async(req, res) => {
  try{
    let { id } = req.params
    console.log("请求数据：", req.params)
    const category  = await getCategoryDetail(Math.abs(parseInt(id)))
    await prisma.category.delete({
      where: { id: category.id }
    }).catch(err => {
      failure(res, err)
    })
    success(res, category)

  }catch(err){
    failure(res, err) 
  }

})

router.put('/:id', async(req, res) => {
  try{
    let { id } = req.params
    console.log("请求数据：", req.params, req.body)
    const category  = await getCategoryDetail(Math.abs(parseInt(id)))
    const { name, is_active } = req.body
    const updateCategory = await prisma.category.update({
      where: { id: category.id },
      data: {
        name,
        is_active
      } 
    })
    success(res, updateCategory)

  }catch(err){
    failure(res, err)
  }
})

module.exports = router;