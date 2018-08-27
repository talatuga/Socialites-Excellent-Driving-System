$(function() {    
    $('.navAdmin').hide();
    $('.navStudent').hide();
    $('.navBranch').show();
    $('.navInstructor').hide();
    $('.headerAdmin').hide();
    $('.headerStudent').hide();
    $('.headerInstructor').hide();
    $('.headerBranch').show();
    
    var x = $(window).height();
    $(".page-wrapper").height(x);

    $(".liSide").removeClass("active");
    $("#liBranch1").addClass("active");
    $('.viewDiv').hide();
    $(".view-branchDashboard").show();
    // $( document ).ajaxComplete(function(e, xhr, settings) {
    //     ajaxHandler.complete(xhr, settings);
    // }).ajaxSend(function(e, xhr, settings){
    //     ajaxHandler.send(xhr, settings);
    // });
});

function viewActiveBranch (a){
    $('.viewDiv').hide();
    var li = "#liBranch";
    for (var x=1; x<=12; x++){
        li += a.toString();
        if (x==a){
            $("li").removeClass("active");
        }
        else{
            $(li).addClass("active");
        }
        li = "#liBranch";
    }

    if (a==1) branchDashboard();
    else if (a==2) branchStudent();
    else if (a==3) branchInstructor();
    else if (a==4) branchVehicle();
    else if (a==5) branchPayment();
    else if (a==6) branchEnrolment();
    else if (a==7) branchLicense();
    else if (a==8) branchReports();
    else if (a==9) branchAccount();
    else if (a==10) branchCertificate();
    else if (a==11) scheduleBranch();
}

// function viewActiveSchedBranch(a){
//     var li = "#liSHBranch";
//     $(".liSide").removeClass("active");
//     $("#liBranch11").addClass("active");
//     for (var x=1; x<=3; x++){
//         li += a.toString();
//         if (x==a){
//             $("li").removeClass("active");
//         }
//         else{
//             $(li).addClass("active");
//             $("#liBranch11").addClass("active");
//         }
//         li = "#liSHBranch";
//     }
//     $('.viewDiv').hide();
//     if (a==1) scheduleBranch();
//     else if (a==2) schedCanceledBranch();
// }

var branchDashboard = function (){
    $('.viewDiv').hide();
    $(".view-branchDashboard").show();
    $(".search-box").hide();
}

var branchStudent = function (){
    $('.viewDiv').hide();
    $(".view-branchStudent").show();
    $(".search-box").hide();
    loadStud();
}

var branchInstructor = function (){
    $('.viewDiv').hide();
    $(".view-branchInstructor").show();
    $(".search-box").hide();
}

var branchVehicle = function (){
    $('.viewDiv').hide();
    $(".view-branchVehicle").show();
    $(".search-box").hide();
}

var branchPayment = function (){
    $('.viewDiv').hide();
    $(".view-branchPayment").show();
    $(".search-box").hide();
}

var branchEnrolment = function (){
    $('.viewDiv').hide();
    $(".view-branchEnrolment").show();
    $(".search-box").hide();
}

var branchLicense = function (){
    $('.viewDiv').hide();
    $(".view-branchLicense").show();
    $(".search-box").hide();
}

var branchReports = function (){
    $('.viewDiv').hide();
    $(".view-branchReports").show();
    $(".search-box").hide();
}

var branchAccount = function (){
    $('.viewDiv').hide();
    $(".view-branchAccount").show();
    $(".search-box").hide();
}

var branchCertificate = function (){
    $('.viewDiv').hide();
    $(".view-branchCertificate").show();
    $(".search-box").hide();
}

var scheduleBranch = function (){
    $('.viewDiv').hide();
    $(".view-scheduleBranch").show();
    $(".search-box").hide();
}

var schedCanceledBranch = function (){
    $('.viewDiv').hide();
    $(".view-schedCanceledBranch").show();
    $(".search-box").hide();
}

var profileBranch = function (){
    $(".liSide").removeClass("active");
    $('.viewDiv').hide();
    $(".view-profileBranch").show();
    $(".search-box").hide();
}