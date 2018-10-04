var app = {
    start: function(){
        this.preference.getPreference('',function(){});
        this.paymentAccount.getPayment(function(err, data){
            if(err) throw new Error('Null result');
            var fullname = $('#studentName').data('name');
            $('#accountTable').html('');
            data.forEach((e,i)=>{
                var html = "<tr>";
                html += "<td>"+ Date.parse(e.date).toString('MM/dd/yyyy') +"</td>";
                html += "<td>"+ e.transaction +"</td>";
                html += "<td>"+ parseFloat(e.price).formatMoney(2) +"</td>";
                html += "<td>"+ (parseFloat(e.price) - parseFloat(e.balance)).formatMoney(2) +"</td>";
                html += "<td>"+ parseFloat(e.balance).formatMoney(2) +"</td>";
                html += "<td><a class='receiptLink' href='api/v1/web/receipt?fullname="+ fullname +"&orno="+ e.ORno +"'><button type='button' class='btn100px btn13 btn btn-inverse m-b-10 m-l-5' "+ (e.balance>0 ? 'disabled' : '') +">View Receipt</button></a></td>";
                html += "</tr>";
                $('#accountTable').append(html);
            });
        });
        this.scheduler.getHours('null', ()=>{});
    },
    preference: {
        getPreference: function(target,cb){
            $.ajax({
                type: "GET",
                url: "/api/v1/sched/preference",
                success: function(res){
                    if(res.success){
                        $('.prefVehi').html(res.data.car.name);
                        $('.prefVehi').attr('data-id', res.data.car.id);
                        $('.prefDays').attr('data-days', res.data.days);
                        var prefDays = [];
                        var days = JSON.parse(res.data.days);
                        days.forEach((element,i) => {
                            switch(parseInt(element)){
                                case 1 : {
                                    prefDays.push("MON");
                                    break;
                                }
                                case 2 : {
                                    prefDays.push("TUE");
                                    break;
                                }
                                case 3 : {
                                    prefDays.push("WED");
                                    break;
                                }
                                case 4 : {
                                    prefDays.push("THU");
                                    break;
                                }
                                case 5 : {
                                    prefDays.push("FRI");
                                    break;
                                }
                                case 6 : {
                                    prefDays.push("SAT");
                                    break;
                                }
                                case 7 : {
                                    prefDays.push("SUN");
                                    break;
                                }
                            }
                            if(i == days.length-1){
                                //console.log(prefDays);
                                $('.prefDays').html(prefDays.join());
                            }
                        });
                        $('.prefVehi').html(res.data.car.brand.toUpperCase());
                    }
                },
            });
        },
        updatePreference: function(_days, _car, cb){
            $.ajax({
                type: "PUT",
                url: "api/v1/sched/preference",
                data: {days: JSON.stringify(_days), car: _car},
                success: (res)=>{
                    if(res.success){
                        cb(null, res.detail);
                    }else{
                        cb(new Error(res.detail));
                    }
                },
                error: (xhr)=>{
                    cb(new Error(xhr.status + ": " + xhr.statusText));
                },
            });
        },
    },
    paymentAccount: {
        getPayment: function(cb){
            $.get('/api/v1/stud/payment/sessionID', function(res){
                if(res.success){
                    cb(null, res.data);
                }else{
                    cb(new Error(res.detail));
                }
            });
        },  
    },
    scheduler: {
        checkIfAvailable: function(event, date, time, cb){
            var branchID = event.data.branch || 1;
            $.ajax({
                type: "GET",
                url: "api/v1/sched/check",
                data: {date: date, branch: branchID, time: time, id: event._id, inst: event.data.instructor.instID},
                success: (res)=>{
                    if(res.success){
                        cb(null, res.status);
                    }else{
                        cb(new Error(res.detail));
                    }
                },
                err: (xhr)=>{
                    cb(new Error(xhr.status + ": " + xhr.statusText));
                }
            });
        },
        updateSchedule: function(schedules, cb){
            var branchID = $('.venueSchedToday').data('id') || 1;
            $.ajax({
                type: "PUT",
                url: "api/v1/sched",
                data: {
                    events: JSON.stringify(schedules),
                    branch: branchID,
                },
                success: function(res){
                    if(res.success){
                        cb(null, res.data);
                    }else{
                        cb(new Error(res.detail));
                    }
                },
                error: function(xhr){
                    cb(new Error(xhr.status + ": " + xhr.statusText));
                }
            });
        },
        removeSched: function(schedule, cb){
            $.ajax({
                type: "PATCH",
                url: "api/v1/sched/" + schedule,
                success: res=>{
                    if(res.success){
                        cb(null);
                    }else{
                        cb(new Error(res.detail));
                    }
                },
                error: xhr=>{
                    cb(new Error(xhr.status + ": " + xhr.statusText));
                },
            });
        },
        getHours: function(studID, cb){
            $.get('api/v1/sched/hours/'+studID,function(res){
                if(res.success){
                    $('.crsHrsUsed').html(res.data.used);
                    $('.crsHrsRem').html(res.data.remaining);
                    $('.crsHrsTot').html(res.data.total);
                    cb(null,res.data);
                }else{
                    console.log(res.detail);
                    cb(new Error(res.detail));
                }
            });
        },
        getFreeInst: function(date, time, cb){
            var branchID = $('.venueSchedToday').data('id') || 1;
            $.ajax({
                type: "GET",
                url: "api/v1/sched/inst",
                data: {date: date, branch: branchID, time: time},
                success: res=>{
                    if(res.success){
                        cb(null, res.data);
                    }else{
                        cb(new Error(res.detail));
                    }
                },
                error: xhr=>{
                    cb(new Error(xhr.status + ": " + xhr.statusText));
                },
            });
        },
    },
    others: {
        currentBranch: "",
        getInstName: function(instid,cb){
            $.get('api/v1/instructor/'+instid+'/fullname', function(res){
                if(res.success){
                    cb(null, res.data);
                }else{
                    cb(new Error(res.detail));
                }
            });
        },
        getBranchName: function(id, cb){
            var self = this;
            $.get('api/v1/branch/'+id+'/name', function(res){
                if(res.success){
                    self.currentBranch = res.data;
                    cb(null, res.data);
                }else{
                    cb(new Error(res.detail));
                }
            });
        },
        getBranchList: function(cb){
            $.ajax({
                type: 'GET',
                url: 'api/v1/branch?status=1',
                success: res=>{
                    if(res.success){
                        cb(null, res.data);
                    }else{
                        cb(new Error(res.detail));
                    }
                },
                error: xhr=>{
                    cb(new Error(xhr.status + ":" + xhr.statusText));
                }
            });
        },
    },
    account: {
        loaded: false,
        infoID: -1,
        studentID: -1,
        getInfo: function(cb){
            var self = this;
            if(self.loaded) return cb(null, []);
            $.ajax({
                type: "GET",
                url: "api/v1/stud",
                success: function(res){
                    if(res.success){
                        if(res.data.length == 0) return cb(new Error("No data receive"));
                        self.loaded = true;
                        res.data[0].branch = app.others.currentBranch;
                        self.infoID = res.data[0].id;
                        self.studentID = res.data[0].studID;
                        cb(null, res.data);
                    }else{
                        cb(new Error(res.detail));
                    }
                },
                error: function(xhr){
                    cb(new Error(xhr.status + ":" + xhr.statusText));
                }
            });
        },
        update: function(data, cb){
            $.ajax({
                type: "PUT",
                url: "api/v1/stud/" + data.studID,
                data: data,
                success: function(res){
                    if(res.success){
                        cb(null, res.detail);
                    }else{
                        cb(new Error(res.detail));
                    }
                },
                error: function(xhr){
                    cb(new Error(xhr.status + ":" + xhr.statusText));
                }
            });
        },
        updatePic: function(studID, infoID, confirm, cb){
            $.ajax({
                type: "PUT",
                url: "api/v1/stud/" + studID + "/avatar",
                data:{
                    id: infoID,
                    confirm: confirm,
                },
                success: res=>{
                    if(res.success){
                        cb(null, res.detail, res.path);
                    }else{
                        cb(new Error(res.detail));
                    }
                },
                error: xhr=>{
                    cb(new Error(xhr.status + ":" + xhr.statusText));
                }
            });
        },
        transfer: {
            transferList: function(cb){
                $.ajax({
                    type: "GET",
                    url: "api/v1/stud/transfer",
                    success: function(res){
                        if(res.success){
                            if(res.data.length == 0) return cb(new Error("No data received"));
                            cb(null, res.data);
                        }else{
                            cb(new Error(res.detail));
                        }
                    },
                    error: function(xhr){
                        cb(new Error(xhr.status + ":" + xhr.statusText));
                    }
                });
            },
            submitRequest: function(branch, date, cb){
                $.ajax({
                    type: "POST",
                    url: "api/v1/stud/transfer",
                    data: {
                        branch: branch,
                        date: date,
                    },
                    success: function(res){
                        if(res.success){
                            cb(null, res.detail);
                        }else{
                            cb(new Error(res.detail));
                        }
                    },
                    error: function(xhr){
                        cb(new Error(xhr.status + ":" + xhr.statusText));
                    }
                });
            },
            cancelRequest: function(id, cb){
                $.ajax({
                    type: "PUT",
                    url: "api/v1/stud/transfer/" + id,
                    data: {
                        action: "CANCEL",
                    },
                    success: function(res){
                        if(res.success){
                            cb(null, res.detail);
                        }else{
                            cb(new Error(res.detail));
                        }
                    },
                    error: function(xhr){
                        cb(new Error(xhr.status + ":" + xhr.statusText));
                    }
                });
            },
        }
    },
}