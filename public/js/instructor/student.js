var studName, instID, studID, courseID, schedID, lessonID, dataID;
var selectedLesson, selectedGrade, selectedComment, selectedDate, selectedTime, selectedDataID;
var rowCount, course, sum, percent;

$(function(){  
    loadStudentI();
});

function loadStudentI(){
    rowCount = $('.tblHandledStud').length;
    $('.currStudInst').html(rowCount);
    $('.allStudInst').html(rowCount);
}

function viewGradesInst(id){
    studID = id;
    var data = $('#a'+id).data('info');
    var dataId = data.id;
    var pad = "0000";
    courseID = data.courseID;
    course = "CRS-"+ (data.carType.toUpperCase() + pad.substring(0,pad.length - (data.courseID+"").length)) + data.courseID;
    studName = data.fullname.replace(/_/g,' ');
    $('.viewDiv').hide();
    $('.view-addGradesInst').show();
    $('.studNumSTC').html(data.studID);
    $('.studNameSTC').html(data.fullname.replace(/_/g,' '));
    $('.studCrsSTC').html("CRS-"+ (data.carType.toUpperCase() + pad.substring(0,pad.length - (data.courseID+"").length)) + data.courseID);

    evaluation.getGradesInst(function(err, data){
        if(err){
            swal("Failed!", err.message, "error");
            console.log(err);
        }else{
            $('#studGradesInst').html("");
            var x = 1;
            data.forEach(e => {
                dataID = e.id;
                var html = "<tr id='"+ e.id +"'>";
                html += "<td>" + x + "</td>";
                html += "<td id='"+ e.id +"'>" + e.title + "</td>";
                html += "<td>" + (Date.parse(e.date).toString("MMM dd, yyyy")) + "</td>";
                html += "<td>" + (Date.parse(e.time).toString("HH:mm")) + "</td>";
                html += "<td id='instName"+ x +"' data-name='"+ e.fullname +"' >" + e.fullname.replace(/_/g, ' ') + "</td>";
                html += "<td>" + e.grade + "</td>";
                html += "<td>" + e.comment + "</td>";
                html += "</tr>";
                x++;
                $('#studGradesInst').append(html);
            });
            $("#studGradesInst tr").on('click', function() {
                selectedLesson = $(this).closest('tr').find('td:eq(1)').text();
                selectedGrade = $(this).closest('tr').find('td:eq(5)').text();
                selectedComment = $(this).closest('tr').find('td:eq(6)').text();
                selectedDate = $(this).closest('tr').find('td:eq(2)').text();
                selectedTime = $(this).closest('tr').find('td:eq(3)').text();
                selectedDataID = $(this).closest('tr').find('td:eq(1)').attr("id");
                showEditGradeModal();
            });
        }
    });
}

$('.backStudInst').on("click", function(){
    $('.viewDiv').hide();
    $('.view-instStudent').show();
});

function addGradeModal(){
    evaluation.getLessonEnrolled(function(err, data){
        if(err){
            swal("Failed!", err.message, "error");
            console.log(err);
        }else{
            $('#lessonListForGrade').html("");
            data.forEach((e,i)=>{
                var html = "<tr>";
                html = "<option id='" + e.id + "' data-info='" + JSON.stringify(e) + "' value='" + e.id + "'>" + e.title + "</option>";
                selected = e.id;
                $('#lessonListForGrade').append(html);
            }); 
            $("#lessonListForGrade").on('change', function() {
                lessonID = this.value;
            });
        }
    });
    evaluation.addGradeModal(function(err, data){
        if(err){
            swal("Failed!", err.message, "error");
            console.log(err);
        }else{
            $('#dateLessonList').html("");
            data.forEach((e,i)=>{
                var html = "";
                html += "<option id='" + e.schedID + "' data-info='" + JSON.stringify(e) + "' value='" + (Date.parse(e.schedtime).toString("HH:mm")) + "'>" + (Date.parse(e.date).toString("MMM dd, yyyy")) + "</option>";
                selected = e.schedID;
                $('#dateLessonList').append(html);
            }); 
            $(".dateLessonList").change(function() {
                schedID = $(this).children(":selected").attr("id");
                $('.timeLesson').val(this.value);
            });
        }
    });
    var data = $('#a'+studID).data('info');
    var name = data.fullname.replace(/_/g, ' ');
    schedID = $('.dateLessonList').children(":selected").attr("id");;
    $('.studNameAGM').html(data.fullname.replace(/_/g,' '));
    $('input:radio[name=rbLessonEval]').each(function () { $(this).prop('checked', false); });    
    $('#commentLesson').val("");
    $(".lessonListForGrade").val($(".lessonListForGrade option:first").val());
    $(".dateLessonList").val($(".dateLessonList option:first").val());
    $('.timeLesson').val($('select[name="dateLessonList"]').val());
    $('#addGradeModal').modal('show');
}

