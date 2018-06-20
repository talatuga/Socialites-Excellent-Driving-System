var expect = require('chai').expect;

var model = require('../model/vehicleModel');

describe('Send Email',function(){
    it('should send a test mail', function(){
        var mailer = require('../bin/emailer');
        var Mailer = new mailer({
            service:"gmail", 
            email:"christianpaultupas@gmail.com", 
            password:""
        });

        //var result;
        Mailer.send("christianpaultupas@gmail.com",{subject:"TEST MAIL FROM SED", body:"HELLO WORLD!"},function(err,done){
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