$(function() {    
    var x = $(window).height();
    $(".page-wrapper").height(x);

    $(".view-instructor").hide();
    $(".view-schedule").hide();
    $(".view-student").hide();
    $(".view-enrollment").hide();
    $(".view-vehicleA").hide();
    $(".view-branches").hide();
    $(".view-dashboard").show();
    $(".view-lessons").hide();
    $(".view-requirement").hide();
    $(".view-account").hide();

    $(".view-viewInstructor").hide();
    $(".view-viewStudent").hide();
});

var dashboard = function() 
{
    $(".search-box").show();
    $(".view-instructor").hide();
    $(".view-schedule").hide();
    $(".view-student").hide();
    $(".view-enrollment").hide();
    $(".view-vehicleA").hide();
    $(".view-branches").hide();
    $(".view-viewInstructor").hide();
    $(".view-viewStudent").hide();
    $(".view-dashboard").show();
    $(".view-requirement").hide();
    $(".view-lessons").hide();
    $(".view-account").hide();
    document.getElementById("li2").classList.remove('active');
    document.getElementById("li3").classList.remove('active');
    document.getElementById("li4").classList.remove('active');
    document.getElementById("li5").classList.remove('active');
    document.getElementById("li6").classList.remove('active');
    document.getElementById("li2A").classList.remove('active');
    document.getElementById("li2B").classList.remove('active');
    document.getElementById("li2C").classList.remove('active');
    document.getElementById("li2D").classList.remove('active');
    document.getElementById("li1").classList.add('active');
    document.getElementById("li7").classList.remove('active');
    document.getElementById("li9").classList.remove('active');
    document.getElementById("li8").classList.remove('active');
}

var activeStud = function ()
{
    document.getElementById("li1").classList.remove('active');
    document.getElementById("li3").classList.remove('active');
    document.getElementById("li4").classList.remove('active');
    document.getElementById("li5").classList.remove('active');
    document.getElementById("li6").classList.remove('active');
    document.getElementById("li2A").classList.remove('active');
    document.getElementById("li2B").classList.remove('active');
    document.getElementById("li2C").classList.remove('active');
    document.getElementById("li2D").classList.remove('active');
    document.getElementById("li7").classList.remove('active');
    document.getElementById("li9").classList.remove('active');
    document.getElementById("li8").classList.remove('active');
}

var activeStudA = function ()
{
    $(".search-box").hide();
    $(".view-instructor").hide();
    $(".view-schedule").hide();
    $(".view-dashboard").hide();
    $(".view-vehicleA").hide();
    $(".view-branches").hide();
    $(".view-viewInstructor").hide();
    $(".view-viewStudent").hide();
    $(".view-enrollment").hide();
    $(".view-student").show();
    $(".view-requirement").hide();
    $(".view-lessons").hide();
    $(".view-account").hide();
    document.getElementById("li1").classList.remove('active');
    document.getElementById("li3").classList.remove('active');
    document.getElementById("li4").classList.remove('active');
    document.getElementById("li5").classList.remove('active');
    document.getElementById("li6").classList.remove('active');
    document.getElementById("li2B").classList.remove('active');
    document.getElementById("li2C").classList.remove('active');
    document.getElementById("li2D").classList.remove('active');
    document.getElementById("li2").classList.add('active');
    document.getElementById("li2A").classList.add('active');
    document.getElementById("li7").classList.remove('active');
    document.getElementById("li9").classList.remove('active');
    document.getElementById("li8").classList.remove('active');
}

var activeStudB = function ()
{
    $(".search-box").hide();
    $(".view-instructor").hide();
    $(".view-schedule").hide();
    $(".view-dashboard").hide();
    $(".view-vehicleA").hide();
    $(".view-branches").hide();
    $(".view-viewInstructor").hide();
    $(".view-viewStudent").hide();
    $(".view-student").hide();
    $(".view-enrollment").show();
    $(".view-requirement").hide();
    $(".view-lessons").hide();
    $(".view-account").hide();
    document.getElementById("li1").classList.remove('active');
    document.getElementById("li3").classList.remove('active');
    document.getElementById("li4").classList.remove('active');
    document.getElementById("li5").classList.remove('active');
    document.getElementById("li6").classList.remove('active');
    document.getElementById("li2A").classList.remove('active');
    document.getElementById("li2C").classList.remove('active');
    document.getElementById("li2D").classList.remove('active');
    document.getElementById("li2").classList.add('active');
    document.getElementById("li2B").classList.add('active');
    document.getElementById("li7").classList.remove('active');
    document.getElementById("li9").classList.remove('active');
    document.getElementById("li8").classList.remove('active');
    resetEnrollment();
}

