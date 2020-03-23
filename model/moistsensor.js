const mongoose = require('mongoose');


const moistsensorv1 = new  mongoose.Schema({
    NetworkId:Number,
    SensorId:Number,
    Temperature:Number,
    Humidity:Number
});

module.exports = mongoose.model('MoistSensorV1',moistsensorv1);

