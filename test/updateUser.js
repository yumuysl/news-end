const prisma = require('../prisma/prismaClient')
const bcrypt = require('bcryptjs')

function getSelectedUsers(filters) {
  return prisma.user.findMany({
    where: {
      password: filters.password
    }
  })
}

function updateUser(user) {
  return prisma.user.updateMany({
    where: { password: user.password },
    data: {
      password: bcrypt.hashSync(user.password, 10)
    }
  }) 
}

updateUser({ password: '123456' })
  .then((res) => {
    console.log('更新成功', res)
  })
  .catch((err) => {
    console.log('更新失败', err)
  })