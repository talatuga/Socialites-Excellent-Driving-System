$(function () {
    clrSearchLesson();
    $('#searchLesson').on('click', function(e){
        search.init(topic.pages[topic.currPage],["lessonID","title"], function(data){
            renderLessonTable(data);
        });
    });
    $('#searchLesson').on('keyup',function(e){
        search.keypress($('#searchLesson').val());
    });
});

var lessonLoaded = 0;
var loadLesson = function(){
    if(lessonLoaded == 0){
        $(".preloader").fadeIn();          
        topic.getList(function(){
            renderLessonTable(topic.pages[topic.currPage]);
            $('.tblLessons tbody tr:first').addClass("highlightTr");
            $('.tblLessons tbody tr').click(function () {
                var selected = $(this).hasClass("highlightTr");
                $('.tblLessons tbody tr').removeClass("highlightTr");
                if (!selected)
                    $(this).addClass("highlightTr");
            });
            topic.getAllLocalData();            
            viewLessonDetail(topic.pages[topic.currPage][0].id);
            $(".preloader").fadeOut();                      
            lessonLoaded = 1;
        });
    }
}

function clrSearchLesson(){
    $('#searchLesson').val("");
}

function addLesson(){
    resetAddLesson();
    $('.h6AddLesson').html("ADD NEW LESSON");
    $('#btnConfResetLesson').hide();
    $('#btnConfEditLesson').hide();
    $('#btnCancAddLesson').show();
    $('#btnConfAddLesson').show();
    $('#addLessonModal').modal('show');
}

function editLesson(){
    resetAddLesson();
    $('.h6AddLesson').html("UPDATE LESSON");
    $('#btnConfAddLesson').hide();
    $('#btnCancAddLesson').show();
    $('#btnConfResetLesson').show();
    $('#btnConfEditLesson').show();
    $('#addLessonModal').modal('show');
    renderEdit();
}

function resetAddLesson(){
    $('#newLesName').val("");
    $('#newLesDesc').val("");
    $('select[name="newLesPrereq"]').val("0");
    var count = topic.allData.length;
    var html = "<option value='0'>none</option>";
    topic.allData.forEach(x=>{
        html += "<option value='"+ x.id +"'>"+ x.title +"</option>";
        count--;
        if(count == 0){
            $('#newLesPrereq').html(html);
        }
    });
}

function confAddLesson()
{
    var data;
    var isCheckLes = checkFieldsLesson(function(out){
        data = out;
    });
    if (isCheckLes==0)
        swal("Oops!", "Please fill out all required fields.", "error");
    else {
        swal({
            title: "Warning!",
            text: "Are you sure you want to add this lesson?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function(isConfirm){
            if (isConfirm) {
                topic.add(data, function(err){
                    if(err){
                        swal("Failed!", err.message, "error");                        
                    }else{
                        swal("Success!", "New lesson has been added!", "success");
                        $('#addLessonModal').modal('hide');
                        //DB: Adding of lesson function here
                    }
                });
            }
        });
    }
}

function confEditLesson(){
    var data;
    var isCheckLes = checkFieldsLesson(function(out){
        data = out;
    });
    if (isCheckLes==0)
        swal("Oops!", "Please fill out all required fields.", "error");
    else {
        swal({
            title: "Warning!",
            text: "Are you sure you want to save the changes?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function(isConfirm){
            if (isConfirm) {
                topic.update(data, function(err){
                    if(err){
                        swal("Failed!", err.message, "error");
                    }else{
                        swal("Success!", "Lesson has been successully updated!", "success");
                        $('#addLessonModal').modal('hide');
                        //DB: Updating of lesson function here
                    }
                });
            }
        });
    }
}

function checkFieldsLesson(cb){
    var a, b, c;
    var name = $('#newLesName').val();
    var desc = $('#newLesDesc').val();
    var prereq = $('select[name="newLesPrereq"]').val();


    a = name.replace(/\s+/g, '');
    b = desc.replace(/\s+/g, '');

    if (a=="") return "0";
    else{
        if(cb != undefined){
            var data = {
                title: name,
                description: desc,
                prerequisite: (prereq == 0 ? null : prereq),
            };
            cb(data);
        }
        return "1";
    } 
}

function confResetLesson(){
    renderEdit();
}

function confCancAddLesson(){
    $('#addLessonModal').modal('hide');
}

function remLesson(){
    swal({
        title: "Warning!",
        text: "Are you sure you want to remove this lesson?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        closeOnConfirm: false,
        closeOnCancel: true
    },
    function(isConfirm){
        if (isConfirm) {
            topic.delete(function(err){
                if(err){
                    swal("Failed!", err.message, "error");
                }else{
                    $('#addLessonModal').modal('hide');
                    swal("Success!", "Lesson is now unavailable.", "success");
                    //DB: Remove lesson function here
                }
            });
        }
    });
}

var renderLessonTable = function(data){
    var html = "";
    data.forEach(x=>{
        if(x.purgeFlag != 0){
            html += "<tr onclick='viewLessonDetail("+ x.id +")'>";
            // html += "<td>"+ x.lessonID +"</td>";
            html += "<td>"+ x.title +"</td>";
            html += "</tr>";
        }
    });
    $('#lessonTable').html(html);
}

var viewLessonDetail = function(id){
    topic.selected = id;
    topic.getLocalData(function(profile){
        $('.lesName').html(profile.title);
        // $('.lesID').html(profile.lessonID);
        $('.lesDesc').html(profile.description);
        var pad = "000";
        var preID = "SED-L" + (pad.substring(0,pad.length - (profile.prerequisite + "").length) + profile.prerequisite);
        $('.lesPrereq').html((profile.prerequisite == null ? "none" : preID));
    });
}

var renderEdit = function(){
    topic.getLocalData(function(profile){
        var name = $('#newLesName').val(profile.title);
        var desc = $('#newLesDesc').val(profile.description);
        var prereq = $('#newLesPrereq').val(profile.prerequisite);
    });
}