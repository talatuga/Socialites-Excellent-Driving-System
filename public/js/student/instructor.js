var instID, studID, courseID;
var studID = $('body').data('studid');

function evaluateInst(a){
    instID = a;
    var data = $('#a'+a).data('info');
    var name = data.fullname.replace(/_/g, ' ');
    courseID = data.courseID;
    $('.instNameToEval').val(name);
    $('input:radio[name=rbInstEval]').each(function () { $(this).prop('checked', false); });    
    $('#taInstEval').val("");
    $('#evalInstModal').modal("show");
}

function doneEvalInst(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    today = mm + '/' + dd + '/' + yyyy;
    var name = $('.instNameToEval').val();
    var grade = $('input[name="rbInstEval"]:checked').val();
    var comment = $('#taInstEval').val();
    var dateEvaluated = (Date.parse(today).toString("yyyy-MM-dd"));
    alert (dateEvaluated);
    if (grade==null)
        swal ("Oops!", "Please select your evaluation grade.", "error");
    else{
        var _data = {
            studID: studID,
            instID: instID,
            comment: comment,
            target: 0,
            courseID: courseID,
            grade: grade,
            dateEvaluated: dateEvaluated
        }
        evaluation.addEval(_data, function(err){
            if(err){
                swal("Failed!", err.message, "error");
                console.log(err);
            }else{
                swal ("Success!", "Your instructor evaluation has been submitted!", "success");
                $('#evalInstModal').modal("hide");
                var trID = "#a" + instID;
                $(trID).remove();
            }
        });
    }
}