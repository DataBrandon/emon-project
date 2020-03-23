const mongoose = require('mongoose');
const settings = require('../settings');
const DefaultModel = require('../model/default');
const MoistModelv1 = require('../model/moistsensor');

const server = settings.DB_HOST;
const database = 'emon-proj';

class Database{
    constructor(){
        this._connect();
    }

    _connect() {
        mongoose.connect(`mongodb://${server}/${database}`)
          .then(() => {
            console.log('Database connection successful : ' + database);
          })
          .catch(err => {
            console.error('Database connection error');
          })
    }

    _enterMeasure(json){
        try{
        const networkid = json["NID"];
        const sensorid = json["SID"];
        const date = new Date();
        const temperature = json["T"];
        const humidity = json["H"];
        
        
        const rec = new MoistModelv1({
                                        NetworkId:networkid,
                                        SensorId:sensorid,
                                        RecordDate:date,
                                        Temperature:temperature,
                                        Humidity:humidity  
                                    });
                                    
            rec.save()
                .then((doc) => {
                    console.log(doc);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        catch{console.log("Could not Add to DB" + json);}
    }

    _enterRecord(json){
        
    const et = json["electricity_tariff"];
    const edt1 = json["energy_delivered_tariff1"];
    const edt2 = json["energy_delivered_tariff2"];
    const ert1 = json["energy_returned_tariff1"];
    const ert2 = json["energy_returned_tariff2"];
    const eid = json["equipment_id"];
    const gdt = json["gas_device_type"];
    const geid = json["gas_equipment_id"];
    const iden = json["identification"];
    const p1 = json["p1_version"];
    const pd = json["power_delivered"];
    const pdl1 = json["power_delivered_l1"];
    const pdl2 = json["power_delivered_l2"];
    const pdl3 = json["power_delivered_l3"];
    const pr = json["power_returned"];
    const prl1 = json["power_returned_l1"];
    const prl2 = json["power_returned_l2"];
    const prl3 = json["power_returned_l3"];
    const timest = json["timestamp"];
    const sign = json["signature"];
    const date = new Date();

        
    try{

       const rec = new DefaultModel({
                                    electricity_tariff:et,
                                    energy_delivered_tariff1:edt1,
                                    energy_delivered_tariff2:edt2,
                                    energy_returned_tariff1:ert1,
                                    energy_returned_tariff2:ert2,
                                    equipment_id:eid,
                                    gas_device_type:gdt,
                                    gas_equipment_id:geid,
                                    identification:iden,
                                    p1_version:p1,
                                    power_delivered:pd,
                                    power_delivered_l1:pdl1,
                                    power_delivered_l2:pdl2,
                                    power_delivered_l3:pdl3,
                                    power_returned:pr,
                                    power_returned_l1:prl1,
                                    power_returned_l2:prl2,
                                    power_returned_l3:prl3,
                                    timestamp:timest,
                                    signature:sign,
                                    RecordDate:date
                                });
                                
        rec.save()
            .then((doc) => {
                console.log(doc);
            })
            .catch(err => {
                console.log(err);
            });
    }

    
catch{console.log("Could not Add default to DB" + json);}
    }
}

module.exports = new Database();
