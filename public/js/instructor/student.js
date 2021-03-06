var studName, studID, courseID, schedID, lessonID, dataID;
var selectedLesson, selectedGrade, selectedComment, selectedDate, selectedTime, selectedDataID, selectedInstID, selectedLessonID, selectedSchedID;
var rowCount, course, sum, percent;
var instID = $('body').data('instid');

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1
    var yyyy = today.getFullYear();
    if(dd<10) { dd = '0'+dd } 
    if(mm<10) { mm = '0'+mm } 

$(function(){  
    loadStudentI();
});

function refreshInstStud(){
    location.reload();
    // window.location = window.location
    // history.go(0)
}

function loadStudentI(){
    rowCount = $('.tblHandledStudPast').length;
    rowCount -= 1;
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
            var dataLen = data.length;
            data.forEach(e => {
                dataID = e.id;
                var html = "<tr id='"+ e.id +"'>";
                html += "<td id='"+ e.id +"'>" + x + "</td>";
                html += "<td id='"+ e.lessonID +"'>" + e.title + "</td>";
                html += "<td id='"+ e.schedID +"'>" + (Date.parse(e.date).toString("MMM dd, yyyy")) + "</td>";
                html += "<td>" + (Date.parse(e.time).toString("HH:mm")) + "</td>";
                html += "<td id='"+ e.instID +"' data-name='"+ e.fullname +"' >" + e.fullname.replace(/_/g, ' ') + "</td>";
                html += "<td>" + e.grade + "</td>";
                html += "<td>" + e.comment + "</td>";
                html += "</tr>";
                x++;
                $('#studGradesInst').append(html);
            });
            if (dataLen==10){
                $('.btnAddI').hide();
                $('.btnEvalI').show();
            }else{
                $('.btnAddI').show();
                $('.btnEvalI').hide();
            }
            // $("#studGradesInst tr").on('click', function() {
            //     selectedLesson = $(this).closest('tr').find('td:eq(1)').text();
            //     selectedGrade = $(this).closest('tr').find('td:eq(5)').text();
            //     selectedComment = $(this).closest('tr').find('td:eq(6)').text();
            //     selectedDate = $(this).closest('tr').find('td:eq(2)').text();
            //     selectedTime = $(this).closest('tr').find('td:eq(3)').text();
            //     selectedDataID = $(this).closest('tr').find('td:eq(0)').attr("id");
            //     selectedLessonID = $(this).closest('tr').find('td:eq(1)').attr("id");
            //     selectedInstID = $(this).closest('tr').find('td:eq(4)').attr("id");
            //     selectedSchedID = $(this).closest('tr').find('td:eq(2)').attr("id");
            //     if (selectedInstID==instID) showEditGradeModal();
            //     else swal("Oops!", "You cannot update this grade because you are not the assigned instructor.", "error");
            // });
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
            var dateToday = new Date();
            dateToday = Date.parse(dateToday).toString("MMM dd, yyyy");
            $('#dateLessonList').html("");
            data.forEach((e,i)=>{
                var html = "";
                if (dateToday >= (Date.parse(e.date).toString("MMM dd, yyyy"))){
                    html += "<option id='" + e.schedID + "' data-info='" + JSON.stringify(e) + "' value='" + (Date.parse(e.schedtime).toString("HH:mm")) + "'>" + (Date.parse(e.date).toString("MMM dd, yyyy")) + "</option>";
                    selected = e.schedID;
                    $('#dateLessonList').append(html);
                }else{
                    html += "<option id='" + e.schedID + "'disabled data-info='" + JSON.stringify(e) + "' value='" + (Date.parse(e.schedtime).toString("HH:mm")) + "'>" + (Date.parse(e.date).toString("MMM dd, yyyy")) + "</option>";
                    selected = e.schedID;
                    $('#dateLessonList').append(html);
                }       
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
            var dateToday = new Date();
            dateToday = Date.parse(dateToday).toString("MMM dd, yyyy");
            $('#dateLessonListEdit').html("");
            data.forEach((e,i)=>{
                var html = "";
                if (dateToday >= (Date.parse(e.date).toString("MMM dd, yyyy"))){
                    html += "<option id='" + e.schedID + "' data-info='" + JSON.stringify(e) + "' value='" + (Date.parse(e.schedtime).toString("HH:mm")) + "'>" + (Date.parse(e.date).toString("MMM dd, yyyy")) + "</option>";
                    selected = e.schedID;
                    $('#dateLessonListEdit').append(html);
                }else{
                    html += "<option id='" + e.schedID + "' disabled data-info='" + JSON.stringify(e) + "' value='" + (Date.parse(e.schedtime).toString("HH:mm")) + "'>" + (Date.parse(e.date).toString("MMM dd, yyyy")) + "</option>";
                    selected = e.schedID;
                    $('#dateLessonListEdit').append(html);
                }                
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
            $('.evalGrade').html(sum <= 24 ? "NEEDS TO EXTEND" : ((sum <= 34 && sum >= 25) ? "NEEDS PRACTICE" : "PASSED"));
        }
    });
    evaluation.getGradesInst(function(err, data){
        if(err){
            swal("Failed!", err.message, "error");
            console.log(err);
        }else{
            $('.lessh6').html("");
            data.forEach(e => {
                dataID = e.id;
                var html = e.title + " &bull; ";
                $('.lessh6').append(html);
            });
        }
    });
    $('.evalCrs').html(course);
    $('#commentInstEval').val("");
    $('.instEvaluator').html('Austin Butler');
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
                $(".preloader").fadeIn(); 
                viewGradesInst(studID);
                $(".preloader").fadeOut(); 
            }
        });
    }
}

