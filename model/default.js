const mongoose = require('mongoose');

const standard = new  mongoose.Schema({
    datagram: {
        p1:String,
        signature:String
    }
    ,
    s0: {
        unit:String,
        label:String,
        value:Number
    }
    ,
    s1: {
        unit:String,
        label:String,
        value:Number
    }
});

module.exports = mongoose.model('Standard',standard);

