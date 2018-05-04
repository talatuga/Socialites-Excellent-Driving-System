$(function() {
    document.getElementById("btnPast").classList.remove('btnDarkActive');
    document.getElementById("btnAll").classList.remove('btnDarkActive');
    document.getElementById("btnCurrent").classList.add('btnDarkActive');

    // $("#btnNewInstructor").on("click", function() {
    //     $(".view-instructor").hide();
    //     $(".view-newInstructor").show();
    // });
    $(".breadcrumb-item").on("click", function() {
        $(".view-newInstructor").hide();
        $(".view-instructor").show();
    });
});