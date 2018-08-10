$(function () {
    $('#calendarMainStudSched').fullCalendar({
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
    },
    editable: false,
    });
});

function viewSchedToday(){
    $('#viewSchedTodayModal').modal('show');
}