var schedule = require('../../model/scheduleModel');
var student = require('../../model/studentModel');

exports.calendar = function(req, res, next){
    schedule.getAssigned(req.session.studID, function(err, data){
        if(err) return next(err);
        var sched = [];
        data.forEach((e,i) => {
            var minDate = Date.parse("last sunday");
            var maxDate = Date.parse("next saturday");
            var date = new Date(e.date);
            var _editable;
            var eColor = "#3A87AD";
            var startDate = date.toString("yyyy-MM-dd") + " " + e.time;
            var endDate = new Date(startDate);
            endDate.addHours(parseInt(e.hour));
            
            if(date.between(minDate, maxDate)){
                _editable = false;
            }else if(date.compareTo(minDate) == -1){
                _editable = false;
            }else{
                _editable = true;
            }

            if(e.status == 3){
                eColor = "#64ff59";
            }else if(e.status == 4){
                eColor = "#ff1e1e";
            }

            sched.push({
                _id: e.id,
                title: e.title,
                start: startDate,
                end: endDate.toString("yyyy-MM-dd HH:mm:ss"),
                editable: _editable,
                color: eColor,
                overlap: false,
            });
            if(i == data.length-1){
                res.status(200).send(sched);
            }
        });
    });
};

exports.assignSched = function(req, res, next){
    schedule.assignSched(req.params.id, function(err){
        if(err) return next(err);
        res.status(200).send({success: true});
    })
};

exports.removeSchedFromCalendar = function(req, res, next){
    schedule.removeSched(req.params.id, function(err){
        if(err) return next(err);
        res.status(200).send({success: true});
    });
};

exports.changePref = function(req, res, next){
    if(req.session.studID == -1) return next();

    var id = req.session.studID;
    var days = req.body.days;
    var car = req.body.car;
    
    student.update(id, days, 'prefDays', function(err){
        if(err) return next(err);
        student.update(id, car, 'prefCar', function(er){
            if(er) return next(er);
            res.status(200).send({success: true});
        });
    });
};

exports.getPreference = function(req, res, next){
    if(req.session.studID == -1) return next();
    student.getData(req.session.studID, function(err, result){
        if(err) return next(err);
        var output;
        (require('../../model/vehicleModel')).get(result.prefCar, null, function(er, car){
            if(er) return next(er);
            output = {
                days: result.prefDays,
                car: {id:result.prefCar, brand: car.brand + " " + car.model}
            };
            res.status(200).send({success: true, data: output});
        });
    });
};

exports.schedAvailability = function(req, res, next){
    if(req.session.authenticated==0) return next();
    var branchID = req.query.branch;
    var date = new Date(req.query.date);
    var time = req.query.time;
    schedule.checkSched(branchID, date, time).catch(next).then((available)=>{
        res.status(200).send({success: true, status: available});
    });
};