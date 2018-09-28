var schedToRemove = [];
var schedChange = [];
var overtime = 0;
var straight = 0;
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
    var events = $('#calendarSelectSched').fullCalendar("clientEvents");
    overtime = 0;
    straight = 0;
    events.forEach((e,i)=>{
      if(e.overtime){
        overtime++;
      }
      if(i==events.length-1){
        var total = overtime * 50;
        $('.tempOTF').html(total.formatMoney(2));
      }
    });
    for(var x=0; x<events.length; x++){
      for(var y=x+1; y<events.length; y++){
        var sched1 = moment(events[x].start).format("MMDDYYYY");
        var sched2 = moment(events[y].start).format("MMDDYYYY");
        if(sched1 == sched2){
          straight++;
        }
        if(x==events.length-2 && y==events.length-1){
          var total = straight * 100;
          $('.tempSF').html(total.formatMoney(2));
        }
      }
    }
  };

  /* initialize the calendar
  -----------------------------------------------------------------*/
  $('#calendarSelectSched').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    eventDurationEditable : false,
    editable: true,
    droppable: true, // this allows things to be dropped onto the calendar
    dragRevertDuration: 0,
    selectable: true,
    selectHelper: true,
    eventLimit: true, // allow "more" link when too many events
    eventClick: function(event, jsEvent, view){
      //console.log(event); OPEN A MODAL THAT SHOWS THE INFO ABOUT THIS SCHEDULE <----------------------------------------
      //console.log(event._id);
      editRecSched1(event._id);
    },
    drop: function(date, jsEvent, ui, resourceId) {
      // is the "remove after drop" checkbox checked?
      if ($('#drop-remove').is(':checked')) {
        // if so, remove the element from the "Draggable Events" list
        $(this).remove();
        var index = schedToRemove.indexOf($(this).data("schedid"));
        schedToRemove.splice(index,1);
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
            el.data('event', { title: event.title, _id: event._id, stick: true, data: event.data });
            schedToRemove.push(event._id);
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
        app.scheduler.checkIfAvailable(event, date, time, function(err, available){
          if(err){
            event.color = "#AA1414";
            updateCalendar(event);
          }else{
            event.overtime = false;
            var color;
            switch(available){
              case 0 : { //Unavailable
                color = "#AA1414";
                break;
              } 
              case 1 : {  //Available
                color = "#3A87AD";
                break;
              } 
              case 2 : {  //Overtime
                color = "#ffbd16";
                event.overtime = true;
                break;
              } 
            }
            event.color = color;
            updateCalendar(event);
          }
        });
      }else{
        event.color = "#AA1414";
        updateCalendar(event);
      }
    },
    businessHours:[
      {
        dow: [ 1, 2, 3, 4, 5, 6, 7 ], // Monday, Tuesday, Wednesday
        start: '09:00', // 8am
        end: '17:30' // 6pm
      },
      {
        dow: [7],
        start: '09:00', 
        end: '17:30'
      }
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
    eventClick: function(event, jsEvent, view){
      app.others.getInstName(event.data.instructor.instID, function(err, name){
        app.others.getBranchName(event.data.branch, function(er, bname){
          if(Array.isArray(name)) name = "Not assigned";
          $('#schedDate').html(moment(event.start).format("MM/DD/YYYY"));
          $('#timeSched').html(moment(event.start).format("hh:mm A") + " - " + moment(event.start).add('hour',1).format("hh:mm A"));
          $('#instSched').html(name.replace(/_/g, " "));
          $('#venueSched').html(bname);
          $('#viewSchedModal').modal("show");
        });
      });
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

  $('.todaySched').hide();
  $('.option2').hide();
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
  var events = $('#calendarMainStudSched').fullCalendar("clientEvents");
  $('#calendarRecSched').fullCalendar('removeEventSources');
  $('#calendarRecSched').fullCalendar('addEventSource', events);

  $('#recSched').html("");
  events.forEach((e,i)=>{
    var dateTime = moment(e.start);
    var html = "<tr>";
    html += "<td>"+ dateTime.format("MM/DD/YYYY") +"</td>";
    html += "<td>"+ dateTime.format("hh:mm A") + " - " + dateTime.add(1,'hour').format("hh:mm A") +"</td>";
    html += "<td>"+ "" +"</td>";
    html += "<td>"+ '<button type="button" class="btn btn-success btnLicense" onclick="editRecSched1('+ e._id +')">Edit</button><button type="button" class="btn btn-danger btnLicense" onclick="delRecSched('+ e._id +')">Delete</button>' +"</td>";
    html += "</tr>";
    $('#recSched').append(html);
  });

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

function editRecSched1(id){
  var schedEvent = ($('#calendarSelectSched').fullCalendar('clientEvents', id))[0];
  $('#editPrefDateModal').data('event', id);
  $('#recTime').html(moment(schedEvent.start).format("hh:mm A"));
  $('#recDate').html(moment(schedEvent.start).format("MM/DD/YYYY"));
  $('#instSelect').html("");
  app.scheduler.getFreeInst(moment(schedEvent.start).format("YYYY-MM-DD"), moment(schedEvent.start).format("HH:mm"), function(err, data){
    if(err){
      console.error(err);
    }else{
      data.forEach((e,i)=>{
        var html = "<option value='"+ e.instID +"' data-name='"+ e.fullname +"'>" + e.fullname.replace(/_/g," ") + "</option>";
        $('#instSelect').append(html);
      });
      if(schedEvent.data){
        if(schedEvent.data.instructor.instID){
          app.others.getInstName(schedEvent.data.instructor.instID, function(er,fullname){
            var html = "<option value='"+ schedEvent.data.instructor.instID +"' data-name='"+ fullname +"'>" + fullname.replace(/_/g," ") + "</option>";
            $('#instSelect').append(html);
            $('#instSelect').val(schedEvent.data.instructor.instID);
          });
        }
      }
      $('#editPrefDateModal').modal("show");
    }
  });
}

function editRecSched(){
  var events = $('#calendarMainStudSched').fullCalendar("clientEvents");
  $('#calendarSelectSched').fullCalendar('removeEventSources');
  $('#calendarSelectSched').fullCalendar('addEventSource', events);
}

function updateSchedule(){
  var rawEvents = $('#calendarSelectSched').fullCalendar('clientEvents');
  var mainEvents = $('#calendarMainStudSched').fullCalendar("clientEvents");

  var events = [];

  var submit = ()=>{
    swal({
      title: "Edit Schedule?",
      text: "Are you sure you want to change?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      closeOnConfirm: false,
      closeOnCancel: true
    },function(conf){
      if(conf){
        app.scheduler.updateSchedule(events,function(err, res){
          if(err){
            console.error(err);
            swal("Failed!", err.message, "error");
          }else{
            if(res.status == 1){
              swal("Updated!", "Schedule Successfully Updated", "success");
            }else if(res.status == 2){
              swal("Overtime Schedule!", "Schedule submit for review, we will inform you later.", "warning");
            }else if(res.status == 0){
              swal("Conflict Found!", res.title + " schedule isn't available", "error");
            }
          }
        });
      }
    });
  };

  var removeSched = ()=>{
    swal({
      title: "Edit Schedule?",
      text: "Are you sure you want to change?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      closeOnConfirm: false,
      closeOnCancel: true
    },function(conf){
      if(conf){
        var promises = [];
        schedToRemove.forEach((e,i)=>{
          promises.push(new Promise((resolve,reject)=>{
            app.scheduler.removeSched(e,(err)=>{
              if(err) return reject(err);
              resolve();
            });
          }));
          if(i==schedToRemove.length-1){
            Promise.all(promises).then(()=>{
              swal("Updated!", "Schedule Successfully Remove", "success");
            }).catch(reason=>{
              swal("Failed!", reason, "error");
            });
          }
        });
      }    
    });
  };

  var validateChange = function(cb){
    var promises = [];
    rawEvents.forEach((e,i)=>{
      promises.push(new Promise((r,x)=>{
        mainEvents.forEach((el,count)=>{
          if(e._id == el._id){
            if(e.data.instructor.instID!=el.data.instructor.instID){
              r(e);
            }else if(moment(e.start).format('YYYY-MM-DD HH:mm')==moment(el.start).format('YYYY-MM-DD HH:mm')){
              r(0);
            }else{
              r(e);
            }
          }
          if(count==mainEvents.length-1){
            r(e);
          }
        });
      }));
      if(i==rawEvents.length-1){
        Promise.all(promises).then((asd)=>{
          cb(asd);
        });
      }
    });
  };

  if(schedToRemove.length>0){
    removeSched();
    return;
  }

  validateChange((res)=>{
    res.forEach((element,i)=>{
      if(element == 0) return;
      events.push({
        id: element._id,
        date: moment(element.start).format('YYYY-MM-DD'),
        time: moment(element.start).format('HH:mm'),
        title: element.title,
        instructor: element.data ? element.data.instructor : null,
      });
      if(i==res.length-1){
        submit();
      }
    });
  });
}

function doneChangeSched(){
  var eventID = $('#editPrefDateModal').data('event');
  var schedEvent = $('#calendarSelectSched').fullCalendar('clientEvents', eventID)[0];
  var inst = $('#instSelect').val();
  var instName = $('option[value='+ inst +']').data('name');
  if(schedEvent.data){
    schedEvent.data.instructor = {instID: inst, name: instName};
  }else{
    schedEvent.data = {instructor: {instID: inst, name: instName}};
  }
  
  schedChange.push(schedEvent);

  $('#calendarSelectSched').fullCalendar('updateEvent', schedEvent);
}