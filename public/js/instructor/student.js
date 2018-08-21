var instID, studID, courseID, schedID, lessonID;
$(function(){  
    $("#lessonForGradeTbl tr").on('click', function() {
        $('#editGradeModal').modal('show');
    });
    $('select[name="dateLessonList"]').on('change', function() {
        $('.timeLesson').val(this.value);
    });
});

function getLesID(a){
    lessonID = a.value;
    alert (lessonID);
}

function viewGradesInst(id){
    studID = id;
    var data = $('#a'+id).data('info');
    var pad = "0000";
    courseID = data.courseID;
    schedID = data.schedID;
    $('.viewDiv').hide();
    $('.view-addGradesInst').show();
    $('.studNumSTC').html(data.studID);
    $('.studNameSTC').html(data.fullname.replace(/_/g,' '));
    $('.studCrsSTC').html("CRS-"+ (data.carType.toUpperCase() + pad.substring(0,pad.length - (data.courseID+"").length)) + data.courseID);
}

$('.backStudInst').on("click", function(){
    $('.viewDiv').hide();
    $('.view-instStudent').show();
});

function addGradeModal(){
    var data = $('#a'+studID).data('info');
    var name = data.fullname.replace(/_/g, ' ');
    lessonID = $(".lessonListForGrade option:first").val();
    $('.studNameAGM').html(data.fullname.replace(/_/g,' '));
    $('input:radio[name=rbLessonEval]').each(function () { $(this).prop('checked', false); });    
    $('#commentLesson').val("");
    $(".lessonListForGrade").val($(".lessonListForGrade option:first").val());
    $("#dateLessonList").val($("#dateLessonList option:first").val());
    $('.timeLesson').val($('select[name="dateLessonList"]').val());
    $('#addGradeModal').modal('show');
}

function evaluateModal(){
    $('#evalStudModal').modal('show');
}

function saveLessonGrade(){
    var lesson = $('select[name="lessonListForGrade"]').val();
    var date = $("#dateLessonList option:selected").text();
    var time = $('select[name="dateLessonList"]').val();
    var grade = $("input[name='rbLessonEval']:checked").val();
    var comment = $('#commentLesson').val();

    if ($("input[name='rbLessonEval']:checked").val() == null || time == ""){
        swal ("Oops!", "Please fill out all required fields!", "error")
    }else{
        var _data = {
            studID: studID,
            lessonID: lessonID,
            grade: grade,
            comment: comment,
            courseID: courseID,
            schedID: 1, //di ko pa nakukuha
        }
        evaluation.addGradeLesson(_data, function(err){
            if(err){
                swal("Failed!", err.message, "error");
                console.log(err);
            }else{
                swal ("Success!", "Lesson grade has been added!", "success");
                $('#addGradeModal').modal('hide');
            }
        });
    }
}

function saveEditLessonGrade(){

}

function doneEvalStud(){

}