var activeStudC = function ()
{

}

var activeStudD = function ()
{

}

var instLoaded = 0;
var instructor = function ()
{
    if(instLoaded == 0){
        loadInst();  
        instLoaded = 1;
    };
    $(".search-box").hide();
    $(".view-dashboard").hide();
    $(".view-schedule").hide();
    $(".view-student").hide();
    $(".view-enrollment").hide();
    $(".view-vehicleA").hide();
    $(".view-branches").hide();
    $(".view-viewInstructor").hide();
    $(".view-viewStudent").hide();
    $(".view-instructor").show();
    $(".view-requirement").hide();
    $(".view-lessons").hide();
    $(".view-account").hide();
    document.getElementById("li1").classList.remove('active');
    document.getElementById("li2").classList.remove('active');
    document.getElementById("li4").classList.remove('active');
    document.getElementById("li5").classList.remove('active');
    document.getElementById("li6").classList.remove('active');
    document.getElementById("li2A").classList.remove('active');
    document.getElementById("li2B").classList.remove('active');
    document.getElementById("li2C").classList.remove('active');
    document.getElementById("li2D").classList.remove('active');
    document.getElementById("li3").classList.add('active');
    document.getElementById("li7").classList.remove('active');
    document.getElementById("li9").classList.remove('active');
    document.getElementById("li8").classList.remove('active');
}

var vehiLoaded = 0;
var vehicle = function ()
{
    if(vehiLoaded == 0){
        vehiLoaded = 1;
        loadVehi();
    }
    $(".search-box").hide();
    $(".view-instructor").hide();
    $(".view-schedule").hide();
    $(".view-dashboard").hide();
    $(".view-student").hide();
    $(".view-enrollment").hide();
    $(".view-branches").hide();
    $(".view-viewInstructor").hide();
    $(".view-viewStudent").hide();
    $(".view-vehicleA").show();
    $(".view-requirement").hide();
    $(".view-lessons").hide();
    $(".view-account").hide();
    document.getElementById("li1").classList.remove('active');
    document.getElementById("li2").classList.remove('active');
    document.getElementById("li3").classList.remove('active');
    document.getElementById("li5").classList.remove('active');
    document.getElementById("li6").classList.remove('active');
    document.getElementById("li2A").classList.remove('active');
    document.getElementById("li2B").classList.remove('active');
    document.getElementById("li2C").classList.remove('active');
    document.getElementById("li2D").classList.remove('active');
    document.getElementById("li4").classList.add('active');
    document.getElementById("li7").classList.remove('active');
    document.getElementById("li9").classList.remove('active');
    document.getElementById("li8").classList.remove('active');
}

var schedule = function() 
{
    $(".search-box").hide();
    $(".view-dashboard").hide();
    $(".view-instructor").hide();
    $(".view-student").hide();
    $(".view-enrollment").hide();
    $(".view-vehicleA").hide();
    $(".view-branches").hide();
    $(".view-viewInstructor").hide();
    $(".view-viewStudent").hide();
    $(".view-schedule").show();
    $(".view-requirement").hide();
    $(".view-lessons").hide();
    $(".view-account").hide();
    document.getElementById("li1").classList.remove('active');
    document.getElementById("li2").classList.remove('active');
    document.getElementById("li3").classList.remove('active');
    document.getElementById("li4").classList.remove('active');
    document.getElementById("li6").classList.remove('active');
    document.getElementById("li2A").classList.remove('active');
    document.getElementById("li2B").classList.remove('active');
    document.getElementById("li2C").classList.remove('active');
    document.getElementById("li2D").classList.remove('active');
    document.getElementById("li5").classList.add('active');
    document.getElementById("li7").classList.remove('active');
    document.getElementById("li9").classList.remove('active');
    document.getElementById("li8").classList.remove('active');
}

