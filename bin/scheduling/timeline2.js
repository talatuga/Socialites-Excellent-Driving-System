var Timeline = function(options){
    if(!options) options = {};
    var worker = options.worker || 1;
    var events = [];
    var start = options.start ? convertToTime(options.start) : convertToTime('00:00');
    var end = options.end ? convertToTime(options.end) : convertToTime('23:59');
    var totalTime = 1440;
    var freeTime = totalTime * worker;
    var currentWorker = 1;
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

    //#region Public functions 
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
        if(events.findIndex(x=>x.strTime == startTime) == -1){
            events.push({start: _startTime, end: _end, duration: parseInt(duration), worker: 1, strTime: startTime});
        }else{
            var count = 1;
            events.forEach((e,i)=>{
                if(e.strTime==startTime) count++;
                if(i==events.length-1){
                    events.push({start: _startTime, end: _end, duration: parseInt(duration), worker: count, strTime: startTime});
                }
            });
        };
    };

    /**
     * Get Free Time on Day
     * @param {Number} duration 
     * @param {Function} cb 
     */
    this.getFreeTime = function(duration, cb){
        var currentTimeMin = getTimeInMinute(start);
        var available = [];
        var scheduled = [];
        var schedPerWorker = [];
        var x = 0;
        scheduled[totalTime-1] = 0;
        scheduled.fill(0,0,totalTime-1);
        addEvents(()=>{
            lookUp(x,(defSched)=>{
                available = defSched;
            });
        });
        x++;
        loop();
        function loop(){
            currentTimeMin = getTimeInMinute(start);
            scheduled = [];
            scheduled[totalTime-1] = 0;
            scheduled.fill(0,0,totalTime-1);
            if(events.length == 0){
                lookUp(x, (workerSched)=>{
                    check(workerSched);
                });
            }else{
                addEvents(()=>{
                    lookUp(x, (workerSched)=>{
                        check(workerSched);
                    });
                });       
            }
        }
        function lookUp(worker, cb1){
            var streak = 0;
            var _start = currentTimeMin;
            var output = [];
            while(currentTimeMin != totalTime+1){
                if(currentTimeMin == getTimeInMinute(end)){
                    return cb1(output);
                }
                if(scheduled[currentTimeMin]==0){
                    streak++;
                }else{
                    streak = 0;
                    _start = currentTimeMin+1;
                }
                if(streak == duration){
                    var startTime = minuteToTime(_start);
                    output.push({start: startTime});
                    streak = 0;
                    _start = currentTimeMin+1;
                }
                currentTimeMin++;
            }
        }
        function addEvents(done){
            events.forEach((e,i)=>{
                if(!e.worker || e.worker == x){
                    var a = getTimeInMinute(e.start);
                    var b = getTimeInMinute(e.end);
                    scheduled.fill(1,a,b);
                }
                if(i==events.length-1){
                    done();
                }
            }); 
        }
        function check(workerSched){
            schedPerWorker.push(workerSched);
            if(x==worker){
                var outAvail = available.slice();
                var slots = new Array(available.length);
                slots.fill(5,0,available.length);
                populateSlots(()=>{
                    cb(outAvail,schedPerWorker,slots);
                });
                function populateSlots(done){
                    slots.forEach((e,i)=>{
                        var sched = available[i].start;
                        schedPerWorker.forEach((wSched, wIndex)=>{
                            if(wSched.findIndex(schedule=>schedule.start==sched) == -1){
                                slots[i]--;
                                if(slots[i] == 0){
                                    outAvail.splice(i,1);
                                }
                            }
                        });
                        if(i==slots.length-1){
                            done();
                        }
                    });
                }
            }else{
                x++;
                loop();
            }
        }
    };

    this.isTimeFree = function(time, duration, cb){
        var currentTimeMin = getTimeInMinute(convertToTime(time));
        var endTime = getTimeInMinute(time) + duration;
        var scheduled = [];
        scheduled[totalTime-1] = 0;
        scheduled.fill(2,0,totalTime-1);
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

            task2(()=>{
                task1(()=>{
                    lookUp();
                });
            });
        }
    };
    
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
    };
    //#endregion

    //#region Private functions

    function convertToTime(strtime){
        var time = strtime.split(':');
        return {hour:parseInt(time[0]), minute: parseInt(time[1])};
    };
    function addTime(time, duration){
        var minutes = time.minute + duration;
        var _hour = parseInt(time.hour + parseInt(minutes / 60));
        return {hour: _hour, minute: (minutes % 60)};
    };
    function getTimeInMinute(time){
        var minute = (time.hour * 60);
        minute += time.minute;
        return minute;
    };
    function minuteToTime(minute){
        var pad = "00";
        var hour = parseInt(minute/60);
        var minutes = parseInt(minute%60);
        return ((pad.substring(0, pad.length-(""+hour).length) + hour)+ ":" + (pad.substring(0, pad.length-(""+minutes).length) + minutes));
    };
    //#endregion
}

module.exports = Timeline;