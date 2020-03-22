const mongoose = require('mongoose');


const portablesensorv1 = new  mongoose.Schema({


    Temperature:Number,
    Humidity:Number,
});

module.exports = mongoose.model('MoistSensorV1',moistsensorv1);

