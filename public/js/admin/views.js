$(function() {   
    $('.navAdmin').show();
    $('.navStudent').hide();
    $('.navInstructor').hide();
    $('.navBranch').hide();
    $('.headerAdmin').show();
    $('.headerStudent').hide();
    $('.headerInstructor').hide();
    $('.headerBranch').hide();
    
    var x = $(window).height();
    $(".page-wrapper").height(x);
    
    $(".liSide").removeClass("active");
    $("#li1").addClass("active");
    
    $(".view-viewInstructor").hide();
    $(".view-viewStudent").hide();
    
    $('.notif-box').on('click', function(){
        $('#notify-box').fadeOut();
    });
    $('#notify-box').hide();

    $( document ).ajaxComplete(function(e, xhr, settings) {
        ajaxHandler.complete(xhr, settings);
    }).ajaxSend(function(e, xhr, settings){
        ajaxHandler.send(xhr, settings);
    });

    notifier.init(function(notification){
        var messageType = {schedule: 'calendar'};
        var placeholder = $('.message-center');
        var types = {};
        var html = '<a href="#">'; 
        html += '<div class="btn btn-danger btn-circle m-r-10">'; 
        html +=     '<i class="fa fa-'+ messageType[notification.detail.messageType] +'"></i>';
        html += '</div>'; 
        html += '<div class="mail-contnet">'; 
        html +=     '<h5>'+ notification.detail.title +'</h5>'; 
        html +=     '<span class="mail-desc">'+ notification.detail.message +'</span>'; 
        html +=     '<span class="time">'+ Date.parse('now').toString('hh:mm tt') +'</span>'; 
        html += '</div>'; 
        html += '</a>';

        var oldHtml = placeholder.html();
        placeholder.html(html + oldHtml);
        $('#notify-box').fadeIn();
    });
    dashboard();
});

function viewActive (a){
    $('.viewDiv').hide();
    var li = "#li";
    for (var x=1; x<=18; x++){
        li += a.toString();
        if (x==a){
            if (a==9){
                $('.colSide').addClass("in");
            }
            else{
                $("li").removeClass("active");
                $('.colSide').removeClass("in");
            }
        }
        else{
            $(li).addClass("active");
        }
        li = "#li";
    }

    if (a==1) dashboard();
    else if (a==2) student();
    else if (a==3) instructor();
    else if (a==4) vehicle();
    else if (a==5) schedule();
    else if (a==6) branches();
    else if (a==7) account();
    else if (a==8) reports();
    else if (a==10) cert();
    else if (a==11) announce();
    else if (a==12) enroll();
    else if (a==13) dtp();
    else if (a==14) license1();
    else if (a==15) faquest();
}

function viewActiveCrs(a){
    var li = "#liC";
    $(".liSide").removeClass("active");
    for (var x=1; x<=3; x++){
        li += a.toString();
        if (x==a){
            $("li").removeClass("active");
        }
        else{
            $(li).addClass("active");
            $("#li9").addClass("active");
        }
        li = "#liC";
    }
    $('.viewDiv').hide();
    if (a==1) courses();
    else if (a==2) lessons();
}

var dashboard = function (){
    loadDash(); 
    $('.viewDiv').hide();
    $(".view-dashboard").show();
    $(".search-box").hide();
}

var instLoaded = 0;
var instructor = function (){
    $('.viewDiv').hide();
    if(instLoaded == 0){
        loadInst();  
        instLoaded = 1;
    };
    $(".search-box").hide();
    $(".view-instructor").show();
}

var vehiLoaded = 0;
var vehicle = function (){
    $('.viewDiv').hide();
    if(vehiLoaded == 0){
        vehiLoaded = 1;
        loadVehi();
    }
    $(".view-vehicleA").show();
    $(".search-box").hide();
}

var branches = function (){
    $('.viewDiv').hide();
    loadBranch();
    $(".view-branches").show();
    $(".search-box").hide();
}

var accLoad = 0
var account = function (){
    $('.viewDiv').hide();
    if(accLoad == 0){
        loadAccount();
        accLoad =1 ;
    }
    $(".view-account").show();
    $(".search-box").hide();
}

var enroll = function (){
    $('.viewDiv').hide();
    preRegAssess.offset = 0;
    loadPreReg();
    $(".view-enrollment").show();
    $(".search-box").hide();
    resetEnrollment();
}

var reports = function (){
    $('.viewDiv').hide();
    $(".view-reports").show();
    $(".search-box").hide();
}

var cert = function (){
    $('.viewDiv').hide();
    $(".view-cert").show();
    $(".search-box").hide();
}

var announce = function (){
    viewAnnouncements();
    $('.viewDiv').hide();
    $(".view-announce").show();
    $(".search-box").hide();
}

var tlect = function (){
    $('.viewDiv').hide();
    $(".view-tlect").show();
    $(".search-box").hide();
}

var student = function(){
    $('.viewDiv').hide();
    loadStud();
    $(".view-student").show();
    $(".search-box").hide();
}

var attendance = function(){
    $('.viewDiv').hide();
    $(".view-attendance").show();
    $(".search-box").hide();
}

var payment = function(){
    $('.viewDiv').hide();
    $(".view-payment").show();
    $(".search-box").hide();
}

var gradesEval = function(){
    $('.viewDiv').hide();
    $(".view-gradesEval").show();
    $(".search-box").hide();
}

var dtp = function(){
    $('.viewDiv').hide();
    $(".view-dtp").show();
    $(".search-box").hide();
}

var license1 = function(){
    $('.viewDiv').hide();
    $(".view-license").show();
    $(".search-box").hide();
}

var courses = function(){
    $('.viewDiv').hide();
    loadCourse();
    $(".view-courses").show();
    $(".search-box").hide();
}

var lessons = function(){
    $('.viewDiv').hide();
    loadLesson();
    $(".view-lessons").show();
    $(".search-box").hide();
}
var schedule = function (){
    $('.viewDiv').hide();
    $(".view-schedule").show();
    $(".search-box").hide();
    $('.displaySchedDiv').hide();
    schedLoad();
}

var schedRequest = function (){
    $('.viewDiv').hide();
    $(".view-reqSched").show();
    $(".search-box").hide();
}

var schedCanceled = function (){
    $('.viewDiv').hide();
    $(".view-cancSched").show();
    $(".search-box").hide();
}

var profile = function (){
    $(".liSide").removeClass("active");
    resetSettingsAdmin();
    $('.viewDiv').hide();
    $(".view-profile").show();
}

var faquest = function (){
    loadFaqLabel();
    // $(".liSide").removeClass("active");
    $('.viewDiv').hide();
    $(".view-faq").show();
}

var reports1 = function (){
    $(".liSide").removeClass("active");
    $('.viewDiv').hide();
    $(".view-reports1").show();
    $('.freqDiv').hide();
    $('.dailyDiv').show();
}

var reports2 = function (){
    $(".liSide").removeClass("active");
    $('.viewDiv').hide();
    $(".view-reports2").show();
    $('.freqDiv').hide();
    $('.dailyDiv').show();
}

var reports3 = function (){
    $(".liSide").removeClass("active");
    $('.viewDiv').hide();
    $(".view-reports3").show();
    $('.freqDiv').hide();
    $('.dailyDiv').hide();
}

var reports4 = function (){
    $(".liSide").removeClass("active");
    $('.viewDiv').hide();
    $(".view-reports4").show();
    $('.freqDiv').hide();
    $('.dailyDiv').hide();
}