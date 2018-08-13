var expect = require('chai').expect;

describe('Web Model test', function(){
    describe('Get', function(){
        var WebModel = require('../model/webModel');
        var db = require('../model/db');
        var model = new WebModel();
        db.connect(db.MODE_TEST, function(err){if(err) return console.error(err);});
        it('should get courses', function(done){
            model.getCourse(null,null,'m', function(err, data){
                expect(err).null;
                done();
            });
        });
        it('should get branches', function(done){
            model.getBranch(null,null,function(err, data){
                expect(err).null;
                done();
            });
        });
    });
    describe("Test getStudentID()", function(){
        var a = require('../model/studentModel');
        var db = require('../model/db');
        db.connect(db.MODE_PRODUCTION, function(err){});
        it('Get Student ID', function(done){
            a.getStudentByID(2, function(err,result){
                expect(result[0].id).not.null;
                done();
            });
        });
    });
});
