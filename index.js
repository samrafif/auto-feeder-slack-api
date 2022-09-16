const express = require('express')
const mqtt = require('mqtt');

const app = express();

var options = {
  host: 'broker.emqx.io',
  port: 1883,
  protocol: 'mqtt'
}

var client = mqtt.connect(options);
const port = process.env.PORT || 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('auto-feeder'))

client.on("connect", function () {
  console.log("succsessfully connected")
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

app.listen(port, () => console.log(`app listening on port ${port}`))
