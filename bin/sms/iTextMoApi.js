var ITEXTMO = function(){
    var request = require('request');

    var api = process.env.ITEXTMO_API_ENDPOINT;
    var key = process.env.ITEXTMO_API_KEY;
    var status = process.env.ITEXTMO_API_ENDPOINT_CHECK;
    
    this.check = function(cb){
        request({
            method: "GET",
            uri: status + "?apicode=" + key,
        }, function(err, res, body){
            if(err) return cb(err);
            if(res.statusCode == 200){
                cb(null,JSON.parse(body));
            }else{
                cb(new Error(res.statusCode + ":" + res.statusMessage));
            }
        });
    }

    this.send = function(recipient, message, prio, cb){
        request({
            method: "POST",
            uri: api,
            formData: {
                '1': recipient,
                '2': message + "\n",
                '3': key,
                '5': prio == 0 ? "NORMAL" : "HIGH"
            },
        }, function(err, res, body){
            if(err) return cb(err);
            if(res.statusCode == 200){
                cb(null, JSON.parse(body));
            }else{
                cb(new Error(res.statusCode + ":" + res.statusMessage));
            }
        });
    }
}

module.exports = ITEXTMO;