const mqtt = require('mqtt');
const db = require('./src/database');
const settings = require("./settings");

console.log(settings.MQTT_BROKER);
console.log(settings.MQTT_USERNAME);
console.log(settings.MQTT_PASSWORD);
console.log(settings.MQTT_PORT);



const client = mqtt.connect(settings.MQTT_BROKER,{username:settings.MQTT_USERNAME,password:settings.MQTT_PASSWORD,clientId:"f1ced164-d3e6-4e80-8725-69034025fe02"});

console.log("ready to start");
db._connect();
console.log(client.connected);
client.on('connect',()=>{
    client.subscribe(settings.MQTT_TOPIC,()=> {
        console.log("Subscribed to topic:"+ settings.MQTT_TOPIC);
    });   
});

client.on(settings.MQTT_TOPIC,(topic,message)=>{
    console.log("received on topic" + topic + " message : " + message.toString);

    db._enterRecord(JSON.parse(message));

});
console.log(client.connected);


