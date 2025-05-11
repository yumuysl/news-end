const { redisClient, setKey, getKey, delKey } = require('../utils/redis')
redisClient() // 连接Redis服务器
let data = { name: 'Mary', age: 30 }
let key = 'test_1'
setKey(key, data) // 设置键值对，过期时间为60秒

getKey(key).then((res) => { // 获取键值对
  console.log(res) // 输出：{ name: 'John', age: 30 }
  return;
})
