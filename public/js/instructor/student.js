$(function(){  
    $("#lessonForGradeTbl tr").on('click', function() {
        $('#editGradeModal').modal('show');
    });
});

function getval(sel)
{
    var x = sel.val();
    $('.timeLesson').val(time);
    alert (x);
}

function getval1(sel)
{
    var x = sel.value;
}

function viewGradesInst(id){
    var data = $('#a'+id).data('info');
    var pad = "0000";
    $('.viewDiv').hide();
    $('.view-addGradesInst').show();
    $('.studNumSTC').html(data.studID);
    $('.studNameSTC').html(data.fullname.replace(/_/g,' '));
    $('.studNameAGM').html(data.fullname.replace(/_/g,' '));
    $('.studCrsSTC').html("CRS-"+ (data.carType.toUpperCase() + pad.substring(0,pad.length - (data.courseID+"").length)) + data.courseID);
}

$('.backStudInst').on("click", function(){
    $('.viewDiv').hide();
    $('.view-instStudent').show();
});

function addGradeModal(){
    $('#addGradeModal').modal('show');
    $('.timeLesson').val("");
    
}

function evaluateModal(){
    $('#evalStudModal').modal('show');
}

function saveLessonGrade(){
    var n;
    var lesson = $('select[name="lessonListForGrade"]').val();
    var date = $('select[name="dateLessonList"]').data("id");
    var time = $('select[name="dateLessonList"]').val();
    var countChecked = function() {
    n = $( "input[name='rbLessonEval']:checked" ).length;
    };
    countChecked();
    if (n==0 || time == ""){
        swal ("Oops!", "Please fill out all required fields!", "error")
    }else{
        alert (date + " " + time + " " + n);
        swal ("Success!", "Grade has been added!", "success");
        $('#addGradeModal').modal('hide');
    }
}

function saveEditLessonGrade(){

}

function doneEvalStud(){

}