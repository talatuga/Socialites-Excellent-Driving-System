$(function() {
    document.getElementById("btnPast").classList.remove('btnDarkActive');
    document.getElementById("btnAll").classList.remove('btnDarkActive');
    document.getElementById("btnCurrent").classList.add('btnDarkActive');

    $("#btnCurrent").on("click", function() {
        document.getElementById("btnPast").classList.remove('btnDarkActive');
        document.getElementById("btnAll").classList.remove('btnDarkActive');
        document.getElementById("btnCurrent").classList.add('btnDarkActive');
    });
    $("#btnPast").on("click", function() {
        document.getElementById("btnCurrent").classList.remove('btnDarkActive');
        document.getElementById("btnAll").classList.remove('btnDarkActive');
        document.getElementById("btnPast").classList.add('btnDarkActive');
    });
    $("#btnAll").on("click", function() {
        document.getElementById("btnCurrent").classList.remove('btnDarkActive');
        document.getElementById("btnPast").classList.remove('btnDarkActive');
        document.getElementById("btnAll").classList.add('btnDarkActive');
    });
});