$(function() {
  $('#external-events .fc-event').each(function() {
    // store data so the calendar knows to render an event upon drop
    $(this).data('event', {
      title: $.trim($(this).text()), // use the element's text as the event title
      stick: true, // maintain when user navigates (see docs on the renderEvent method)
      _id: $(this).data("schedid"),
      allDay: false,
    });
    studentSchedule.onremove(this,$(this).data("schedid"), $.trim($(this).text()));
    // make the event draggable using jQuery UI
    $(this).draggable({
      zIndex: 999,
      revert: true,      // will cause the event to go back to its
      revertDuration: 0  //  original position after the drag
    });
  });

  var updateCalendar = (event)=>{
    $('#calendarSelectSched').fullCalendar("updateEvent",event);
  };

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
    selectable: true,
    selectHelper: true,
    eventLimit: true, // allow "more" link when too many events
    eventClick: function(event, jsEvent, view){
      //console.log(event); OPEN A MODAL THAT SHOWS THE INFO ABOUT THIS SCHEDULE <----------------------------------------
    },
    drop: function(date, jsEvent, ui, resourceId) {
      // is the "remove after drop" checkbox checked?
      if ($('#drop-remove').is(':checked')) {
        // if so, remove the element from the "Draggable Events" list
        $(this).remove();
      }
    },
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
      if(!event.allDay){
        event.color = "#7f7f7f";
        updateCalendar(event);
        var date = moment(event.start).format("YYYY-MM-DD");
        var time = moment(event.start).format("HH:mm:ss");
        app.scheduler.checkIfAvailable(date, time, function(err, available){
          if(err){
            event.color = "#ff1e1e";
            updateCalendar(event);
          }else{
            var color;
            switch(available){
              case 0 : {
                color = "#ff1e1e";
                break;
              } 
              case 1 : {
                color = "#3A87AD";
                break;
              } 
              case 2 : {
                color = "#ffbd16";
                break;
              } 
            }
            event.color = color;
            updateCalendar(event);
          }
        });
      }else{
        event.color = "#ff1e1e";
        updateCalendar(event);
      }
    },
    businessHours:[
      {
        dow: [ 1, 2, 3, 4, 5, 6, 7 ], // Monday, Tuesday, Wednesday
        start: '09:00', // 8am
        end: '17:30' // 6pm
      },
    ],
  });

  $('#calendarMainStudSched').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    disableDragging: true,
    editable: false,
    droppable: false, // this allows things to be dropped onto the calendar
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
    eventStartEditable: false,
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
});

function changePref(){
  //DB: Load preferred vehicle and sched here.
  
  $('#changePrefModal').modal("show");
}

function doneChangePref(){
  //DB: Update db with new preferred vehicle and sched.
  var days = [];
  $('input[name=prefDaysCBChange]:checked').each((a,b)=>{days.push(b.value)});
  var car = $('#prefVehiChange').val();
  if(!days || car == "---") return swal("All fields are required","","error");
  swal({
    title: "Edit Preference?",
    text: "Are you sure you want to change?",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    closeOnConfirm: false,
    closeOnCancel: true
  }, function(conf){
    if(conf){
      app.preference.updatePreference(days, car, function(err, done){
        if(err){
          swal("Failed!",err.message,"error");
        }else{
          swal("Preference updated!","","success");
        }
      });
    }
  });
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
  //$('#editPrefDateModal').modal("show");
  var events = $('#calendarMainStudSched').fullCalendar("clientEvents");
  $('#calendarSelectSched').fullCalendar('removeEventSources');
  $('#calendarSelectSched').fullCalendar('addEventSource', events);
}

function updateSchedule(){
  var rawEvents = $('#calendarSelectSched').fullCalendar('clientEvents');
  var events = [];
  rawEvents.forEach((element,index) => {
    events.push({
      id: element._id,
      date: moment(element.start).format('YYYY-MM-DD'),
      time: moment(element.start).format('HH:mm'),
    });
    if(index==rawEvents.length-1){
      console.log(events);
    }
  });
}