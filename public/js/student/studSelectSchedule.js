$(function() { 
  $('#external-events .fc-event').each(function() {
    // store data so the calendar knows to render an event upon drop
    $(this).data('event', {
      title: $.trim($(this).text()), // use the element's text as the event title
      stick: true // maintain when user navigates (see docs on the renderEvent method)
    });

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
    drop: function() {
      // is the "remove after drop" checkbox checked?
      if ($('#drop-remove').is(':checked')) {
        // if so, remove the element from the "Draggable Events" list
        $(this).remove();
      }
    },
    selectable: true,
    selectHelper: true,
    select: function(start, end) {
      var title = prompt('Event Title:');
      var eventData;
      if (title) {
        eventData = {
        title: title,
        start: start,
        end: end
        };
        $('#calendarSelectSched').fullCalendar('renderEvent', eventData, true); // stick? = true
      }
      $('#calendarSelectSched').fullCalendar('unselect');
    },
    editable: true,
    eventLimit: true, // allow "more" link when too many events
  });
});

function changePref(){
  //DB: Load preferred vehicle and sched here.
  $('#changePrefModal').modal("show");
}

function doneChangePref(){
  //DB: Update db with new preferred vehicle and sched.
}