var Timeline = function(options){
    var convertToTime = function(strtime){
        var time = strtime.split(':');
        return {hour:parseInt(time[0]), minute: parseInt(time[1])};
    };
    var addTime = function(time, duration){
        var minutes = time.minute + duration;
        var _hour = parseInt(time.hour + parseInt(minutes / 60));
        return {hour: _hour, minute: (minutes % 60)};
    };
    var getTimeInMinute = function(time){
        var minute = (time.hour * 60);
        minute += time.minute;
        return minute;
    };
    var minuteToTime = function(minute){
        var pad = "00";
        var hour = parseInt(minute/60);
        var minutes = parseInt(minute%60);
        return ((pad.substring(0, pad.length-(""+hour).length) + hour)+ ":" + (pad.substring(0, pad.length-(""+minutes).length) + minutes));
    };

    if(!options) options = {};
    var currentTime = '00:00';
    var totalMinute = 1440;
    var occupyTime = 0;
    var freeTime = 1440;
    var events = [];
    var start = options.start ? convertToTime(options.start) : convertToTime('00:00');
    var end = options.end ? convertToTime(options.end) : convertToTime('23:59');
    var breakTime = [];

    if(options.break){
        options.break.forEach((e,i)=>{
            var singleEvent = {
                start: convertToTime(e.start),
                end: convertToTime(e.end),
            };
            events.push(singleEvent);
            breakTime.push(singleEvent);
        });
    }

    /**
     * Add event on timeline and mark it as unavailable
     * @param {String} startTime Time in Military format *24:00:00*
     * @param {Number} duration Event Duration
     */
    this.reserveTime = function(startTime, duration){
        var _startTime = convertToTime(startTime);
        var _end;
        if(typeof duration == 'string') _end = convertToTime(duration);
        else _end = addTime(_startTime,duration);
        freeTime -= parseInt(duration);
        events.push({start: _startTime, end: _end, duration: parseInt(duration)});
    };

    this.hasFreeTime = function(duration){
        if(duration){
            return (freeTime >= duration ? minuteToTime(freeTime) : false);
        }else{
            return minuteToTime(freeTime);
        }
    };

    /**
     * Shows available time on a timeline
     * @param {Number} duration Number of minutes needed
     * @param {Function} cb Callback Function (Vacant[])
     */
    this.getFreeTime = function(duration, cb){
        var currentTimeMin = getTimeInMinute(start);
        var available = [];
        var scheduled = [];
        scheduled[totalMinute-1] = 0;
        scheduled.fill(0,0,totalMinute-1);
        var lookUp = function(){
            var streak = 0;
            var _start = currentTimeMin;
            while(currentTimeMin != totalMinute+1){
                if(currentTimeMin == getTimeInMinute(end)){
                    return cb(available);
                }
                if(scheduled[currentTimeMin]==0){
                    streak++;
                }else{
                    streak = 0;
                    _start = currentTimeMin+1;
                }
                if(streak == duration){
                    available.push({start: minuteToTime(_start)});
                    streak = 0;
                    _start = currentTimeMin+1;
                }
                currentTimeMin++;
            }
        }
        if(events.length == 0){
            lookUp();
        }else{
            events.forEach((e,i)=>{
                var a = getTimeInMinute(e.start);
                var b = getTimeInMinute(e.end)
                scheduled.fill(1,a,b);
                if(i==events.length-1){
                    lookUp();
                }
            });        
        }
    }

    this.compareTime = function(time1, time2){
        if(typeof time1 == "string"){
            time1 = convertToTime(time1);
        }
        if(typeof time2 == "string"){
            time2 = convertToTime(time2);
        }

        if(time1.hour > time2.hour) return 1;
        else if(time1.hour < time2.hour) return -1;
        else if(time1.hour == time2.hour){
            if(time1.minute > time2.minute) return 1;
            else if(time1.minute < time2.minute) return -1;
            else if(time1.minute == time2.minute) return 0;
        }
    }

    this.isTimeFree = function(time, duration, cb){
        var currentTimeMin = getTimeInMinute(convertToTime(time));
        var endTime = getTimeInMinute(time) + duration;
        var scheduled = [];
        scheduled[totalMinute-1] = 0;
        scheduled.fill(2,0,totalMinute-1);
        scheduled.fill(0,getTimeInMinute(start),getTimeInMinute(end));
        var lookUp = function(){
            var streak = 0;
            var overtime = 0;
            while(currentTimeMin != endTime+1){
                if(scheduled[currentTimeMin]==0){
                    streak++;
                }else if(scheduled[currentTimeMin]==2){
                    streak++;
                    overtime++;
                }else{
                    return cb(0);
                }
                if(streak == duration){
                    if(overtime == 0) return cb(1);
                    else return cb(2);
                }
                currentTimeMin++;
            }
        }
        if(events.length == 0 && breakTime.length == 0){
            lookUp();
        }else{
            var task1 = (cb)=>{
                if(breakTime.length==0) return cb();
                breakTime.forEach((ee,ind)=>{
                    var a = getTimeInMinute(ee.start);
                    var b = getTimeInMinute(ee.end)
                    scheduled.fill(2,a,b);
                    if(ind==breakTime.length-1){
                        cb();
                    }
                }); 
            };
            var task2 = (cb)=>{
                if(events.length==0) return cb();
                events.forEach((e,i)=>{
                    var a = getTimeInMinute(e.start);
                    var b = getTimeInMinute(e.end)
                    scheduled.fill(1,a,b);
                    if(i==events.length-1){
                        cb();
                    }
                });       
            };

            task1(()=>{
                task2(()=>{
                    lookUp();
                });
            });
        }
    }
}

module.exports = Timeline;