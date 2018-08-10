$(function() {    
    var x = $(window).height();
    $(".page-wrapper").height(x);

    $(".liSide").removeClass("active");
    $('.viewDiv').hide();
    $("#liStud1").addClass("active");
    $('.view-studSchedule').show();

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
    $('.viewDiv').hide();
    $(".view-studSchedule").show();
}
var crsLes = 0;
var studCourseLessons = function (){
    $('.viewDiv').hide();
    loadCourseLessons();
    $(".view-studCourseLessons").show();
}
var studInstructors = function (){
    $('.viewDiv').hide();
    $(".view-studInstructors").show();
}
var studPayment = function (){
    $('.viewDiv').hide();
    $(".view-studPayment").show();
}
var studAccount = function (){
    $('.viewDiv').hide();
    resetSettingsStudent();
    $(".view-studAccount").show();
}
var studLicAssist = function (){
    $('.viewDiv').hide();
    $(".view-studLicAssist").show();
}
var studTransBranch = function (){
    $('.viewDiv').hide();
    $(".view-studTransBranch").show();
}
var studCertificate = function (){
    $('.viewDiv').hide();
    $(".view-studCertificate").show();
}

// MINOR

var studSelectSchedule = function (){
    $('.viewDiv').hide();
    $(".view-studSelectSchedule").show();
}