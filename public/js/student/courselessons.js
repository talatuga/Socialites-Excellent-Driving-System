function viewEvaluationStud(){
    $('#viewEvalStudModal').modal("show");
}

function loadCourseLessons(){
    $(".preloader").fadeIn(); 
    studCrsLes.getStudEnrCrsTbl(function(){
        $('#enrolledCrsTbl').click(function () {
            var selected = $(this).hasClass("highlightTr");
            $('.enrolledCrsTbl1 tr').removeClass("highlightTr");
            if (!selected)
                $(this).addClass("highlightTr");
        });
        $(".preloader").fadeOut(); 
    });
}