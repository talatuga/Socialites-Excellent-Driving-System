$(function() {
    $(".view-instructor").hide();
    $(".view-schedule").hide();
    $(".view-student").hide();
    $(".view-vehicle").hide();
    $(".view-dashboard").show();

    $(".dashboard").on("click", function() {
        $(".view-instructor").hide();
        $(".view-schedule").hide();
        $(".view-student").hide();
        $(".view-vehicle").hide();
        $(".view-dashboard").show();
    });

    $(".instructor").on("click", function() {
        $(".view-dashboard").hide();
        $(".view-schedule").hide();
        $(".view-student").hide();
        $(".view-vehicle").hide();
        $(".view-instructor").show();
    });

    $(".student").on("click", function() {
        $(".view-instructor").hide();
        $(".view-schedule").hide();
        $(".view-dashboard").hide();
        $(".view-vehicle").hide();
        $(".view-student").show();
    });

    $(".schedule").on("click", function() {
        $(".view-dashboard").hide();
        $(".view-instructor").hide();
        $(".view-student").hide();
        $(".view-vehicle").hide();
        $(".view-schedule").show();
    });

    $(".vehicle").on("click", function() {
        $(".view-instructor").hide();
        $(".view-schedule").hide();
        $(".view-dashboard").hide();
        $(".view-student").hide();
        $(".view-vehicle").show();
    });
});