function showEditGradeModal(){
    $('.studNameAGM').html(studName);
    switch (selectedGrade){
        case "1":
            $("#rbLessonEvalEdit1").prop("checked", true);
            break;
        case "2":
            $("#rbLessonEvalEdit2").prop("checked", true);
            break;
        case "3":
            $("#rbLessonEvalEdit3").prop("checked", true);
            break;
        case "4":
            $("#rbLessonEvalEdit4").prop("checked", true);
            break;
        case "5":
            $("#rbLessonEvalEdit5").prop("checked", true);
            break;
    }
    evaluation.addGradeModal(function(err, data){
        if(err){
            swal("Failed!", err.message, "error");
            console.log(err);
        }else{
            $('#dateLessonListEdit').html("");
            data.forEach((e,i)=>{
                var html = "";
                html += "<option id='" + e.schedID + "' data-info='" + JSON.stringify(e) + "' value='" + (Date.parse(e.schedtime).toString("HH:mm")) + "'>" + (Date.parse(e.date).toString("MMM dd, yyyy")) + "</option>";
                selected = e.schedID;
                $('#dateLessonListEdit').append(html);
            }); 
            $("#dateLessonListEdit").change(function() {
                schedID = $(this).children(":selected").attr("id");
                $('.timeLesson1').val(this.value);
            });
            $('.dateLessonListEdit').val(selectedTime);
        }
    });
    $('.editLessonListForGrade').val(selectedLesson);
    $('#commentLessonEdit').val(selectedComment);
    $('.timeLesson1').val(selectedTime);
    $('#editGradeModal').modal('show');
}

function evaluateModal(){
    evaluation.getGradesSum(function(err, data){
        if(err){
            swal("Failed!", err.message, "error");
            console.log(err);
        }else{
            sum = data.sum;
            percent = (sum*2);
            $('.overallGrade').html(sum + "/50");
            $('.overallGrPerc').html(percent + "%");
        }
    });
    $('.evalCrs').html(course);
    $('.evalGrade').html(sum <= 24 ? "NEEDS TO EXTEND" : ((sum <= 34 && sum >= 25) ? "NEEDS PRACTICE" : "PASSED"));
    $('#commentInstEval').val("");
    $('.instEvaluator').html($('#instName10').data('name').replace(/_/g,' '))
    $('#evalStudModal').modal('show');
}

function saveLessonGrade(){
    lessonID = $("#lessonListForGrade option:first").val();
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
            schedID: schedID
        }
        evaluation.addGradeLesson(_data, function(err){
            if(err){
                swal("Failed!", err.message, "error");
                console.log(err);
            }else{
                swal ("Success!", "Lesson grade has been added!", "success");
                $('#addGradeModal').modal('hide');
                checkBtnEval();
            }
        });
    }
}

function checkBtnEval(){
    rowCount = $('#lessonForGradeTbl tbody tr').length;
    if ($(rowCount==10)) $('.btnEval1').prop('disabled', false);
    else $('.btnEval1').prop('disabled', true);
}

function saveEditLessonGrade(){
    var date = $("#dateLessonListEdit option:selected").text();
    var time = $('select[name="dateLessonListEdit"]').val();
    var grade = $("input[name='rbLessonEvalEdit']:checked").val();
    var comment = $('#commentLessonEdit').val();
    var _data = {
        id: selectedDataID,
        studID: studID,
        
        lessonID: 2,
        grade: grade,
        comment: comment,
        courseID: 2,
        schedID: 19
    }
    evaluation.updateGradeLesson(_data, function(err){
        if(err){
            swal("Failed!", err.message, "error");
            console.log(err);
        }else{
            swal ("Success!", "Changes have been saved!", "success");
            $('#editGradeModal').modal('hide');
        }
    });
}

function doneEvalStud(){
    var commentEval = $('#commentInstEval').val();
    if (commentEval==null){
        swal("Oops!", "Please state your comments or remarks to this student first.", "error");
    }
    else{
        swal("Success!", "Student is successfully evaluated!", "success");
    }
}