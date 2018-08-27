var studName, studID, courseID, schedID, lessonID, dataID;
var selectedLesson, selectedGrade, selectedComment, selectedDate, selectedTime, selectedDataID, selectedInstID, selectedCourse;
var rowCount, course, sum, percent;
var studID = $('body').data('studid');

$(function (){               
    $('.enrolledCrsTbl1 tbody tr').click(function () {
        var selected = $(this).hasClass("highlightTr");
        $('.enrolledCrsTbl1 tbody tr').removeClass("highlightTr");
        if (!selected){
            $(this).addClass("highlightTr");
            courseID = $(this).closest('tr').find('td:eq(0)').attr("id");
            selectedCourse = $(this).closest('tr').find('td:eq(0)').text();
            $('.h4selCrsforLes').html(selectedCourse);
            $('.nav1 a[href="#lessonTab"]').tab('show');
            viewGradesStud();
            }
    });
});

function viewGradesStud(){
    var data = $(studID).data('info');
    var pad = "0000";
    // var dataId = data.id;

    evaluation.getGradesStud(function(err, data){
        if(err){
            swal("Failed!", err.message, "error");
            console.log(err);
        }else{
            $('#studGradesStud').html("");
            var x = 1;
            var dataLen = data.length;
            data.forEach(e => {
                dataID = e.id;
                var html = "<tr>";
                html += "<td>" + x + "</td>";
                html += "<td>" + e.title + "</td>";
                html += "<td>" + (Date.parse(e.date).toString("MMM dd, yyyy")) + "</td>";
                html += "<td>" + (Date.parse(e.time).toString("HH:mm")) + "</td>";
                html += "<td>" + e.fullname.replace(/_/g, ' ') + "</td>";
                
                html += "<td>" + e.grade + "</td>";
                html += "<td>" + e.comment + "</td>";
                html += "</tr>"; 
                x++;
                $('#studGradesStud').append(html);
            });
            if (dataLen==10){
                $('.btnViewEval').attr("disabled", false);
                $('.btnEvalInst').attr("disabled", false);
            }else{
                $('.btnViewEval').attr("disabled", true);
                $('.btnEvalInst').attr("disabled", true);
            }
        }
    });
}

function viewEvaluationStud(){
    $('#viewEvalStudModal').modal("show");
}