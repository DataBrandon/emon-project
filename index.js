const mqtt = require('mqtt');
const db = require('./src/database');
const settings = require("./settings");
const bro = require('./model/broker');

const express = require('express');
const bp = require('body-parser');

const sendlab = new bro("mqtt://sendlab.avansti.nl:11883","smartmeter_admin","s3_sm4rtm3t3r");
const sensor = new bro("mqtt://broker.michelmegens.net:1883");
const smartroute = require('./routes/smartmeter');
const moistroute = require('./routes/moistmeter');


var ex = express();
ex.use(bp.json());

ex.use('/smartmeter',smartroute);
ex.use('/moistmeter',moistroute);
    
//connect to endpoint smartmeter
const client = mqtt.connect(sendlab.host,{
        username: sendlab.username,
        password: sendlab.password
});
//connect to endpoint Moisture Sensor
const customsensor = mqtt.connect(sensor.host);
 console.log("ready to start");
 db._connect();
 console.log(client.connected);
 client.on('connect', ()=>{
     console.log("connected to mqtt: " + sendlab.host);
     client.subscribe(settings.MQTT_TOPIC,()=> {
         console.log("Subscribed to topic:"+ settings.MQTT_TOPIC);
     });   
 });

 client.on('message',(topic,message)=>{
    db._enterRecord(JSON.parse(message));

});


customsensor.on('connect', ()=>{
    console.log("connected to mqtt :" + sensor.host);
    customsensor.subscribe("Moistsensor",()=> {
        console.log("Subscribed to topic: "+ "Moistsensor");
    });   
});

// remove old versions without Date
//db._cleanModel();

customsensor.on('message',(topic,message)=>{
    db._enterMeasure(JSON.parse(message));

});

ex.listen(3000,() => {
    console.log("Listening on port 3000");
});

