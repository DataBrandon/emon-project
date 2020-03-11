const mongoose = require('mongoose');
const settings = require('../settings');
const DefaultModel = require('../model/default');

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

    _enterRecord(json){
       const p1 = json["datagram"]["p1"];
       const signature = json["datagram"]["signature"];

       const s0unit = json["s0"]["unit"];
       const s0label = json["s0"]["label"];
       const s0value = json["s0"]["value"];
       
       
       const s1unit = json["s1"]["unit"];
       const s1label = json["s1"]["label"];
       const s1value = json["s1"]["value"];




       const rec = new DefaultModel({
                                    datagram:{p1,signature},
                                    s0:{s0unit,s0label,s0value},
                                    s1:{s1unit,s1label,s1value}
                                });
                                
        rec.save()
            .then((doc) => {
                console.log(doc);
            })
            .catch(err => {
                console.log(err);
            });
    }


}

module.exports = new Database();
