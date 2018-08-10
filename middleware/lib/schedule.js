var schedule = require('../../model/scheduleModel');

exports.calendar = function(req, res, next){
    schedule.getAssigned(/* req.session.studID */"06597", function(err, data){
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
            endDate.addHours(e.hour);
            
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

var checkConflict = function(date, cb){
    
};