$(function() {
    $(".view-instructor").hide();
    $(".view-schedule").hide();
    $(".view-student").hide();
    $(".view-vehicle").hide();
    $(".view-branches").hide();
    $(".view-dashboard").show();

    $("#dashboard").on("click", dashboard);

    $("#students").on("click", function() {
        $(".search-box").hide();
        $(".view-instructor").hide();
        $(".view-schedule").hide();
        $(".view-dashboard").hide();
        $(".view-vehicle").hide();
        $(".view-branches").hide();
        $(".view-student").show();
        document.getElementById("li1").classList.remove('active');
        document.getElementById("li3").classList.remove('active');
        document.getElementById("li4").classList.remove('active');
        document.getElementById("li5").classList.remove('active');
        document.getElementById("li6").classList.remove('active');
        document.getElementById("li2").classList.add('active');
    });

    $("#instructor").on("click", function() {
        $(".search-box").hide();
        $(".view-dashboard").hide();
        $(".view-schedule").hide();
        $(".view-student").hide();
        $(".view-vehicle").hide();
        $(".view-branches").hide();
        $(".view-instructor").show();
        document.getElementById("li1").classList.remove('active');
        document.getElementById("li2").classList.remove('active');
        document.getElementById("li4").classList.remove('active');
        document.getElementById("li5").classList.remove('active');
        document.getElementById("li6").classList.remove('active');
        document.getElementById("li3").classList.add('active');
    });

    $("#vehicle").on("click", function() {
        $(".search-box").hide();
        $(".view-instructor").hide();
        $(".view-schedule").hide();
        $(".view-dashboard").hide();
        $(".view-student").hide();
        $(".view-branches").hide();
        $(".view-vehicle").show();
        document.getElementById("li1").classList.remove('active');
        document.getElementById("li2").classList.remove('active');
        document.getElementById("li3").classList.remove('active');
        document.getElementById("li5").classList.remove('active');
        document.getElementById("li6").classList.remove('active');
        document.getElementById("li4").classList.add('active');
    });

    $("#schedule").on("click", function() {
        $(".search-box").hide();
        $(".view-dashboard").hide();
        $(".view-instructor").hide();
        $(".view-student").hide();
        $(".view-vehicle").hide();
        $(".view-branches").hide();
        $(".view-schedule").show();
        document.getElementById("li1").classList.remove('active');
        document.getElementById("li2").classList.remove('active');
        document.getElementById("li3").classList.remove('active');
        document.getElementById("li4").classList.remove('active');
        document.getElementById("li6").classList.remove('active');
        document.getElementById("li5").classList.add('active');
    });

    $("#branches").on("click", function() {
        $(".search-box").hide();
        $(".view-instructor").hide();
        $(".view-schedule").hide();
        $(".view-dashboard").hide();
        $(".view-student").hide();
        $(".view-vehicle").hide();
        $(".view-branches").show();
        document.getElementById("li1").classList.remove('active');
        document.getElementById("li2").classList.remove('active');
        document.getElementById("li3").classList.remove('active');
        document.getElementById("li4").classList.remove('active');
        document.getElementById("li5").classList.remove('active');
        document.getElementById("li6").classList.add('active');
    });
});

var dashboard = function() 
{
    $(".search-box").show();
        $(".view-instructor").hide();
        $(".view-schedule").hide();
        $(".view-student").hide();
        $(".view-vehicle").hide();
        $(".view-branches").hide();
        $(".view-dashboard").show();
        document.getElementById("li2").classList.remove('active');
        document.getElementById("li3").classList.remove('active');
        document.getElementById("li4").classList.remove('active');
        document.getElementById("li5").classList.remove('active');
        document.getElementById("li6").classList.remove('active');
        document.getElementById("li1").classList.add('active');
}