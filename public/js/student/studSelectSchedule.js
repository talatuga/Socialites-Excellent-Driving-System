$(function() {
  $('#external-events .fc-event').each(function() {
    // store data so the calendar knows to render an event upon drop
    $(this).data('event', {
      title: $.trim($(this).text()), // use the element's text as the event title
      stick: true, // maintain when user navigates (see docs on the renderEvent method)
      _id: $(this).data("schedid"),
    });
    studentSchedule.onremove(this,$(this).data("schedid"), $.trim($(this).text()));
    // make the event draggable using jQuery UI
    $(this).draggable({
      zIndex: 999,
      revert: true,      // will cause the event to go back to its
      revertDuration: 0  //  original position after the drag
    });
  });

  /* initialize the calendar
  -----------------------------------------------------------------*/
  $('#calendarSelectSched').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    editable: true,
    droppable: true, // this allows things to be dropped onto the calendar
    dragRevertDuration: 0,
    drop: function(date, jsEvent, ui, resourceId) {
      // is the "remove after drop" checkbox checked?
      if ($('#drop-remove').is(':checked')) {
        // if so, remove the element from the "Draggable Events" list
        $(this).remove();
      }
    },
    selectable: true,
    selectHelper: true,
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    eventDragStop: function (event, jsEvent, ui, view) {
      if (isEventOverDiv(jsEvent.clientX, jsEvent.clientY)) {
        studentSchedule.removeSched(event._id, function(err){
          if(err == null){
            $('#calendarSelectSched').fullCalendar('removeEvents', event._id);
            var el = $("<div data-schedid="+ event._id +" class='fc-event'>").appendTo('#availEvents').text(event.title);
            el.draggable({
              zIndex: 999,
              revert: true,
              revertDuration: 0
            });
            el.data('event', { title: event.title, _id: event._id, stick: true });
          }
        });
      }
    },
    eventDrop: function(event, delta, revertFunc, jsEvent, ui, view){
      console.log(event._id);
    },
    eventSources:[
      {
        url: "/api/v1/sched/calendar",
        type: "GET",
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

  var isEventOverDiv = function (x, y) {

    var external_events = $('#external-events');
    var offset = external_events.offset();
    offset.right = external_events.width() + offset.left;
    offset.bottom = external_events.height() + offset.top;

    // Compare
    if (x >= offset.left
        && y >= offset.top
        && x <= offset.right
        && y <= offset.bottom) { return true; }
    return false;
  }


  $('#calendarRecSched').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    editable: false,
  });
});

function changePref(){
  //DB: Load preferred vehicle and sched here.
  $('#changePrefModal').modal("show");
}

function doneChangePref(){
  //DB: Update db with new preferred vehicle and sched.
}

function seeRecSched(){
  $('.viewDiv').hide();
  $('.view-recSched').show();
}

$('.backSched1').on("click", function(){
  $('.viewDiv').hide();
  $('.view-studSchedule').show();
});

$('.backSched2').on("click", function(){
  $('.viewDiv').hide();
  $('.view-studSelectSchedule').show();
});

function editRecSched(){
  $('#editPrefDateModal').modal("show");
}