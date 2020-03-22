const mqtt = require('mqtt');
const db = require('./src/database');
const settings = require("./settings");
const bro = require('./model/broker');

const sendlab = new bro("mqtt://sendlab.avansti.nl:11883","smartmeter_admin","s3_sm4rtm3t3r");
const sensor = new bro("mqtt://broker.michelmegens.net:1883");

    
    

    
// const client = mqtt.connect("mqtt://sendlab.avansti.nl:11883",{
//     username:"smartmeter_admin",
//     password:"s3_sm4rtm3t3r"
// });

const client = mqtt.connect(sendlab.host,{
        username: sendlab.username,
        password: sendlab.password
});

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
    console.log("received on topic" + topic + " message : " + message);

    db._enterRecord(JSON.parse(message));

});


customsensor.on('connect', ()=>{
    console.log("connected to mqtt :" + sensor.host);
    customsensor.subscribe("Moistsensor",()=> {
        console.log("Subscribed to topic: "+ "Moistsensor");
    });   
});

customsensor.on('message',(topic,message)=>{
    console.log("received on topic" + topic + " message : " + message);

    db._enterMeasure(JSON.parse(message));

});



