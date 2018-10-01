var report = require('../../model/reportsModel');

//GROSS INCOME REPORTS
//STUDENTS REPORT
exports.getStud = function(req, res, next){
    if(res.locals.authenticated == 0) return next();
    var pdf = require('../../bin/pdfGenerator');
    var fileName;

    var freq = req.query.freq;
    var title = req.query.report;

    var createReport = function(student){
        pdf.generateView(pdf.reportTemplates.enrollees, student, function(err, html){
            if(err) return next(err);
            pdf.generatePDF(html, pdf.getBuffer, function(err, buffer){
                if(err) return next(err);
                // let json = JSON.stringify(buffer);
                // console.log(json);
                // res.set('Content-disposition', 'attachment; filename=' + fileName);
                // res.set('Content-Type', 'Application/pdf');
                res.status(200).send({success: true, data: buffer});
            });
        });
    }

    if (title=="Enrollees"){
        if (freq=="1"){
            fileName = "SED - Gross Income Report.pdf";
            report.getStud1A(req.query.date).then(data=>{
                var student = {
                    title: "Students",
                    title2: "Enrollees"
                }
                createReport(student);
            }).catch(reason=>{
                next(reason);
            });
            // report.getStud1A(req.query.date, function(err, result){
            //     if(err) return next(err);
            //     console.log(result);
            //     createReport(result);
            //     res.status(200).send({success: true, data: result});
            // });
        }
        else if (freq=="2"){
            report.getStud1B(req.query.week, req.query.year, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="3"){
            report.getStud1C(req.query.month, req.query.year, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="4" || freq=="5"){
            report.getStud1D(req.query.monthto, req.query.monthfrom, req.query.yearto, req.query.yearfrom, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="6"){
            report.getStud1E(req.query.year, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
    }

    else if (title=="Transferees"){
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
        if (freq=="1"){
            report.getStud3A(req.query.date, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="2"){
            report.getStud3B(req.query.week, req.query.year, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="3"){
            report.getStud3C(req.query.month, req.query.year, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="4" || freq=="5"){
            report.getStud3D(req.query.monthto, req.query.monthfrom, req.query.yearto, req.query.yearfrom, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="6"){
            report.getStud3E(req.query.year, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
    }

    else if (title=="Performance Evaluation"){
        if (freq=="1"){
            report.getStud4A(req.query.date, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="2"){
            report.getStud4B(req.query.week, req.query.year, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="3"){
            report.getStud4C(req.query.month, req.query.year, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="4" || freq=="5"){
            report.getStud4D(req.query.monthto, req.query.monthfrom, req.query.yearto, req.query.yearfrom, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
        else if (freq=="6"){
            report.getStud4E(req.query.year, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});
            });
        }
    }
}

//INSTRUCTORS REPORT