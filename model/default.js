const mongoose = require('mongoose');


const standard = new  mongoose.Schema({


    electricity_tariff:Number,
    energy_delivered_tariff1:Number,
    energy_delivered_tariff2:Number,
    energy_returned_tariff1:Number,
    energy_returned_tariff2:Number,
    equipment_id:String,
    gas_device_type:Number,
    gas_equipment_id:Number,
    identification:String,
    p1_version:Number,
    power_delivered:Number,
    power_delivered_l1:Number,
    power_delivered_l2:Number,
    power_delivered_l3:Number,
    power_returned:Number,
    power_returned_l1:Number,
    power_returned_l2:Number,
    power_returned_l3:Number,
    timestamp:String,
    signature:String,
    RecordDate:Date
    

});

module.exports = mongoose.model('Standard',standard);

