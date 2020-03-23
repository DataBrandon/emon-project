const mongoose = require('mongoose');


const moistsensorv1 = new  mongoose.Schema({
    NetworkId:Number,
    SensorId:Number,
    RecordDate:Date,
    Temperature:Number,
    Humidity:Number
});

module.exports = mongoose.model('MoistSensorV1',moistsensorv1);

