$(function() {    
    $('.navAdmin').hide();
    $('.navStudent').hide();
    $('.navBranch').hide();
    $('.navInstructor').show();
    $('.headerAdmin').hide();
    $('.headerStudent').hide();
    $('.headerInstructor').show();
    $('.headerBranch').hide();
    
    var x = $(window).height();
    $(".page-wrapper").height(x);

    $(".liSide").removeClass("active");
    $("#liInst1").addClass("active");
    $('.viewDiv').hide();
    $(".view-instSchedule").show();
    // $( document ).ajaxComplete(function(e, xhr, settings) {
    //     ajaxHandler.complete(xhr, settings);
    // }).ajaxSend(function(e, xhr, settings){
    //     ajaxHandler.send(xhr, settings);
    // });
});

function viewActiveInst (a){
    $('.viewDiv').hide();
    var li = "#liInst";
    for (var x=1; x<=5; x++){
        li += a.toString();
        if (x==a){
            $("li").removeClass("active");
            $('.colSide').removeClass("in");
        }
        else{
            $(li).addClass("active");
        }
        li = "#liInst";
    }

    if (a==1) instSchedule();
    else if (a==2) instStudent();
    else if (a==3) instEvaluation();
    else if (a==4) instAccount();
}

var instSchedule = function (){
    $('.viewDiv').hide();
    $(".view-instSchedule").show();
    $(".search-box").hide();
}

var instStudent = function (){
    $('.viewDiv').hide();
    $(".view-instStudent").show();
    $(".search-box").hide();
}

var instEvaluation = function (){
    $('.viewDiv').hide();
    $(".view-instEvaluation").show();
    $(".search-box").hide();
}

var instAccount = function (){
    resetSettingsInstructor();
    $('.viewDiv').hide();
    $(".view-instAccount").show();
    $(".search-box").hide();
}