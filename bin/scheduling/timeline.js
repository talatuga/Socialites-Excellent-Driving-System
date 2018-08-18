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

    if(options.break){
        options.break.forEach((e,i)=>{
            events.push({
                start: convertToTime(e.start),
                end: convertToTime(e.end),
            });
        });
    }

    /**
     * Add event on timeline and mark it as unavailable
     * @param {String} startTime Time in Military format *24:00:00*
     * @param {Number} duration Event Duration
     */
    this.reserveTime = function(startTime, duration){
        var _startTime = convertToTime(startTime);
        var _end = addTime(_startTime,duration);
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
}

module.exports = Timeline;