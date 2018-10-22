var report = require('../../model/reportsModel');
var pdf = require('../../bin/pdfGenerator');

//STUDENTS REPORT
exports.getStud = function(req, res, next){
    if(res.locals.authenticated == 0) return next();
    var fileName;

    var freq = req.query.freq;
    var title = req.query.report;

    var createReport = function(student){
        pdf.generateView(pdf.reportTemplates.enrollees, student, function(err, html){
            if(err) return next(err);
            pdf.generatePDF(html, pdf.getBuffer, function(err, buffer){
                if(err) return next(err);
                // res.set('Content-disposition', 'attachment; filename=' + fileName);
                res.set('Content-Type', 'Application/pdf');
                res.status(200).send(buffer);
            });
        });
    }

    if (title=="Enrollees"){
        fileName = "Students: Enrollees [Report].pdf";
        if (freq=="1"){
            report.getStud1A(req.query.date, req.query.branch).then(data=>{
                var student = {
                    title: "Students",
                    title2: "Enrollees",
                    reqDate: Date.parse(req.query.date).toString('MMM dd, yyyy'),
                }
                createReport(student);
            }).catch(reason=>{
                next(reason);
            });
        }
        else if (freq=="2"){
            report.getStud1B(req.query.week, req.query.year, req.query.branch, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="3"){
            report.getStud1C(req.query.month, req.query.year, req.query.branch, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="4" || freq=="5"){
            report.getStud1D(req.query.monthto, req.query.monthfrom, req.query.yearto, req.query.yearfrom, req.query.branch, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="6"){
            report.getStud1E(req.query.year, req.query.branch, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
    }

    else if (title=="Transferees"){
        fileName = "Students: Transferees [Report].pdf";
        if (freq=="1"){
            report.getStud2A(req.query.date, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="2"){
            report.getStud2B(req.query.week, req.query.year, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="3"){
            report.getStud2C(req.query.month, req.query.year, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="4" || freq=="5"){
            report.getStud2D(req.query.monthto, req.query.monthfrom, req.query.yearto, req.query.yearfrom, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="6"){
            report.getStud2E(req.query.year, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
    }

    else if (title=="Enrolled Students"){
        fileName = "Students: Enrolled Courses [Report].pdf";
        if (freq=="1"){
            report.getStud3A(req.query.date, req.query.branch, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="2"){
            report.getStud3B(req.query.week, req.query.year, req.query.branch, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="3"){
            report.getStud3C(req.query.month, req.query.year, req.query.branch, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="4" || freq=="5"){
            report.getStud3D(req.query.monthto, req.query.monthfrom, req.query.yearto, req.query.yearfrom, req.query.branch, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="6"){
            report.getStud3E(req.query.year, req.query.branch, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
    }

    else if (title=="Performance Evaluation"){
        fileName = "Students: Performance Evaluation [Report].pdf";
        if (freq=="1"){
            report.getStud4A(req.query.date, req.query.branch, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="2"){
            report.getStud4B(req.query.week, req.query.year, req.query.branch, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="3"){
            report.getStud4C(req.query.month, req.query.year, req.query.branch, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="4" || freq=="5"){
            report.getStud4D(req.query.monthto, req.query.monthfrom, req.query.yearto, req.query.yearfrom, req.query.branch, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="6"){
            report.getStud4E(req.query.year, req.query.branch, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
    }
}

exports.enrolled = function(req, res, next){
    var query = req.query;

    if(!query.freq || !query.date) return res.status(400).send('Invalid Request');

    report.enrollee(query, function(err, result){
        if(err) return next(err);
        if(!result) return res.status(400).send("Invalid Data");
        var dateStart = Date.parse(result.dateStart);
        var dateEnd = Date.parse(result.dateEnd);
        dateEnd = dateEnd.compareTo(dateStart) != 0 ? dateEnd : dateStart;
        result.dateEnd = dateEnd.toString('MMMM dd, yyyy'); 
        result.dateStart = dateStart.toString('MMMM dd, yyyy'); 
        
        pdf.createPDF(pdf.reportTemplates.enrollees, result, pdf.getBuffer, function(err, buffer){
            if(err) return next(err);
            var fileName = "Students: Enrollees["+ dateStart.toString('MM/dd/yyyy') + (dateEnd.compareTo(dateStart) != 0 ? dateEnd.toString(' - MM/dd/yyyy'): "") +"].pdf";
            // res.set('Content-disposition', 'attachment; filename=' + fileName);
            res.set('Content-Type', 'Application/pdf');
            res.status(200).send(buffer);
        });
    });
}

exports.transferred = function(req, res, next){
    var query = req.query;

    if(!query.freq || !query.date) return res.status(400).send('Invalid Request');

    report.transferee(query, function(err, result){
        if(err) return next(err);
        if(!result) return res.status(400).send("Invalid Data");
        var dateStart = Date.parse(result.dateStart);
        var dateEnd = Date.parse(result.dateEnd);
        dateEnd = dateEnd.compareTo(dateStart) != 0 ? dateEnd : dateStart;
        result.dateEnd = dateEnd.toString('MMMM dd, yyyy'); 
        result.dateStart = dateStart.toString('MMMM dd, yyyy'); 
        
        pdf.createPDF(pdf.reportTemplates.transferees, result, pdf.getBuffer, function(err, buffer){
            if(err) return next(err);
            var fileName = "Students: Transferees["+ dateStart.toString('MM/dd/yyyy') + (dateEnd.compareTo(dateStart) != 0 ? dateEnd.toString(' - MM/dd/yyyy'): "") +"].pdf";
            // res.set('Content-disposition', 'attachment; filename=' + fileName);
            res.set('Content-Type', 'Application/pdf');
            res.status(200).send(buffer);
        });
    });
}

exports.evaluation = function(req, res, next){
    var query = req.query;

    if(!query.freq || !query.date) return res.status(400).send('Invalid Request');

    report.evaluation(query, function(err, result){
        if(err) return next(err);
        if(!result) return res.status(400).send("Invalid Data");
        var dateStart = Date.parse(result.dateStart);
        var dateEnd = Date.parse(result.dateEnd);
        dateEnd = dateEnd.compareTo(dateStart) != 0 ? dateEnd : dateStart;
        result.dateEnd = dateEnd.toString('MMMM dd, yyyy'); 
        result.dateStart = dateStart.toString('MMMM dd, yyyy'); 
        
        pdf.createPDF(pdf.reportTemplates.studPerformance, result, pdf.getBuffer, function(err, buffer){
            if(err) return next(err);
            var fileName = "Students: Performance Evaluation["+ dateStart.toString('MM/dd/yyyy') + (dateEnd.compareTo(dateStart) != 0 ? dateEnd.toString(' - MM/dd/yyyy'): "") +"].pdf";
            // res.set('Content-disposition', 'attachment; filename=' + fileName);
            res.set('Content-Type', 'Application/pdf');
            res.status(200).send(buffer);
        });
    });
}

//GROSS INCOME REPORTS
exports.tuition = function(req, res, next){
    var query = req.query;

    if(!query.freq || !query.date) return res.status(400).send('Invalid Request');

    var data = {};
    report.tuition(query, function(err, result){
        if(err) return next(err);
        data.total = result.total;
        data.transaction = result.transaction;

        var dateStart = Date.parse(result.dateStart);
        var dateEnd = Date.parse(result.dateEnd);
        dateEnd = dateEnd.compareTo(dateStart) != 0 ? dateEnd : dateStart;
        data.dateEnd = dateEnd.toString('MMMM dd, yyyy'); 
        data.dateStart = dateStart.toString('MMMM dd, yyyy'); 

        data.branch = query.branch ? data.transaction.length != 0 ? data.transaction[0].branch : "" : null;
        
        pdf.createPDF(pdf.reportTemplates.tuition, data, pdf.getBuffer, function(err, buffer){
            if(err) return next(err);
            var fileName = "Gross Income Report: Tuition["+ dateStart.toString('MM/dd/yyyy') + (dateEnd.compareTo(dateStart) != 0 ? dateEnd.toString('MM/dd/yyyy'): "") +"].pdf";
            // res.set('Content-disposition', 'attachment; filename=' + fileName);
            res.set('Content-Type', 'Application/pdf');
            res.status(200).send(buffer);
        });
    });
}

exports.license = function(req, res, next){
    var query = req.query;

    if(!query.freq || !query.date) return res.status(400).send('Invalid Request');

    var data = {};
    report.license(query, function(err, result){
        if(err) return next(err);
        data.total = result.total;
        data.transaction = result.transaction;

        var dateStart = Date.parse(result.dateStart);
        var dateEnd = Date.parse(result.dateEnd);
        dateEnd = dateEnd.compareTo(dateStart) != 0 ? dateEnd : dateStart;
        data.dateEnd = dateEnd.toString('MMMM dd, yyyy'); 
        data.dateStart = dateStart.toString('MMMM dd, yyyy'); 

        data.branch = query.branch ? data.transaction.length != 0 ? data.transaction[0].branch : "" : null;
        
        pdf.createPDF(pdf.reportTemplates.license, data, pdf.getBuffer, function(err, buffer){
            if(err) return next(err);
            var fileName = "Gross Income Report: License["+ dateStart.toString('MM/dd/yyyy') + (dateEnd.compareTo(dateStart) != 0 ? dateEnd.toString('MM/dd/yyyy'): "") +"].pdf";
            // res.set('Content-disposition', 'attachment; filename=' + fileName);
            res.set('Content-Type', 'Application/pdf');
            res.status(200).send(buffer);
        });
    });
}

exports.certificate = function(req, res, next){
    var query = req.query;

    if(!query.freq || !query.date) return res.status(400).send('Invalid Request');

    var data = {};
    report.certificate(query, function(err, result){
        if(err) return next(err);
        data.total = result.total;
        data.transaction = result.transaction;

        var dateStart = Date.parse(result.dateStart);
        var dateEnd = Date.parse(result.dateEnd);
        dateEnd = dateEnd.compareTo(dateStart) != 0 ? dateEnd : dateStart;
        data.dateEnd = dateEnd.toString('MMMM dd, yyyy'); 
        data.dateStart = dateStart.toString('MMMM dd, yyyy'); 

        data.branch = query.branch ? data.transaction.length != 0 ? data.transaction[0].branch : "" : null;
        
        pdf.createPDF(pdf.reportTemplates.certificate, data, pdf.getBuffer, function(err, buffer){
            if(err) return next(err);
            var fileName = "Gross Income Report: Certificate["+ dateStart.toString('MM/dd/yyyy') + (dateEnd.compareTo(dateStart) != 0 ? dateEnd.toString('MM/dd/yyyy'): "") +"].pdf";
            // res.set('Content-disposition', 'attachment; filename=' + fileName);
            res.set('Content-Type', 'Application/pdf');
            res.status(200).send(buffer);
        });
    });
}

exports.overallGross = function(req, res, next){
    var query = req.query;

    if(!query.freq || !query.date) return res.status(400).send('Invalid Request');

    var data = {};
    report.overall(query, function(err, result){
        if(err) return next(err);

        var dateStart = Date.parse(result.dateStart);
        var dateEnd = Date.parse(result.dateEnd);
        dateEnd = dateEnd.compareTo(dateStart) != 0 ? dateEnd : dateStart;
        result.dateEnd = dateEnd.toString('MMMM dd, yyyy'); 
        result.dateStart = dateStart.toString('MMMM dd, yyyy'); 

        pdf.createPDF(pdf.reportTemplates.all, result, pdf.getBuffer, function(err, buffer){
            if(err) return next(err);
            var fileName = "Gross Income: Overall Report["+ dateStart.toString('MM/dd/yyyy') + (dateEnd.compareTo(dateStart) != 0 ? dateEnd.toString('MM/dd/yyyy'): "") +"].pdf";
            // res.set('Content-disposition', 'attachment; filename=' + fileName);
            res.set('Content-Type', 'Application/pdf');
            res.status(200).send(buffer);
        });
    });
}

//INSTRUCTORS REPORT
exports.performance = function(req, res, next){
    var query = req.query;

    if(!query.freq || !query.date) return res.status(400).send('Invalid Request');

    report.performance(query, function(err, result){
        if(err) return next(err);
        if(!result) return res.status(400).send("Invalid Data");
        var dateStart = Date.parse(result.dateStart);
        var dateEnd = Date.parse(result.dateEnd);
        dateEnd = dateEnd.compareTo(dateStart) != 0 ? dateEnd : dateStart;
        result.dateEnd = dateEnd.toString('MMMM dd, yyyy'); 
        result.dateStart = dateStart.toString('MMMM dd, yyyy'); 
        
        pdf.createPDF(pdf.reportTemplates.instPerformance, result, pdf.getBuffer, function(err, buffer){
            if(err) return next(err);
            var fileName = "Instructor: Performance Evaluation["+ dateStart.toString('MM/dd/yyyy') + (dateEnd.compareTo(dateStart) != 0 ? dateEnd.toString(' - MM/dd/yyyy'): "") +"].pdf";
            // res.set('Content-disposition', 'attachment; filename=' + fileName);
            res.set('Content-Type', 'Application/pdf');
            res.status(200).send(buffer);
        });
    });
}

//VEHICLE REPORT
exports.activity = function(req, res, next){

}