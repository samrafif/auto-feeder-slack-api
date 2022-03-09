const express = require('express')
const mqtt = require('mqtt');
require('dotenv').config();

const app = express();

var options = {
  host: '859e0bb831174205b230441f4f248e70.s1.eu.hivemq.cloud',
  port: 8883,
  protocol: 'mqtts',
  username: 'CloudMQTT',
  password: process.env.MQTT_PASSWORD
}

var client = mqtt.connect(options);
const port = 3000;

app.use(express.urlencoded({extended:true}));

client.on("connect", function () {
  console.log("succsessfully connected")
})

app.post("/feed-now", (req, res) => {
  body_contents = req.body.content;
  client.publish("auto-feeder/nbaf", body_content);
  res.send(`your pet has been fed a ${body_content} serving`);
})

app.listen(port, () => console.log(`app listening on port ${port}`))
