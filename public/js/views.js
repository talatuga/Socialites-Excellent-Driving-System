$(function() {    
    // $MAIN-WRAPPER.css("min-height", $(window).height());
    $(".view-instructor").hide();
    $(".view-schedule").hide();
    $(".view-student").hide();
    $(".view-vehicleA").hide();
    $(".view-vehicleB").hide();
    $(".view-branches").hide();
    $(".view-dashboard").show();

    $("#dashboard").on("click", dashboard);

    $("#students").on("click", function() {
        $(".search-box").hide();
        $(".view-instructor").hide();
        $(".view-schedule").hide();
        $(".view-dashboard").hide();
        $(".view-vehicleA").hide();
        $(".view-vehicleB").hide();
        $(".view-branches").hide();
        $(".view-viewInstructor").hide();
        $(".view-student").show();
        document.getElementById("li1").classList.remove('active');
        document.getElementById("li3").classList.remove('active');
        document.getElementById("li4").classList.remove('active');
        document.getElementById("li5").classList.remove('active');
        document.getElementById("li6").classList.remove('active');
        document.getElementById("li2").classList.add('active');
        document.getElementById("li4A").classList.remove('active');
        document.getElementById("li4B").classList.remove('active');
    });

    $("#instructor").on("click", function() {
        $(".search-box").hide();
        $(".view-dashboard").hide();
        $(".view-schedule").hide();
        $(".view-student").hide();
        $(".view-vehicleA").hide();
        $(".view-vehicleB").hide();
        $(".view-branches").hide();
        $(".view-viewInstructor").hide();
        $(".view-instructor").show();
        document.getElementById("li1").classList.remove('active');
        document.getElementById("li2").classList.remove('active');
        document.getElementById("li4").classList.remove('active');
        document.getElementById("li5").classList.remove('active');
        document.getElementById("li6").classList.remove('active');
        document.getElementById("li3").classList.add('active');
        document.getElementById("li4A").classList.remove('active');
        document.getElementById("li4B").classList.remove('active');
    });

    $("#vehicle1").on("click", function() {
        $(".search-box").hide();
        $(".view-instructor").hide();
        $(".view-schedule").hide();
        $(".view-dashboard").hide();
        $(".view-student").hide();
        $(".view-branches").hide();
        $(".view-viewInstructor").hide();
        $(".view-vehicleB").hide();
        $(".view-vehicleA").show();
        document.getElementById("li1").classList.remove('active');
        document.getElementById("li2").classList.remove('active');
        document.getElementById("li3").classList.remove('active');
        document.getElementById("li5").classList.remove('active');
        document.getElementById("li6").classList.remove('active');
        document.getElementById("li4").classList.add('active');
        document.getElementById("li4A").classList.add('active');
        document.getElementById("li4B").classList.remove('active');
    });

    $("#vehicle2").on("click", function() {
        $(".search-box").hide();
        $(".view-instructor").hide();
        $(".view-schedule").hide();
        $(".view-dashboard").hide();
        $(".view-student").hide();
        $(".view-branches").hide();
        $(".view-viewInstructor").hide();
        $(".view-vehicleA").hide();
        $(".view-vehicleB").show();
        document.getElementById("li1").classList.remove('active');
        document.getElementById("li2").classList.remove('active');
        document.getElementById("li3").classList.remove('active');
        document.getElementById("li5").classList.remove('active');
        document.getElementById("li6").classList.remove('active');
        document.getElementById("li4").classList.add('active');
        document.getElementById("li4A").classList.remove('active');
        document.getElementById("li4B").classList.add('active');
    });

    // $("#schedule").on("click", function() {
    //     $(".search-box").hide();
    //     $(".view-dashboard").hide();
    //     $(".view-instructor").hide();
    //     $(".view-student").hide();
    //     $(".view-vehicleA").hide();
    //     $(".view-vehicleB").hide();
    //     $(".view-branches").hide();
    //     $(".view-viewInstructor").hide();
    //     $(".view-schedule").show();
    //     document.getElementById("li1").classList.remove('active');
    //     document.getElementById("li2").classList.remove('active');
    //     document.getElementById("li3").classList.remove('active');
    //     document.getElementById("li4").classList.remove('active');
    //     document.getElementById("li6").classList.remove('active');
    //     document.getElementById("li5").classList.add('active');
    //     document.getElementById("li4A").classList.remove('active');
    //     document.getElementById("li4B").classList.remove('active');
    // });

    $("#branches").on("click", function() {
        $(".search-box").hide();
        $(".view-instructor").hide();
        $(".view-schedule").hide();
        $(".view-dashboard").hide();
        $(".view-student").hide();
        $(".view-vehicleA").hide();
        $(".view-vehicleB").hide();
        $(".view-viewInstructor").hide();
        $(".view-branches").show();
        document.getElementById("li1").classList.remove('active');
        document.getElementById("li2").classList.remove('active');
        document.getElementById("li3").classList.remove('active');
        document.getElementById("li4").classList.remove('active');
        document.getElementById("li5").classList.remove('active');
        document.getElementById("li6").classList.add('active');
        document.getElementById("li4A").classList.remove('active');
        document.getElementById("li4B").classList.remove('active');
    });
});

var dashboard = function() 
{
    $(".search-box").show();
    $(".view-instructor").hide();
    $(".view-schedule").hide();
    $(".view-student").hide();
    $(".view-vehicleA").hide();
    $(".view-vehicleB").hide();
    $(".view-branches").hide();
    $(".view-viewInstructor").hide();
    $(".view-dashboard").show();
    document.getElementById("li2").classList.remove('active');
    document.getElementById("li3").classList.remove('active');
    document.getElementById("li4").classList.remove('active');
    document.getElementById("li5").classList.remove('active');
    document.getElementById("li6").classList.remove('active');
    document.getElementById("li1").classList.add('active');
    document.getElementById("li4A").classList.remove('active');
    document.getElementById("li4B").classList.remove('active');
}

var schedule = function() 
{
    $(".search-box").hide();
    $(".view-dashboard").hide();
    $(".view-instructor").hide();
    $(".view-student").hide();
    $(".view-vehicleA").hide();
    $(".view-vehicleB").hide();
    $(".view-branches").hide();
    $(".view-viewInstructor").hide();
    $(".view-schedule").show();
    document.getElementById("li1").classList.remove('active');
    document.getElementById("li2").classList.remove('active');
    document.getElementById("li3").classList.remove('active');
    document.getElementById("li4").classList.remove('active');
    document.getElementById("li6").classList.remove('active');
    document.getElementById("li5").classList.add('active');
    document.getElementById("li4A").classList.remove('active');
    document.getElementById("li4B").classList.remove('active');
}

function activeVehi ()
{
    document.getElementById("li1").classList.remove('active');
    document.getElementById("li2").classList.remove('active');
    document.getElementById("li3").classList.remove('active');
    document.getElementById("li5").classList.remove('active');
    document.getElementById("li6").classList.remove('active');
    // document.getElementById("li4").classList.add('active');
}