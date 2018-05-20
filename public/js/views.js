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
    document.getElementById("li2").classList.remove('active');
    document.getElementById("li3").classList.remove('active');
    document.getElementById("li4").classList.remove('active');
    document.getElementById("li5").classList.remove('active');
    document.getElementById("li6").classList.remove('active');
    document.getElementById("li1").classList.add('active');
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
    document.getElementById("li1").classList.remove('active');
    document.getElementById("li3").classList.remove('active');
    document.getElementById("li4").classList.remove('active');
    document.getElementById("li5").classList.remove('active');
    document.getElementById("li6").classList.remove('active');
    document.getElementById("li2").classList.add('active');
    document.getElementById("li2A").classList.add('active');
    document.getElementById("li2B").classList.remove('active');
    document.getElementById("li2C").classList.remove('active');
    document.getElementById("li2D").classList.remove('active');
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
    document.getElementById("li1").classList.remove('active');
    document.getElementById("li3").classList.remove('active');
    document.getElementById("li4").classList.remove('active');
    document.getElementById("li5").classList.remove('active');
    document.getElementById("li6").classList.remove('active');
    document.getElementById("li2").classList.add('active');
    document.getElementById("li2A").classList.remove('active');
    document.getElementById("li2B").classList.add('active');
    document.getElementById("li2C").classList.remove('active');
    document.getElementById("li2D").classList.remove('active');
    resetEnrollment();
}

var activeStudC = function ()
{

}

var activeStudD = function ()
{

}

var instructor = function ()
{
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
    document.getElementById("li1").classList.remove('active');
    document.getElementById("li2").classList.remove('active');
    document.getElementById("li4").classList.remove('active');
    document.getElementById("li5").classList.remove('active');
    document.getElementById("li6").classList.remove('active');
    document.getElementById("li3").classList.add('active');
}

var vehicle = function ()
{
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
    document.getElementById("li1").classList.remove('active');
    document.getElementById("li2").classList.remove('active');
    document.getElementById("li3").classList.remove('active');
    document.getElementById("li5").classList.remove('active');
    document.getElementById("li6").classList.remove('active');
    document.getElementById("li4").classList.add('active');
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
    document.getElementById("li1").classList.remove('active');
    document.getElementById("li2").classList.remove('active');
    document.getElementById("li3").classList.remove('active');
    document.getElementById("li4").classList.remove('active');
    document.getElementById("li6").classList.remove('active');
    document.getElementById("li5").classList.add('active');
}

var branches = function ()
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
    $(".view-branches").show();
    document.getElementById("li1").classList.remove('active');
    document.getElementById("li2").classList.remove('active');
    document.getElementById("li3").classList.remove('active');
    document.getElementById("li4").classList.remove('active');
    document.getElementById("li5").classList.remove('active');
    document.getElementById("li6").classList.add('active');
}