const mqtt = require("mqtt");

// 连接到Broker (例如: test.mosquitto.org)
const brokerUrl = "mqtts://x6e301d3.ala.cn-hangzhou.emqxsl.cn: 8883";

let client = null;

function connect(clientId, isRetry = false) {
  if (client && !isRetry) {
    return client;
  }
  client = mqtt.connect(brokerUrl, {
    username: "momo", // 替换为你的用户名
    password: "123456Oo", // 替换为你的密码
    clientId: clientId, // 替换为你的客户端ID
  });
  return client;
}

function publish(topic, payload, qos = 1) {
  client.publish(topic, JSON.stringify(payload), { qos}, (err)=>{
    if(err){
      console.log("发布失败：", err); 
      return {
        status: "error",
        msg: "发布失败",
        error: err
      }
    }
  });

  return {
    status: "success",
    msg: "发布成功"
  }
}

function disconnect() {
  if (client) {
    client.end(); // 断开连接
    client = null; // 重置客户端实例
    return {
      status: "success",
      msg: "断开连接成功"
    }
  } else {
    return {
      status: "error",
      msg: "未连接"
    }
  }
}

module.exports = { connect, publish, disconnect};