$(function () {
    $('#calendarMainInstSched').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'listWeek month,agendaWeek,agendaDay'
        },
        disableDragging: true,
        editable: false,
        droppable: false, 
        eventStartEditable: false,
        eventClick: function(event, jsEvent, view){
            $('#schedDate').html(moment(event.start).format("MM/DD/YYYY"));
            $('#timeSched').html(moment(event.start).format("hh:mm A") + " - " + moment(event.start).add('hour',1).format("hh:mm A"));
            app.getStudentName(event.data.student.id, function(er, name){
                if(er) return console.error(er);
                $('#instSched').html(name.fullname.replace(/_/g," "));
                app.getBranchName(event.data.branch, function(err, bname){
                    if(err) return console.error(err);
                    $('#venueSched').html(bname);
                    $('#viewSchedModal').modal("show");
                });
            });
          },
        eventSources:[
            {
                url: "/api/v1/sched/calendar",
                type: "GET",
                success: (res)=>{
                    if(res.length==0){
                        
                    }
                },
                error: function(res){
                    swal("Error getting schedule", res.detail, "error");
                    console.log(res.detail);
                },
            },
        ],
        businessHours:[
            {
                dow: [ 1, 2, 3, 4, 5, 6, 7 ], // Monday, Tuesday, Wednesday
                start: '09:00', // 8am
                end: '17:30' // 6pm
            },
        ],
    });

    getToday();
    getTom();
});

function getToday(){
    app.schedule.getToday((error,sched)=>{
        if(error) throw error;
        if(sched.length==0) return $('.todaySched').hide();
        $('#todaySched').html("");
        $('.lessonNoSpan').html(sched.length);
        $('.appointments').html(sched.length > 1 ? "appointments" : "appointment");
        sched.forEach((e,i)=>{
            var task1 = new Promise((res, rej)=>{
                app.getStudentName(e.studID, function(err, name){
                    if(err) return rej(err);
                    res(name);
                });
            });
            
            var task2 = new Promise((res, rej)=>{
                app.getBranchName(e.branch, function(err, name){
                    if(err) return rej(err);
                    res(name);
                });
            });

            Promise.all([task1,task2]).then(result=>{
                var html = "<tr>";
                html += "<td>"+ (i+1) +"</td>";
                html += "<td>"+ result[0].fullname.replace(/_/g," ") +"</td>";
                html += "<td>"+ "" +"</td>";
                html += "<td>"+ Date.parse(e.time).toString('hh:mm tt') + " - " + Date.parse(e.time).addHours(1).toString('hh:mm tt') +"</td>";
                html += "<td>"+ result[0].hours +"</td>";
                html += "<td>"+ result[1] +"</td>";
                html += '<td><button type="button" style="vertical-align: sub; float: left: margin-right: 10px" class="btn btn-success btnLicense" onclick="doneSched('+ e.id +')">Done</button><button type="button" style="vertical-align: sub; margin-left: 10px" class="btn btn-inverse btnLicense" onclick="cancelSched('+ e.id +')">Cancel</button><br></td>';
                // html += '<td><button type="button" style="vertical-align: sub" class="btn btn-success btnLicense" onclick="doneSched('+ e.id +')">Done</button><br><button type="button" style="vertical-align: sub" class="btn btn-inverse btnLicense" onclick="cancelSched('+ e.id +')">Cancel</button><br></td>';
                html += "</tr>";
                $('#todaySched').append(html);
            }).catch(x=>{
                throw new Error(x);
            });
        });
    });
}
function getTom(){
    app.schedule.getTom((error,sched)=>{
        if(error) throw error;
        if(sched.length==0) return $('.tomSched').hide();
        $('#tomSched').html("");
        $('.lessonNoSpanTom').html(sched.length);
        $('.appointmentsTom').html(sched.length > 1 ? "appointments" : "appointment");
        sched.forEach((e,i)=>{
            var task1 = new Promise((res, rej)=>{
                app.getStudentName(e.studID, function(err, name){
                    if(err) return rej(err);
                    res(name);
                });
            });
            
            var task2 = new Promise((res, rej)=>{
                app.getBranchName(e.branch, function(err, name){
                    if(err) return rej(err);
                    res(name);
                });
            });

            Promise.all([task1,task2]).then(result=>{
                var html = "<tr>";
                html += "<td>"+ (i+1) +"</td>";
                html += "<td>"+ result[0].fullname.replace(/_/g," ") +"</td>";
                // html += "<td>"+ "" +"</td>";
                html += "<td>"+ Date.parse(e.time).toString('hh:mm tt') + " - " + Date.parse(e.time).addHours(1).toString('hh:mm tt') +"</td>";
                // html += "<td>"+ result[0].hours +"</td>";
                // html += "<td>"+ "" +"</td>";
                html += "<td>"+ result[1] +"</td>";
                html += '<td><button type="button" style="vertical-align: sub; margin-left: 10px" class="btn btn-inverse btnLicense" onclick="cancelSched('+ e.id +')">Cancel</button><br></td>';
                html += "</tr>";
                $('#tomSched').append(html);
            }).catch(x=>{
                throw new Error(x);
            });
        });
    });
}

function viewSchedTodayInst(){
    $('.viewDiv').hide();
    $('.view-todaySched').show();
}

function viewSchedTomInst(){
    $('.viewDiv').hide();
    $('.view-tomSched').show();
}
var toCancelSched = -1;
function cancelSched(id){
    toCancelSched = id;
    $('#cancelSchedModal').modal('show');
}

function confirmCancel(){
    swal({
        title: "Cancel Appointment?",
        text: "Are you sure you want to cancel this appointment?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        cancelButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function(isConfirm){
        if (isConfirm) {
            app.schedule.cancel(toCancelSched, err=>{
                if(err) return swal("Failed!", err.message, "error");
                getToday();
                $('#calendarMainInstSched').fullCalendar('refetchEvents');
                $('#cancelSchedModal').modal('hide');
                instSchedule();
            });
        }
    });
}

function doneSched(id){
    swal({
        title: "Appointment Done?",
        text: "If yes, please proceed to Grades and Evaluation to assess the student's driving performance.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        cancelButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function(isConfirm){
        if (isConfirm) {
            app.schedule.done(id, err=>{
                if(err) return swal("Failed!", err.message, "error");
                getToday();
                $('#calendarMainInstSched').fullCalendar('refetchEvents');
                $('.viewDiv').hide();
                $('.view-instStudent').show();
            });
        }
    });
}