var grade = require('../../model/evaluationModel');

exports.create = function(req, res, next){
    if(res.locals.authenticated == 0) return next();

    //tinanggal ko muna yung para sa evaluation para matest kung gumagana yung adding ng grades
    var dataInput1 = JSON.parse(req.body.data);
    // var data = [""];
    // data.push(req.session.studID);
    // data.push(dataInput.instID);
    // data.push(dataInput.comment);
    // data.push(dataInput.target);
    // data.push(dataInput.courseID);
    // data.push(dataInput.grade);
    // data.push(dataInput.dateEvaluated);

    // grade.addEvaluation(data, function(err, result){
    //     console.log(err);
    //     if(err) return next(err);
    //     res.status(200).send({success: true, detail: "Successfully Created!"});
    // });

    var gradesData = [""];
    gradesData.push(req.session.instID);
    gradesData.push(dataInput1.studID);
    gradesData.push(dataInput1.lessonID);
    gradesData.push(dataInput1.grade);
    gradesData.push(dataInput1.comment);
    gradesData.push(dataInput1.courseID);
    gradesData.push(dataInput1.schedID);
    
    console.log(gradesData);
    grade.addGrade(gradesData, function(err, result){
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
    var id = req.params.id;
    var field = req.params.field == undefined ? null : req.params.field.replace(';','');
    var dataIn = JSON.parse(req.body.data);
    //VALIDATIONS
    var breakDownID = id.split("-");
    var account = parseInt(breakDownID[1].slice(0,3));
    var info = parseInt(breakDownID[1].slice(3,6));
    
    var data = {
        infoID: info,
        info: [],
        credential: {},
    };
    data.info.push(account);
    data.info.push(dataIn.fullname);
    data.info.push(dataIn.address);
    data.info.push(dataIn.telno);
    data.info.push(dataIn.bdate);
    data.info.push("n/a");
    data.info.push(dataIn.sex);
    data.info.push("n/a");
    data.info.push(dataIn.email);
    data.info.push(2);

    data.credential["id"] = account;
    data.credential["username"] = dataIn.username;
    data.credential["password"] = dataIn.password;
    data.credential["type"] = 2;

    data["license"] = dataIn.license;
    data["educ"] = dataIn.education;
    //data["vacant"] = dataIn.vacant;
    
    instructor.update(id, data, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, detail: "Successfully Modify!"});
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

// exports.addGrade = function(req, res, next){
//     if(res.locals.authenticated == 0) return next();

//     var dataInput = JSON.parse(req.body.data1);
//     var gradesData = [""];
//     data.push(req.session.instID);
//     data.push(dataInput.studID);
//     data.push(dataInput.lessonID);
//     data.push(dataInput.grade);
//     data.push(dataInput.comment);
//     data.push(dataInput.courseID);
//     data.push(dataInput.schedID);
    
//     console.log(gradesData);
//     grade.create(gradesData, function(err, result){
//         console.log(err);
//         if(err) return next(err);
//         res.status(200).send({success: true, detail: "Successfully Created!"});
//     });
// }