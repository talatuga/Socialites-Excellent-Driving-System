$(function () {
    clrSearchLesson();
    $('.tblLessons tbody tr:first').addClass("highlightTr");
    $('.tblLessons tbody tr').click(function () {
        var selected = $(this).hasClass("highlightTr");
        $('.tblLessons tbody tr').removeClass("highlightTr");
        if (!selected)
            $(this).addClass("highlightTr");
    });
});

function clrSearchLesson(){
    $('#searchLesson').val("");
}

function addLesson(){
    resetAddLesson();
    $('.h6AddLesson').html("ADD NEW LESSON");
    $('#btnConfResetLesson').hide();
    $('#btnConfEditLesson').hide();
    $('#btnCancAddLesson').show();
    $('#btnConfAddLesson').show();
    $('#addLessonModal').modal('show');
}

function editLesson(){
    resetAddLesson();
    $('.h6AddLesson').html("UPDATE LESSON");
    $('#btnConfAddLesson').hide();
    $('#btnCancAddLesson').show();
    $('#btnConfResetLesson').show();
    $('#btnConfEditLesson').show();
    $('#addLessonModal').modal('show');
}

function resetAddLesson(){
    $('#newLesName').val("");
    $('#newLesDesc').val("");
    $('select[name="newLesPrereq"]').val("0");
}

function confAddLesson()
{
    var isCheckLes = checkFieldsLesson();
    if (isCheckLes==0)
        swal("Oops!", "Please fill out all required fields.", "error");
    else {
        swal({
            title: "Warning!",
            text: "Are you sure you want to add this lesson?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function(isConfirm){
            if (isConfirm) {
                swal("Success!", "New lesson has been added!", "success");
                $('#addLessonModal').modal('hide');
                //DB: Adding of lesson function here
            }
        });
    }
}

function confEditLesson(){
    var isCheckLes = checkFieldsLesson();
    if (isCheckLes==0)
        swal("Oops!", "Please fill out all required fields.", "error");
    else {
        swal({
            title: "Warning!",
            text: "Are you sure you want to save the changes?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function(isConfirm){
            if (isConfirm) {
                swal("Success!", "Lesson has been successully updated!", "success");
                $('#addLessonModal').modal('hide');
                //DB: Updating of lesson function here
            }
        });
    }
}

function checkFieldsLesson(){
    var a, b, c;
    var name = $('#newLesName').val();
    var desc = $('#newLesDesc').val();
    var prereq = $('select[name="newLesPrereq"]').val();


    a = name.replace(/\s+/g, '');
    b = desc.replace(/\s+/g, '');

    if (a=="" || prereq=="0") return "0";
    else return "1";
}

function confResetLesson(){
    resetAddLesson();
}

function confCancAddLesson(){
    swal({
        title: "Warning!",
        text: "Are you sure you want to discard the changes?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function(isConfirm){
        if (isConfirm) {
            $('#addLessonModal').modal('hide');
            //DB: Cancel changes here
        }
    });
}

function remLesson(){
    swal({
        title: "Warning!",
        text: "Are you sure you want to remove this lesson?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        closeOnConfirm: false,
        closeOnCancel: true
    },
    function(isConfirm){
        if (isConfirm) {
            $('#addLessonModal').modal('hide');
            swal("Success!", "Lesson is now unavailable.", "success");
            //DB: Remove lesson function here
        }
    });
}