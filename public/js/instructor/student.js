$(function(){
    $("#lessonForGradeTbl tr").on('click', function() {
        $('#editGradeModal').modal('show');
    });
});

function viewGradesInst(){
    $('.viewDiv').hide();
    $('.view-addGradesInst').show();
}

$('.backStudInst').on("click", function(){
    $('.viewDiv').hide();
    $('.view-instStudent').show();
});

function addGradeModal(){
    $('#addGradeModal').modal('show');
}

function evaluateModal(){
    $('#evalStudModal').modal('show');
}

function saveLessonGrade(){

}

function saveEditLessonGrade(){

}

function doneEvalStud(){

}