var branches = function ()
{
    loadBranch();
    $(".search-box").hide();
    $(".view-instructor").hide();
    $(".view-schedule").hide();
    $(".view-dashboard").hide();
    $(".view-student").hide();
    $(".view-enrollment").hide();
    $(".view-vehicleA").hide();
    $(".view-viewInstructor").hide();
    $(".view-viewStudent").hide();
    $(".view-branches").show();
    $(".view-requirement").hide();
    $(".view-lessons").hide();
    $(".view-account").hide();
    document.getElementById("li1").classList.remove('active');
    document.getElementById("li2").classList.remove('active');
    document.getElementById("li3").classList.remove('active');
    document.getElementById("li4").classList.remove('active');
    document.getElementById("li5").classList.remove('active');
    document.getElementById("li2A").classList.remove('active');
    document.getElementById("li2B").classList.remove('active');
    document.getElementById("li2C").classList.remove('active');
    document.getElementById("li2D").classList.remove('active');
    document.getElementById("li6").classList.add('active');
    document.getElementById("li7").classList.remove('active');
    document.getElementById("li9").classList.remove('active');
    document.getElementById("li8").classList.remove('active');
}

var account = function ()
{
    $(".search-box").hide();
    $(".view-instructor").hide();
    $(".view-schedule").hide();
    $(".view-dashboard").hide();
    $(".view-student").hide();
    $(".view-enrollment").hide();
    $(".view-vehicleA").hide();
    $(".view-viewInstructor").hide();
    $(".view-viewStudent").hide();
    $(".view-branches").hide();
    $(".view-requirement").hide();
    $(".view-lessons").hide();
    $(".view-account").show();
    document.getElementById("li1").classList.remove('active');
    document.getElementById("li2").classList.remove('active');
    document.getElementById("li3").classList.remove('active');
    document.getElementById("li4").classList.remove('active');
    document.getElementById("li5").classList.remove('active');
    document.getElementById("li2A").classList.remove('active');
    document.getElementById("li2B").classList.remove('active');
    document.getElementById("li2C").classList.remove('active');
    document.getElementById("li2D").classList.remove('active');
    document.getElementById("li6").classList.remove('active');
    document.getElementById("li9").classList.remove('active');
    document.getElementById("li8").classList.remove('active');
    document.getElementById("li7").classList.add('active');
}

var requirements = function ()
{
    loadReq();
    $(".search-box").hide();
    $(".view-instructor").hide();
    $(".view-schedule").hide();
    $(".view-dashboard").hide();
    $(".view-student").hide();
    $(".view-enrollment").hide();
    $(".view-vehicleA").hide();
    $(".view-viewInstructor").hide();
    $(".view-viewStudent").hide();
    $(".view-branches").hide();
    $(".view-lessons").hide();
    $(".view-account").hide();
    $(".view-requirement").show();
    document.getElementById("li1").classList.remove('active');
    document.getElementById("li2").classList.remove('active');
    document.getElementById("li3").classList.remove('active');
    document.getElementById("li4").classList.remove('active');
    document.getElementById("li5").classList.remove('active');
    document.getElementById("li2A").classList.remove('active');
    document.getElementById("li2B").classList.remove('active');
    document.getElementById("li2C").classList.remove('active');
    document.getElementById("li2D").classList.remove('active');
    document.getElementById("li6").classList.remove('active');
    document.getElementById("li7").classList.remove('active');
    document.getElementById("li9").classList.remove('active');
    document.getElementById("li8").classList.add('active');
}

var lessons = function ()
{
    $(".search-box").hide();
    $(".view-instructor").hide();
    $(".view-schedule").hide();
    $(".view-dashboard").hide();
    $(".view-student").hide();
    $(".view-enrollment").hide();
    $(".view-vehicleA").hide();
    $(".view-viewInstructor").hide();
    $(".view-viewStudent").hide();
    $(".view-branches").hide();
    $(".view-requirement").hide();
    $(".view-account").hide();
    $(".view-lessons").show();
    document.getElementById("li1").classList.remove('active');
    document.getElementById("li2").classList.remove('active');
    document.getElementById("li3").classList.remove('active');
    document.getElementById("li4").classList.remove('active');
    document.getElementById("li5").classList.remove('active');
    document.getElementById("li2A").classList.remove('active');
    document.getElementById("li2B").classList.remove('active');
    document.getElementById("li2C").classList.remove('active');
    document.getElementById("li2D").classList.remove('active');
    document.getElementById("li6").classList.remove('active');
    document.getElementById("li7").classList.remove('active');
    document.getElementById("li8").classList.remove('active');
    document.getElementById("li9").classList.add('active');
}