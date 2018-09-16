var db = require('./db');
var log = require('../bin/logger');

var second = 1000;
var minute = second * 60;
var hour = minute * 60;

module.exports = function(){
    if(!process.env.RUN_EVENTS) return log.logger('Event Scheduler Disable. set RUN_EVENT to true on .env file');
    enrollmentExpire();
    remindEnrolmentExpire();
}

function enrollmentExpire(){
    var table = "preregstudent";
    var week = 1;
    var sql = "UPDATE " + table + " SET status = 0 WHERE status > 0 AND DATE_ADD(dateSubmit, INTERVAL "+ week +" WEEK) < now()";
    db.get().query(sql, function(err,result){
        if(err) return log.errLogger(err);
        if(result.affectedRows != 0) log.logger("Expired Enrollment Removed");
    });
    return setTimeout(enrollmentExpire, hour);
}

function remindEnrolmentExpire(){
    var mailer = new (require('../bin/emailer'));
    var table = "preregstudent";
    var day = 5;
    var sql = "SELECT id, data FROM " + table + " WHERE status = 1 AND DATE_ADD(dateSubmit, INTERVAL "+ day +" DAY) < now()";
    db.get().query(sql,function(err, result){
        if(err) return log.errLogger(err);
        if(result.length != 0) log.logger("Sending Enrollment Expiration Reminder Email");
        result.forEach((element,index) => {
            var data;
            try{
                data = JSON.parse(element.data);
            }catch(error){
                return log.errLogger(error);
            }
            var emailAddress = data.info.email;
            var mail = {
                subject: 'Pending Enrollment Reminder',
                body: 'Hello ' + data.info.fullname.replace(/_/g," ") + ',<br>We notice that your enrollment on our school is about to expire on its 1 week due.<br>If you wish to continue your enrollment please settle your enrollment balance.<br><br>Thank you.',
            }
            mailer.send(emailAddress, mail, function(error){
                if(error) return log.errLogger(error);
                sql = "UPDATE " + table + " SET status = 2 WHERE id = ?";
                db.get().query(sql, [element.id], function(err){
                    if(err) return log.errLogger(err);
                });
            });
        });
    });
    return setTimeout(remindEnrolmentExpire, hour);
}