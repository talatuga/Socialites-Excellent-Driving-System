var expect = require('chai').expect;

var model = require('../model/vehicleModel');

describe('getList()',function(){
    it('should display correct output', function(){
        var db = require('../model/db');
        db.connect(db.MODE_PRODUCTION, function(err){
            if(err) return;
            console.log('connected.');
        });

        var car = Object.create(model);
        car.table = "vehicle";
        car.db = db;

        //var result;

        car.getList(0, 3, function(err, _result){
            if(err) return;
            console.log(JSON.stringify(_result));
            expect(_result).to.be.length(3);
        });
    });
});

/* 
process.on('uncaughtException', function(err) {
	// handle the error safely
	console.log(err);
});
*/