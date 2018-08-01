$(function() {    
    var x = $(window).height();
    $(".page-wrapper").height(x);

    $(".liSide").removeClass("active");
    $('.viewDiv').hide();
    $("#liStud1").addClass("active");

    $( document ).ajaxComplete(function(e, xhr, settings) {
        ajaxHandler.complete(xhr, settings);
    }).ajaxSend(function(e, xhr, settings){
        ajaxHandler.send(xhr, settings);
    });
});

function viewActiveStud (a){
    $('.viewDiv').hide();
    var li = "#liStud";
    for (var x=0; x<=9; x++){
        li += a.toString();
        if (x==a){
            $("li").removeClass("active");
        }
        else{
            $(li).addClass("active");
        }
        li = "#liStud";
    }

    if (a==1) studSchedule();
    else if (a==2) studCourseLessons();
    else if (a==3) studInstructors();
    else if (a==4) studPayment();
    else if (a==5) studAccount();
    else if (a==6) studLicAssist();
    else if (a==7) studTransBranch();
    else if (a==8) studCertificate();
}

var studSchedule = function (){
    $(".view-studSchedule").show();
}
var studCourseLessons = function (){
    $(".view-studCourseLessons").show();
}
var studInstructors = function (){
    $(".view-studInstructors").show();
}
var studPayment = function (){
    $(".view-studPayment").show();
}
var studAccount = function (){
    $(".view-studAccount").show();
}
var studLicAssist = function (){
    $(".view-studLicAssist").show();
}
var studTransBranch = function (){
    $(".view-studTransBranch").show();
}
var studCertificate = function (){
    $(".view-studCertificate").show();
}