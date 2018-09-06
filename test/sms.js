var expect = require('chai').expect;
var SMS = require('../bin/smsSender');

describe('SMS feature', function(){
    require('dotenv').config();
    var sms = new SMS();
    describe('Check Status', function(){
        it('Test ITEXTMO server status', function(done){
            this.timeout(3000);
            sms.check().then(res=>{
                expect(res).equal("ONLINE");
                done();
            })
        });
    });
    
    describe('Send SMS', function(){
        this.timeout(5000);
        it('send test text message', function(done){
            setTimeout(()=>{
                sms.send("09283820273", "TEST SMS FROM Socialites Driving Excellence System USING ITEXTMO\n\n", 0).then(res=>{
                    expect(res).to.equal(0);
                    done();
                }).catch(reason=>{
                    expect(reason).not.equal("Server is Offline");
                    done();
                });
            }, 2000)
        });
    });
});