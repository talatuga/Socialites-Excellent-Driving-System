function viewEvaluationStud(){
    $('#viewEvalStudModal').modal("show");
}

function loadCourseLessons(){
    $(".preloader").fadeIn(); 
    studCrsLes.getStudEnrCrsTbl(function(){
        $('#enrolledCrsTbl tr').click(function () {
            var selected = $(this).hasClass("highlightTr");
            $('#enrolledCrsTbl tr').removeClass("highlightTr");
            if (!selected)
                $(this).addClass("highlightTr");
        });
        $(".preloader").fadeOut(); 
    });
}