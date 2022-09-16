const express = require('express');
const mqtt = require('mqtt');
require("dotenv").config();

const app = express();

var options = {
  host: 'broker.emqx.io',
  port: 1883,
  protocol: 'mqtt'
}

var client = mqtt.connect("http://broker.emqx.io:1883");
const port = process.env.PORT || 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('auto-feeder'))

client.on("connect", function () {
  console.log("succsessfully connected")
  client.subscribe("auto-feeder/nbaf")
  client.subscribe("auto-feeder/nbaf/set-timer")
})

client.on('error', function (error) {
  console.log(error);
});

client.on('message', function (topic, message) {
  //Called each time a message is received
  console.log('Received message:', topic, message.toString());
});

app.post("/feed-now", (req, res) => {
  body_content = req.body.content;
  client.publish("auto-feeder/nbaf", body_content[0]);
  console.log(body_content)
  res.send(`your pet has been fed a ${body_content} serving`);
})

app.post("/set-timer", (req, res) => {
  body_content = req.body;
  client.publish("auto-feeder/nbaf/set-timer", `${body_content.duration}-${body_content.portion}`);
  console.log(body_content)
})

app.listen(port, () => console.log(`app listening on port ${port}`))
