var expect = require('chai').expect;

describe('Model test', function(){
    describe('Accout Model', function(){
        it('should get courses', function(done){
            require('dotenv').config();
            var model = require('../model/accountModel');
            var db = require('../model/db');
            db.connect(db.MODE_PRODUCTION, function(err){            
                model.getEnrollBal("1808102aeced7c7").then(function(price){
                    expect(price).not.null;
                    //console.log(price);
                    done();
                });
            });
        });
    });
    //Add other model here
});