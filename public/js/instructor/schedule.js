$(function () {
    $('#calendarMainInstSched').fullCalendar({
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
    },
    editable: false,
    });
});

function viewSchedTodayInst(){
    $('.viewDiv').hide();
    $('.view-todaySched').show();
}

function viewSchedTomInst(){
    $('.viewDiv').hide();
    $('.view-tomSched').show();
}

function cancelSched(){
    $('#cancelSchedModal').modal('show');
}

function confirmCancel(){

}

function doneSched(){
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
            $('.viewDiv').hide();
            $('.view-instStudent').show();
        }
    });
}