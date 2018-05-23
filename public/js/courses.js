$(function () {
    clrSearchCourses();
    $('.tblCourses tbody tr:first').addClass("highlightTr");
    $('.tblCourses tbody tr').click(function () {
        var selected = $(this).hasClass("highlightTr");
        $('.tblCourses tbody tr').removeClass("highlightTr");
        if (!selected)
            $(this).addClass("highlightTr");
    });
});

function clrSearchCourses(){
    $('#searchCourses').val("");
}

function addCourse(){
    resetAddCourse();
    $('.h6AddCourse').html("ADD NEW COURSE");
    $('#btnConfResetCourse').hide();
    $('#btnConfEditCourse').hide();
    $('#btnCancAddCourse').show();
    $('#btnConfAddCourse').show();
    $('#addCourseModal').modal('show');
}

function editCourse(){
    resetAddCourse();
    $('.h6AddCourse').html("UPDATE COURSE");
    $('#btnConfAddCourse').hide();
    $('#btnCancAddCourse').show();
    $('#btnConfResetCourse').show();
    $('#btnConfEditCourse').show();
    $('#addCourseModal').modal('show');
}

function resetAddCourse(){
    $('#newCrsDays').val("");
    $('#newCrsPrice').val("");
    $('select[name="newCrsVehiType"]').val("0");
}

function remCourse(){
    swal({
        title: "Warning!",
        text: "Are you sure you want to remove this course?",
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
            $('#addCourseModal').modal('hide');
            swal("Success!", "Course is now unavailable.", "success");
            //DB: Remove course function here
        }
    });
}

function checkFieldsCourse(){
    var a, b;
    var days = $('#newCrsDays').val();
    var price = $('#newCrsPrice').val();
    var vehiType = $('select[name="newCrsVehiType"]').val();

    a = days.replace(/\s+/g, '');
    b = price.replace(/\s+/g, '');

    if (a=="" || b=="" || vehiType=="0") return "0";
    else return "1";
}

function confCancAddCourse(){
    var check = checkFieldsCourse();
    if (check=="0") $('#addCourseModal').modal('hide');
    else {
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
                $('#addCourseModal').modal('hide');
                //DB: Cancel changes here
            }
        });
    }
}

function confAddCourse()
{
    var check = checkFieldsCourse();
    if (check==0)
        swal("Oops!", "Please fill out all required fields.", "error");
    else {
        swal({
            title: "Warning!",
            text: "Are you sure you want to add this course?",
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
                swal("Success!", "New course has been added!", "success");
                $('#addCourseModal').modal('hide');
                //DB: Adding of course function here
            }
        });
    }
}

function confEditCourse(){
    var check = checkFieldsCourse();
    if (check==0)
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
                swal("Success!", "Course has been successully updated!", "success");
                $('#addCourseModal').modal('hide');
                //DB: Updating of course function here
            }
        });
    }
}

function confResetCourse(){
    resetAddCourse();
}