var report = require('../../model/reportsModel');

//GROSS INCOME REPORTS
//STUDENTS REPORT
exports.getStud1 = function(req, res, next){
    if(res.locals.authenticated == 0) return next();
    report.getStud1(req.query.date, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, data: result});
    });
}

//INSTRUCTORS REPORT