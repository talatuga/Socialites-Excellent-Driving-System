var today = new Date();

$(function() {

  $("#schedStudName").prop("disabled", true);
  $("#schedInstName").prop("disabled", true);
  $("#schedTime").prop("disabled", true);
  $("#schedBranch").prop("disabled", true);

  $('.calendarBranch').fullCalendar({
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
    },
    editable: false,
    });
});

$('#btnUpdSched').on('click', function(){
  $("#schedStudName").removeAttr("disabled");
  $("#schedInstName").removeAttr("disabled");
  $("#schedTime").removeAttr("disabled");
  $("#schedBranch").removeAttr("disabled");
});

function todaySched(){
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
        scheduleBranch();
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