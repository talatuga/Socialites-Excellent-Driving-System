var today = new Date();
var searchSched;

$(function() {
  $("#schedStudName").prop("disabled", true);
  $("#schedInstName").prop("disabled", true);
  $("#schedTime").prop("disabled", true);
  $("#schedBranch").prop("disabled", true);

  $('.cancelSched').on('click', function(){
    swal({
      title: "Cancel Schedule?",
      text: "Are you sure you want cancel this schedule?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      cancelButtonColor: "#DD6B55",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      closeOnConfirm: true,
      closeOnCancel: true
    },function(isConfirm){
      if(isConfirm){
        scheduler.cancelSched(scheduler.selected, function(err, message){
          console.log("cancelled");
          if(err){
            swal("Failed!", err.message, "error");
          }else{
            swal("Done!", message, "success");
          }
          $('#viewSchedModal').modal("hide");
          $('.calendarAdmin').fullCalendar('refetchEvents');
        });
      }
    });
  });
  $('.doneSched').on('click', function(){
    swal({
      title: "Check Attendance?",
      text: "Is this schedule done?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      cancelButtonColor: "#DD6B55",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      closeOnConfirm: true,
      closeOnCancel: true
    },function(isConfirm){
      if(isConfirm){
        scheduler.doneSched(scheduler.selected, function(err, message){
          console.log("done");
          if(err){
            swal("Failed!", err.message, "error");
          }else{
            swal("Done!", message, "success");
          }
          $('#viewSchedModal').modal("hide");
          $('.calendarAdmin').fullCalendar('refetchEvents');
        });
      }
    });
  });

  $('.calendarAdmin').fullCalendar({
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
    },
    editable: false,
    eventClick: schedClicked,
    eventSources:[
        {
            url: "/api/v1/sched/calendar",
            type: "GET",
            data: {
              priv: 'admin', 
              monthCount: 3, 
              month: Date.parse('last month').toString("MMMM"),
              branch: 1,
            },
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

  $('.searchTodaySched').on('click', function(e){
    search.init(office.pages[office.currPage], ["branchID","name"], function(data){
        renderBranchTable(data);
    });
  });
  $('.searchTodaySched').on('keyup', function(e){
      search.keypress($('#searchBranch').val());
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
});

function schedLoad(){
  $('#numSchedAllBranch').html("");
  office.pages[office.currPage].forEach((e,i)=>{
    $('#numSchedAllBranch').append("<tr onclick='selectBranchSched("+ e.id +")'><td>"+ e.name +"</td><td></td></tr>");
  });
}

function selectBranchSched(id){
  console.log(id);
  $('.calendarAdmin').fullCalendar({
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
    },
    editable: false,
    eventClick: schedClicked,
    eventSources:[
        {
            url: "/api/v1/sched/calendar?" + id || 1,
            type: "GET",
            data: {
              priv: 'admin', 
              monthCount: 3, 
              month: Date.parse('last month').toString("MMMM"),
              branch: 1,
            },
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
}

function todaySched(){
  scheduler.getSchedToday(function(err, sched){
    if(err) return console.error(err);
    $('#todaySched').html("");
    if(sched.length!=0){
      sched.forEach((e,i)=>{
        $('.noTodaySched').hide();
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
          // html += "<td></td>";
          html += '<td><button type="button" style="vertical-align: sub; float: left; margin-right: 10px" class="btn btn-success btnLicense" onclick="doneSched()">Done</button><button type="button" style="margin-left: 10px" class="btn btn-inverse btnLicense" onclick="cancelSched()">Cancel</button></td>';
          html += "</tr>";
          $('#todaySched').append(html);
        }).catch(reason=>console.log(reason));
      });
    }else{
      $('.noTodaySched').show();
    }
  });
  $('.branchSelect').html("");
  office.pages[office.currPage].forEach((e,i)=>{
    var html = "<option value='"+ e.id +"'>"+ e.name +"</option>";
    $('.branchSelect').append(html);
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
  $('.selBranchSchedView').html("");
  office.pages[office.currPage].forEach((e,i)=>{
    var html = "<option value='"+ e.id +"'>"+ e.name +"</option>";
    $('.selBranchSchedView').append(html);
  });
  $('.searchDateDisplayList').val("");
  $('.viewDiv').hide();
  $('.view-schedListView').show();
}

function transferReq(){
  $('.preloader').fadeIn();
  $('.viewDiv').hide();
  $('.view-transferReq').show();
  transfer.getList(null, function(err,data){
    $('#transferReq').html('');
    if (data.length!=0){
      $('.noTransferReq').hide();
      data.forEach((e,i)=>{
        scheduler.getStudName(e.studID, function(err, student){
          var task1 = new Promise((resolve, reject)=>{
            office.selected = e.from_branchID;
            office.getLocalData(branch=>{
              resolve(branch);
            });
          });
          var task2 = new Promise((resolve, reject)=>{
            office.selected = e.to_branchID;
            office.getLocalData(branch=>{
              resolve(branch);
            });
          });
          Promise.all([task1,task2]).then(result=>{
            var branch1 = result[0];
            var branch2 = result[1];
            var html = "<tr>";
            html += "<td>"+ Date.parse(e.effectiveDate).toString('MMM dd, yyyy') +"</td>";
            html += "<td>STUD-"+ e.studID +"</td>";
            html += "<td>"+ student.fullname.replace(/_/g, " ") +"</td>";
            html += "<td>SED-"+ branch1.name +"</td>";
            html += "<td>SED-"+ branch2.name +"</td>";
            // html += "<td>"+ (e.hours || "<can't fetch data>") +"</td>";
            html += '<td><button type="button" style="float:left" class="btn btn-success btnLicense" onclick="approveTransfer('+ e.id +')">Approve</button><button type="button" style="margin-left: 5px" class="btn btn-danger btnLicense" onclick="rejectTransfer('+ e.id +')">Reject</button></td>';
            html += "</tr>";   
            $('#transferReq').append(html);
          })
        });
      });
    }else{
      $('.noTransferReq').show();
    }
    $('.preloader').fadeOut();
  });
}

function approveTransfer(id){
  swal({
    title: "Are you sure?",
    text: "",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    cancelButtonColor: "#DD6B55",
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
    closeOnConfirm: true,
    closeOnCancel: true
  },function(isConfirm){
    if(!isConfirm) return;
    transfer.submitAction(id, 1, function(err, detail){
      if(err){
        swal('Failed!', err.message, 'error');
      }else{
        swal('Done!', detail, 'success');
      }
      transferReq();
    });
  });
}

function rejectTransfer(id){
  swal({
    title: "Are you sure?",
    text: "",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    cancelButtonColor: "#DD6B55",
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
    closeOnConfirm: true,
    closeOnCancel: true
  },function(isConfirm){
    if(!isConfirm) return;
    transfer.submitAction(id, 0, function(err, detail){
      if(err){
        swal('Failed!', err.message, 'error');
      }else{
        swal('Done!', detail, 'success');
      }
      transferReq();
    });
  });
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
  var suspendDate = Date.parse($('.suspendDate').val());
  var msg = $('#suspendMsg').val();
  if (suspendDate=="" || msg.replace(/\ /g, '') == "")
  {
    swal("Oops!", "Please fill out all required fields!", "error");
  }else{
    swal({
    title: "Are you sure",
    text: "you want to suspend classes for " + suspendDate.toString('MMM dd, yyyy hh:mm tt') + "? All students with a schedule on that day will be notified via e-mail.",
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
          scheduler.suspendSched(suspendDate.toString('MMM dd, yyyy HH:mm'), msg.trim(),function(err, detail){
            if(err){
              swal("Failed!", err.message, "error");
            }else{
              swal("Success!", "Email was sent to students and calendar is now updated!", "success");
              console.log(detail);
              schedule();
            }
          });
          //DB: suspend classes function here
        }
    });
  }
}

function searchSchedView(){
  var searchSched = $('.searchDateDisplayList').val();
  var branchSelected = $('.selBranchSchedView').val();
  if (searchSched==""){
    swal ("Oops!", "Please input date to display schedule.", "error");
  }else{
    scheduler.getSched(Date.parse(searchSched), branchSelected, function(err, data){
      if(err) return swal("Failed!", err.message, "error");
      $('#schedListView').html(""); 
      scheduler.getBranchName(branchSelected,(_,branch)=>{
        $('.searchBranchDisplayListSpan').html(branch);
        var x = 1;
        if (data.length!=0){
          $('.noschedListView').hide();
          data.forEach((e,i)=>{
            scheduler.getInstName(e.instID,(_,instName)=>{
              scheduler.getStudName(e.studID,(_,studName)=>{
                var html = "<tr>";
                html += "<td>"+ x +"</td>";
                html += "<td>"+ Date.parse(e.time).toString("hh:mm tt") +"</td>";
                html += "<td>"+ branch +"</td>";
                html += "<td>"+ instName.replace(/_/g," ") +"</td>";
                html += "<td>"+ studName.fullname.replace(/_/g," ") +"</td>";
                html += "<td><button type='button' style='margin-left: 10px' class='btn btn-inverse btnLicense' onclick='cancelSched()'>Cancel</button></td>";
                html += "</tr>";
                x++;
                $('#schedListView').append(html);
              });
            });
        });
        }else $('.noschedListView').show();
        $('.displaySchedDiv').show();
        $('.searchDateDisplayListSpan').html(Date.parse(searchSched).toString("MMMM dd, yyyy"));
      });
    });
  }
}

function schedClicked(event){
  $('#schedDate').html(moment(event.start).format("MM/DD/YYYY"));
  $('#timeSched').html(moment(event.start).format("hh:mm A") + " - " + moment(event.start).add(1,'hour').format("hh:mm A"));
  scheduler.getStudName(event.data.student.id, function(err, student){
    $('#studSched').html(student.fullname.replace(/_/g, " "));
    scheduler.getInstName(event.data.instructor.instID, function(err, name){
      $('#instSched').html(name.replace(/_/g," "));
      scheduler.getBranchName(event.data.branch, function(err, branch){
        $('#venueSched').html(branch);
        scheduler.selected = event._id;
        $('#viewSchedModal').modal("show");
      });
    });
  });
}