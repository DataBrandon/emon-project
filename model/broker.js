module.exports = class Broker{
    
    constructor(host,username = null,password = null){
        this.host = host;
        this.username = username;
        this.password = password;
    }

};