$(function() {

  $("#schedStudName").prop("disabled", true);
  $("#schedInstName").prop("disabled", true);
  $("#schedTime").prop("disabled", true);
  $("#schedBranch").prop("disabled", true);

  $('.calendar').fullCalendar({
      header:
      {
        left:   'title',
        center: '',
        right:  'month prev,next'
      }
  });
});

$('#btnUpdSched').on('click', function(){
  $("#schedStudName").removeAttr("disabled");
  $("#schedInstName").removeAttr("disabled");
  $("#schedTime").removeAttr("disabled");
  $("#schedBranch").removeAttr("disabled");
});
