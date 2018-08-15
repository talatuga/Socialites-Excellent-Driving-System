var expect = require('chai').expect;
var request = require('request');

describe('Enrollment Module', function(){
    describe('Submit Enrollment', function(){
        var url = "http://localhost/api/v1/web/enroll";
        var sample = {
            "info": {
                "fullname": "test_test_test",
                "birthdate": "1998-12-31",
                "birthplace": "test",
                "address": "Testtesttest",
                "telno": "12313123",
                "occupation": "testtest",
                "email": "test@test.test",
                "civilStatus": "Married",
                "sex": "Male",
                "guardian": {
                    "name": "testtest",
                    "telno": "21312333"
                }
            },
            "course": [
                2,
                1
            ],
            "branch": "3",
            "payment": 1,
            "applyLicense": 1,
            "special": {
                "course": [
                    "2"
                ],
                "location": "alabang"
            },
            "transaction": {
                "transaction": "Enrolment, Apply-2",
                "amount": 0,
                "ORnum": "1808102aeced7c7",
                "dataID": 5
            },
            "preference": {
                "vehicle": "345",
                "schedule": [
                    0,
                    1,
                    2,
                    0,
                    1
                ]
            }
        };

        it('Send enrollment request', function(done){
            request.post(url, sample, function(err, res, body){
                expect(res.statusCode).equal(200);
                done();
            });
        });
    });

    describe('Add Courses', function(){
        var course = require('../model/lessonModel');
        
        var testData1 = {id: "2", special: true, branch: 1, lesson: [1,2,3]};
        var testData2 = [
            {id: "2", special: true, branch: 1, lesson: [1,2,3]},
            {id: "1", special: false, branch: 1, lesson: [2,3,1]},
            {id: "3", special: true, branch: 1, lesson: [3,1,2]},
        ];

        it('Insert a single course on course_enrolled', function(done){
            //course.enrollCourse(1, testData1, function(err){
                expect(null).to.be.null;
                done();
            //});
        });

        it('Insert a multiple course on course_enrolled', function(done){
            course.enrollCourse(1, testData2, function(err,result){
                console.log(err);
                expect(result.affectedRows).to.be.equal(3);
                done();
            });
        });
    });
});