function saveEditLessonGrade(){
    var date = $("#dateLessonListEdit option:selected").text();
    var time = $('select[name="dateLessonListEdit"]').val();
    var grade = $("input[name='rbLessonEvalEdit']:checked").val();
    var comment = $('#commentLessonEdit').val();
    var _data = {
        id: selectedDataID,
        studID: studID,
        
        lessonID: selectedLessonID,
        grade: grade,
        comment: comment,
        courseID: courseID,
        schedID: selectedSchedID
    }
    evaluation.updateGradeLesson(_data, function(err){
        if(err){
            swal("Failed!", err.message, "error");
            console.log(err);
        }else{
            swal ("Success!", "Changes have been saved!", "success");
            $('#editGradeModal').modal('hide');
            $(".preloader").fadeIn(); 
            viewGradesInst(studID);
            $(".preloader").fadeOut(); 
        }
    });
}

function doneEvalStud(){
    today = mm + '/' + dd + '/' + yyyy;
    var dateEvaluated = (Date.parse(today).toString("yyyy-MM-dd"));
    var commentEval = $('#commentInstEval').val();
    if ((commentEval.replace(/_/g, ' '))==""){
        swal("Oops!", "Please state your comments or remarks to this student first.", "error");
    }
    else{
        var _data = {
            studID: studID,
            instID: instID,
            comment: commentEval,
            target: 1,
            courseID: courseID,
            grade: sum,
            dateEvaluated: dateEvaluated
        }
        evaluation.addEval(_data, function(err){
            if(err){
                swal("Failed!", err.message, "error");
                console.log(err);
            }else{
                swal ("Success!", "Course is finished! Evaluation details has been submitted.", "success");
                $('#evalStudModal').modal("hide");
                //DB: dito po pakitawag yung function para maging 0 yung status nya :)
            }
        });
    }
}

function viewEvalPast(){
    studID = $('#tblHandledStudPast tr').closest('tr').find('td:eq(0)').text();
    evaluation.getGradesInst2(function(err, data){
        if(err){
            swal("Failed!", err.message, "error");
            console.log(err);
        }else{
            $('.lessh6').html("");
            data.forEach(e => {
                dataID = e.id;
                var html = e.title + " &bull; ";
                $('.lessh6').append(html);
            });
        }
    });
    evaluation.getEvalStud(function (err, data){
        if(err){
            swal("Failed!", err.message, "error");
            console.log(err);
        }else{
            var html;
            $('#formViewEvalStud').html("");
            var x = 1;
            var pad = "0000";
            var eval;
            if(data.length!=0){
                var course = "CRS-"+ (data[0].carType.toUpperCase() + pad.substring(0,pad.length - (data[0].courseID+"").length)) + data[0].courseID;
                $('.evalCrs').html(course);
                $('.overallGrade').html(data[0].grade);
                $('.overallGrPerc').html((data[0].grade)*2 + "%");
                $('.evalGrade').html((data[0].grade <= 24 ? 'NEEDS TO EXTEND' : ((data[0].grade <= 34 && data[0].grade >= 25) ? 'NEEDS PRACTICE' : 'PASSED')));
                $('.commentInstEval1').val(data[0].comment);
                $('.instEvaluator').html(data[0].fullname.replace(/_/g, ' '));
                $('.evalDate').html((Date.parse(data[0].dateEvaluated).toString("MMM dd, yyyy")));
            }
            $('#formViewEvalStud').append(html);
        }
    });
    $('#viewEvalStudModal').modal("show");
}