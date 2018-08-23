$(function (){               
    $('.enrolledCrsTbl1 tbody tr').click(function () {
        var selected = $(this).hasClass("highlightTr");
        $('.enrolledCrsTbl1 tbody tr').removeClass("highlightTr");
        if (!selected){
            $(this).addClass("highlightTr");
            var row = $(this).parent().parent().children().index($(this).parent());
            row = ".enrolledCrsTbl1 tbody tr:nth-child(" + row + ") td:nth-child(1)"
            var course = $(row).text();
            $('.h4selCrsforLes').html(course);
            $('.nav1 a[href="#lessonTab"]').tab('show');
            $('.nav1 a[href="#courseTab"]').tab('hide');
            }
    });
});

function viewEvaluationStud(){
    
    $('#viewEvalStudModal').modal("show");
}