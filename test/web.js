var expect = require('chai').expect;

describe('Model test', function(){
    var WebModel = require('../model/webModel');
    var db = require('../model/db');
    var model = new WebModel();
    db.connect(db.MODE_TEST, function(err){
        if(err) return console.error(err);
        it('should get courses', function(){
            model.getCourse(null,null,'m', function(err, data){
                console.log(data);
                expect(err).null();
            });
        });
        it('should get branches', function(){
            model.getBranch(null,null,function(err, data){
                console.log(data);
                expect(err).null();
            });
        });
    });
});