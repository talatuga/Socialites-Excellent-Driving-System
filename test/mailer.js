var expect = require('chai').expect;

var model = require('../model/vehicleModel');

describe('Send Email',function(){
    it('should send a test mail', function(_done){
        require('dotenv').config();
        var mailer = require('../bin/emailer');
        var Mailer = new mailer(true);

        //var result;
        Mailer.send("christianpaultupas@gmail.com",{subject:"TEST MAIL FROM SED", body:"HELLO WORLD!"},function(err,done){
            expect(err).null;
            _done();
        });
    });
});