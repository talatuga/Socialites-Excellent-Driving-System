var grade = require('../../model/evaluationModel');
var lesson = require('../../model/lessonModel');

exports.create = function(req, res, next){
    if(res.locals.authenticated == 0) return next();

    var dataInput = JSON.parse(req.body.data);
    var data = [""];
    data.push(dataInput.studID);
    data.push(dataInput.instID);
    data.push(dataInput.comment);
    data.push(dataInput.target);
    data.push(dataInput.courseID);
    data.push(dataInput.grade);
    data.push(dataInput.dateEvaluated);

    grade.addEvaluation(data, function(err, result){
        console.log(err);
        if(err) return next(err);
        res.status(200).send({success: true, detail: "Successfully Created!"});
    });
}

exports.get = function(req, res, next){
    var query = req.query;
    var param = Object.keys(req.params).length ? req.params : null;
    if(param){
        if(Object.keys(query).length != 0){

        }else{
            var field = param.field == undefined ? null : param.field;
            var id = parseInt(param.id) == undefined ? 0 : param.id;
            grade.get(id, field, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});                
            });
        }
    }else{
        var offset = query.offset == undefined ? 0 : parseInt(query.offset);
        var limit = query.limit == undefined ? 10 : parseInt(query.limit);
        grade.getList(offset, limit, function(err, result){
            if(err) return next(err);
            res.status(200).send({success: true, data: result});
        });
    }
}

exports.update = function(req, res, next){
    if(res.locals.authenticated == 0) return next();

    var id = req.params.id;
    var field = req.params.field == undefined ? null : req.params.field.replace(';','');
    var dataIn = JSON.parse(req.body.data);
    
    var data = [];
    data.push(dataIn.grade);
    data.push(dataIn.comment);
    data.push(dataIn.schedID);
    
    // console.log(data);
    grade.update(id, dataIn.grade, "grade", function(err){
        if(err) return next(err);
        grade.update(id, dataIn.comment, "comment", function(er){
            if(er) return next(er);           
            grade.update(id, dataIn.schedID, "schedID", function(errr){
                if(errr) return next(errr);    
                res.status(200).send({success: true, detail: "Successfully modified!"});            
            });     
        });
    });
}

exports.delete = function(req, res, next){
    var id = req.params.id;
    var date = JSON.parse(req.body.data);

    grade.delete(id, date, function(err, done){
        if(err) return next(err);
        res.status(200).send({success: true, detail: "Successfully Deleted!"});
    });
}

exports.addGrade = function(req, res, next){
    if(res.locals.authenticated == 0) return next();

    var dataInput = JSON.parse(req.body.data);
    var data = [""];
    data.push(req.session.instID);
    data.push(req.params.id);
    data.push(dataInput.lessonID);
    data.push(dataInput.grade);
    data.push(dataInput.comment);
    data.push(dataInput.courseID);
    data.push(dataInput.schedID);
    
    // console.log(data);
    grade.create(data, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, detail: "Successfully Created!"});
    });
}

exports.getGradesInst = function(req, res, next){
    if(res.locals.authenticated == 0) return next();
    grade.getGradesInst(req.params.id, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, data: result});
    });
}

exports.getGradesStud = function(req, res, next){
    if(res.locals.authenticated == 0) return next();
    grade.getGradesStudent(req.params.id, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, data: result});
    });
}

exports.getEvalStud = function(req, res, next){
    if(res.locals.authenticated == 0) return next();
    grade.getEvalStud(req.params.id, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, data: result});
    });
}

exports.getGradesSum = function(req, res, next){
    if(res.locals.authenticated == 0) return next();
    grade.getGradesSum(req.params.id, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, data: result[0]});
    });
}

exports.addGradeModal = function (req, res, next){
    if(res.locals.authenticated == 0) return next();
    grade.addGradeModal(req.params.id, req.session.instID, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, data: result});
    });
}

exports.getLessonEnrolled = function(req, res, next){
    if(res.locals.authenticated == 0) return next();

    var studID = req.params.id;
    
    var task1 = new Promise((resolve, reject)=>{
        lesson.getLessonEnrolled(studID, function(err, result){
            if(err) return reject(err);
            resolve(result);
        })
    });

    var task2 = new Promise((resolve, reject)=>{
        lesson.getAvailableLessons(studID, function(err, result){
            if(err) return rejects(err);
            resolve(result);
        });
    });

    Promise.all([task1,task2]).catch(next).then(results=>{
        var allLesson = results[0];
        var availableLesson = results[1];
        var promises = [];

        var sendData = function (){
            res.status(200).send({success: true, data: allLesson});
        }

        if(availableLesson.length == 0){
            sendData();
        }

        availableLesson.forEach((e,i)=>{
            promises.push(new Promise((resolvee, rej)=>{
                var curr = e;
                allLesson.forEach((ee,ii)=>{
                    if(ee.id == curr.lessonID){
                        allLesson.splice(ii, 1);
                        resolvee();
                    }
                    if(ii == allLesson.length-1){
                        resolvee();
                    }
                });
            }));
            
            if(i==availableLesson.length-1){
                Promise.all(promises).catch(next).then((ress)=>{
                    sendData();
                });
            }
        });
    });
}