const mongoose = require('mongoose');


const portablesensorv1 = new  mongoose.Schema({


    electricity_tariff:Number,
    energy_delivered_tariff1:Number,
    energy_delivered_tariff2:Number,
    energy_returned_tariff1:Number

    

});

module.exports = mongoose.model('PortableSensorV1',portablesensorv1);

