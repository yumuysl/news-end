const {connect, publish, disconnect} = require("./base.js");
const prisma = require('../../prisma/prismaClient');

const clientId = "mqtt_client_id";
const client = connect(clientId);
const qos = 1;
const deviceId = "device/SN-123";
let timer = null;

client.on("connect", function () {
  console.log("连接成功");

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
  console.log('topic:', topic);

  //排除平台收到自己发送的消息
  if(topic === `${deviceId}`)  return
  try{
    let rawData = payload.toString()
    rawData = rawData.replace(/"undefined"/g, 'null');
    const data = JSON.parse(rawData);
    console.log("data: ", data);
  
    const currentDeviceId = topic.split("/")[1];
    if(!currentDeviceId){
      console.log("设备id不存在");
      return; 
    }

    if(currentDeviceId === "connect-status"){
      //设备连接
      if(!!data.connected_at){
        console.log("设备已连接，设备id:", data.client_id)
      }

      //设备断开连接
      if(!!data.disconnected_at){
        console.log("设备已断开连接，设备id:", data.client_id) 
      }
      return;
    }

    let action = data.action
    console.log("action:", action);
    if(action === "keepAlive"){
      console.log("收到心跳");
      return; 
    }
    if(action === "deviceStatus"){
      console.log("收到设备状态");
      return;
    }

    if(action === 'sendDeviceFile'){
      console.log("服务端通知设备上传文件");
      let sendData = {
        "action": 'uploadFile', // 上传文件
        "time": new Date().getTime(), // 发送当前时间
        "data": {
          "file_id": "123",
          "send_time": new Date("2025-05-12").getTime(),
          "target_url": "https://www.baidu.com"
        }
      }
      publish(`${topic}`, sendData, qos);
      return;
    }
    console.log("结束");
  }catch(err){
    console.log("程序错误：", err.message);
  }
});

client.on('close', () => {
  console.log('关闭连接，清除定时器');
  if(timer){
    clearInterval(timer);
  }
});