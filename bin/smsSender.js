var SMSservice = function(){
    var itextmo = new (require('./sms/iTextMoApi'));
    var status = 1;
    
    this.send = function(recipient, message, priority){
        return new Promise((resolve, reject)=>{
            if(status == 0) return reject("Server is Offline");
            itextmo.send(recipient, message, priority, function(err, res){
                if(err) return reject(err);
                if(res==0){
                    resolve({success: true});
                }else{
                    resolve({success: false, code: res});
                }
                resolve(res);
            });
        });
    };

    this.check = function(){
        return new Promise((resolve, reject)=>{
            itextmo.check(function(err, status){
                if(err) return reject(err);
                resolve(status.result.APIStatus);
            });
        });
    }

    itextmo.check(function(err, status){
        if(err){
            status = 0;
        }else if(status.result.APIStatus != "ONLINE"){
            status = 0;
        }
    });
}

module.exports = SMSservice;