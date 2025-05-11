const {connect, publish, disconnect} = require("./base.js");
//const prisma = require('../../prisma/prismaClient');

const clientId = "mqtt_client_id";
const client = connect(clientId);
const qos = 1;
const deviceId = "device/SN-123";
let timer = null;

client.on("connect", function () {
  console.log("连接成功");

  // 订阅主题，测试，实际上由设备端订阅
  let payload = {
    "action": 'keepAlive',
    "time": new Date().getTime(), // 发送当前时间
  }

  const customer = () =>{
    client.subscribe(deviceId, { qos }, function (err) {
      if (!err) {
        console.log("Subscribed to topic: " + deviceId);
        // 发布一条测试消息
        publish(`${deviceId}`, payload, qos);
      }
    });
  
    timer = setInterval(() => {
      console.log("开始发送心跳");
      payload.time = new Date().getTime(), // 发送当前时间
      publish(`${deviceId}`, payload, qos);
    }, 5000);
  }

  const server = () =>{
    client.subscribe("device/#", { qos }, function (err) {
      if (!err) {
        console.log("Subscribed to topic: " + "device/#");
      }
    });
  }
  server();

});

client.on("message", (topic, payload) => {
  // 打印收到的消息
  console.log(topic + ": " + payload);
  try{
    if(typeof payload === "string"){
      payload = JSON.parse(payload);
      console.log("转为json格式：", typeof payload);
    }
  }catch(err){
    console.log(err);
  }
});

client.on('close', () => {
  console.log('关闭连接，清除定时器');
  if(timer){
    clearInterval(timer);
  }
});