var expect = require('chai').expect;

var model = require('../model/vehicleModel');

describe('Send Email',function(){
    it('should send a test mail', function(){
        var mailer = require('../bin/emailer');
        var Mailer = new mailer({
            service:"gmail", 
            email:"christianpaultupas@gmail.com", 
            password:"09185671538"
        });

        //var result;
        Mailer.send("christianpaultupas@gmail.com",{subject:"TEST MAIL FROM SED", body:"HELLO WORLD!"},function(err,done){
            if(err) return console.error("error: " + err);
            expect(err).null();
        });
    });
});

/* 
process.on('uncaughtException', function(err) {
	// handle the error safely
	console.log(err);
});
*/