var today = new Date();

$(function() {
  $("#schedStudName").prop("disabled", true);
  $("#schedInstName").prop("disabled", true);
  $("#schedTime").prop("disabled", true);
  $("#schedBranch").prop("disabled", true);

    $('.calendarAdmin').fullCalendar({
      header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
      },
      editable: false,
      eventSources:[
          {
              url: "/api/v1/sched/calendar",
              type: "GET",
              data: {priv: 'admin', monthCount: 3, month: Date.parse('last month').toString("MMMM")},
              success: (res)=>{
                if(res.length==0){
                }
              },
              error: function(res){
                swal("Error getting schedule", res.statusText, "error");
                console.log(res.statusText);
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
});

$('#btnUpdSched').on('click', function(){
  $("#schedStudName").removeAttr("disabled");
  $("#schedInstName").removeAttr("disabled");
  $("#schedTime").removeAttr("disabled");
  $("#schedBranch").removeAttr("disabled");
});

$('.backSchedAdmin').on('click', function(){
  $('.viewDiv').hide();
  $('.view-schedule').show();
});

function todaySched(){
  scheduler.getSchedToday(function(err, sched){
    if(err) return console.error(err);
    $('#todaySched').html("");
    sched.forEach((e,i)=>{

      var task1 = new Promise((resolve, reject)=>{
        scheduler.getBranchName(e.branch, function(er,name){
          if(er) return reject(er);
          resolve(name);
        });
      });

      var task2 = new Promise((resolve, reject)=>{
        scheduler.getInstName(e.instID, function(er,name){
          if(er) return reject(er);
          resolve(name);
        });
      });

      var task3 = new Promise((resolve, reject)=>{
        scheduler.getStudName(e.studID, function(er,name){
          if(er) return reject(er);
          resolve(name);
        });
      });

      var task4 = new Promise((resolve, reject)=>{
        
      });
      
      Promise.all([task1,task2,task3]).then(results=>{
        var html = "<tr>";
        html += "<td>"+ i+1 +"</td>";
        html += "<td>"+ Date.parse(e.date).toString("hh:mm tt") + " - " + Date.parse(e.date).addHours(1).toString("hh:mm tt") +"</td>";
        html += "<td>"+ results[0] +"</td>";
        html += "<td>"+ (Array.isArray(results[1]) ? "No one assigned" : results[1].replace(/_/g," ")) +"</td>";
        html += "<td>"+ results[2].fullname.replace(/_/g," ") +"</td>";
        html += "<td></td>";
        html += '<td><button type="button" style="vertical-align: sub" class="btn btn-success btnLicense" onclick="doneSched()">Done</button><br><button type="button" style="vertical-align: sub" class="btn btn-inverse btnLicense" onclick="cancelSched()">Cancel</button></td>';
        html += "</tr>";
        $('#todaySched').append(html);
      }).catch(reason=>console.log(reason));
    });
  });
  $('.viewDiv').hide();
  $('.view-todaySched').show();
}

function suspendClass(){
  $('.suspendDate').val("");
  $('#suspendMsg').val("");
  $('.viewDiv').hide();
  $('.view-suspendClass').show();
}

function schedListView(){
  $('.searchDateDisplayList').val("");
  $('.viewDiv').hide();
  $('.view-schedListView').show();
}

function transferReq(){
  $('.viewDiv').hide();
  $('.view-transferReq').show();
}

function cancelSched(){ //DB: When cancel sched is clicked
  $('#cancelSchedModal').modal('show');
}

function confirmCancel(){ //DB: When confirm cancel is clicked
  //Cancel schedule function here. Then remove the table row
}

function doneSched(){ //DB: When Done btn is clicked
    swal({
        title: "Appointment Done?",
        text: "If yes, the instructor shall proceed to Grades and Evaluation to assess his student's driving performance.",
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
            //Done schedule function here. Then remove the table row
        }
    });
}

function cancelSuspend(){
  swal({
    title: "Cancel?",
    text: "Discard message?",
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
        schedule();
      }
  });
}

function sendEmailSuspend(){
  var suspendDate = $('.suspendDate').val();
  var msg = $('#suspendMsg').val();
  if (suspendDate=="" || msg.replace(/\ /g, '') == "")
  {
    swal("Oops!", "Please fill out all required fields!", "error");
  }else{
    swal({
    title: "Are you sure",
    text: "you want to suspend classes for " + suspendDate + "? All students with a schedule on that day will be notified via e-mail.",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    cancelButtonColor: "#DD6B55",
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
    closeOnConfirm: false,
    closeOnCancel: true
  },
    function(isConfirm){
        if (isConfirm) {
          swal("Success!", "Email was sent to students and calendar is now updated!", "success");
          //DB: suspend classes function here
          schedule();
        }
    });
  }
}

function searchSchedView(){
  var x = $('.searchDateDisplayList').val();
  if (x==""){
    swal ("Oops!", "Please input date to display schedule.", "error");
  }else{
    $('.displaySchedDiv').show();
  }
}