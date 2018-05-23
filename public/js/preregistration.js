var checkedReqP, checkedValReq, countT=0, countP=0, textReq;
var checkedReqT = 1, canCancel = 1;
var isCheck1, isCheck2, isCheck3;
var selected;

$(function(){
    $('.pr2').hide();
    $('.pr3').hide();
    $('.pr1').show();

    $('#btnPreregPrev').hide();
    $('#btnPreregNext2').hide();
    $('#btnPreregPrev2').hide();
    $('#btnPreregDone').hide();

    $('#btnCancPrereg').show();
    $('#btnPreregNext1').show();

    $('.tblIncluLes').hide();
    $('.noSelCorsDiv').show();
    selected = 1;
    resetEnrollment();

    $('.tblManualCrs tbody tr').click(function () {
        selected = $(this).hasClass("highlightTr");
        $('.tblManualCrs tbody tr').removeClass("highlightTr");
        if (!selected){
            $(this).addClass("highlightTr");
        }
        if (selected==1){
            $('.tblIncluLes').hide();
            $('.noSelCorsDiv').show();
        }
        else{
            $('.noSelCorsDiv').hide();
            $('.tblIncluLes').show();
            //DB: Display available lessons per course here
        }
    });
});

// $(function(){
//     resetEnrollment();

//     $('input:radio[name="enrReqT"]').change(
//     function(){
//         if ($(this).is(':checked') && $(this).val() == 'reqT1') {
//             checkedReqT = 1;
//             resetReqB();
//             resetReqC();
//             $('.reqB').hide();
//             $('.reqC').hide();
//             $('.reqA').show();
//         }
//         else if ($(this).is(':checked') && $(this).val() == 'reqT2') {
//             checkedReqT = 2;
//             resetReqA();
//             resetReqC();
//             $('.reqA').hide();
//             $('.reqC').hide();
//             $('.reqB').show();
//         }
//         else if ($(this).is(':checked') && $(this).val() == 'reqT3') {
//             checkedReqT = 3;
//             resetReqA();
//             resetReqB();
//             $('.reqA').hide();
//             $('.reqB').hide();
//             $('.reqC').show();
//         }
//     });
// });

function resetEnrollment(){
    $('#enrFN').val("");
    $('#enrMN').val("");
    $('#enrSN').val("");
    $('#enrBday').val("");
    $('#enrBplace').val("");
    $('#enrAddress').val("");
    $('#enrOcc').val("");
    $('#enrCont').val("");
    $('#enrEmail').val("");
    $('#enrGuard').val("");
    $('#enrGuardCont').val("");
    $('#enrReqP9').val("");
    $('select[name="enrCivStatus"]').val('civ0');
    $('select[name="enrBranchList"]').val('0');
    $('input[name="enrReqP"]').prop('checked', false);
    $("#enrReqT1").prop("checked", true);
    document.getElementById("enrSex1").checked = true;
    document.getElementById("enrSex2").checked = false;
    document.getElementById("enrNat1").checked = true;
    document.getElementById("enrNat2").checked = false;
    selected = 1;
}

function checkEnr1 (){
    var a, b, c, d, e, f, g; //checker variables
    var fn = $('#enrFN').val();
    var mn = $('#enrMN').val();
    var sn = $('#enrSN').val();
    var bday = $('#enrBday').val();
    var bplace = $('#enrBplace').val();
    var add = $('#enrAddress').val();
    var occ = $('#enrOcc').val();
    var cont = $('#enrCont').val();
    var email = $('#enrEmail').val();
    var guard = $('#enrGuard').val();
    var gCont = $('#enrGuardCont').val();
    var civ = $('select[name="enrCivStatus"]').val();
    var sex = $('input[name="enrSex"]:checked').val();
    var nat = $('input[name="enrNat"]:checked').val();
    
    a = fn.replace(/\s+/g, '');
    b = sn.replace(/\s+/g, '');
    c = bplace.replace(/\s+/g, '');
    d = add.replace(/\s+/g, '');
    e = cont.replace(/\s+/g, '');
    f = guard.replace(/\s+/g, '');
    g = gCont.replace(/\s+/g, '');

    if (a=="" && b=="" && bday==""
    && c=="" && d=="" && e==""
    && f=="" && g=="" && civ=="civ0"){
        canCancel=1;
        }
    else canCancel=0;

    if (a=="" || b=="" || bday==""
        || c=="" || d=="" || e==""
        || f=="" || g=="" || civ=="civ0"){
            return "0";
        }
    else return "1";
}

function checkEnr2 (){
    checkedReqP = $('input[name="enrReqP"]:checked').map(function () {
        return this.value;
    }).get();
    countP = $('input[name="enrReqP"]:checked').length;
    if (countP==0) return "0";
    else return "1";
}

function checkEnr3 (){
    if (checkedReqT==1){ //req. for 17-18 yrs. old
        checkedValReq = $('input[name="enrReqA"]:checked').map(function () {
            return this.value;
        }).get();
        countT = $('input[name="enrReqA"]:checked').length;
        if (countT==0) return "0";
        else return "1";
    }
    else if (checkedReqT==2){ //req. for 19 yrs. old +
        checkedValReq = $('input[name="enrReqB"]:checked').map(function () {
            return this.value;
        }).get();
        countT = $('input[name="enrReqB"]:checked').length;
        if (countT==0) return "0";
        else return "1";
    }
    else if (checkedReqT==3){ //req. non-filipino
        checkedValReq = $('input[name="enrReqC"]:checked').map(function () {
            return this.value;
        }).get();
        countT = $('input[name="enrReqC"]:checked').length;
        if (countT==0) return "0";
        else return "1";
    }
}

function regCanc(){
    isCheck2 = checkEnr2();
    isCheck3 = checkEnr3();
    swal({
        title: "Cancel?",
        text: "Are you sure to cancel and discard all changes?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: true
    },
    function(isConfirm){
        if (isConfirm) {
            resetEnrollment();
            swal("Changes have been discarded!", "" ,"success")
            $('.pr2').hide();
            $('.pr3').hide();
            $('.pr1').show();

            $('#btnPreregPrev').hide();
            $('#btnPreregNext2').hide();
            $('#btnPreregPrev2').hide();
            $('#btnPreregDone').hide();

            $('#btnCancPrereg').show();
            $('#btnPreregNext1').show();

            $('.tblIncluLes').hide();
            $('.noSelCorsDiv').show();
            selected = 1;
        }
    });
}



//---------------------------------
function resetStep2(){
    selected = 1;
    $('.tblManualCrs tbody tr').removeClass("highlightTr");
    $('select[name="enrBranchList"]').val('0');
}

function regNext1(){
    isCheck1 = checkEnr1();
    if (isCheck1=="1"){
        $('.pr1').hide();
        $('.pr3').hide();
        $('.pr2').show();

        $('#btnPreregNext1').hide();
        $('#btnPreregPrev').hide();
        $('#btnPreregNext2').hide();
        $('#btnPreregPrev2').hide();
        $('#btnPreregDone').hide();

        $('#btnCancPrereg').show();
        $('#btnPreregPrev').show();
        $('#btnPreregNext2').show();
        resetStep2();
    }
    else{
        swal("Oops!", "Please fill out all required fields.", "error");
    }
}

function regPrev1(){
    $('.pr2').hide();
    $('.pr3').hide();
    $('.pr1').show();

    $('#btnPreregPrev').hide();
    $('#btnPreregNext2').hide();
    $('#btnPreregPrev2').hide();
    $('#btnPreregDone').hide();

    $('#btnCancPrereg').show();
    $('#btnPreregNext1').show();

    $('.tblIncluLes').hide();
    $('.noSelCorsDiv').show();
}

function regNext2(){
    var branch = $('select[name="enrBranchList"]').val();
    if (selected==1 || branch=="0") {
        swal("Oops!", "Please fill out all required fields.", "error");
    }
    else{
        $('.pr1').hide();
        $('.pr2').hide();
        $('.pr3').show();
    
        $('#btnPreregPrev').hide();
        $('#btnPreregNext2').hide();
        $('#btnPreregNext1').hide();
        $('#btnPreregPrev').hide();
        $('#btnPreregNext2').hide();
    
        $('#btnCancPrereg').show();
        $('#btnPreregPrev2').show();
        $('#btnPreregDone').show();

        $('input[name="enrReqP"]').prop('checked', false);
    }
}

function regPrev2(){
    $('.pr1').hide();
    $('.pr3').hide();
    $('.pr2').show();

    $('#btnPreregNext1').hide();
    $('#btnPreregPrev').hide();
    $('#btnPreregNext2').hide();
    $('#btnPreregPrev2').hide();
    $('#btnPreregDone').hide();

    $('#btnCancPrereg').show();
    $('#btnPreregPrev').show();
    $('#btnPreregNext2').show();
}

function regDone(){
    isCheck2 = checkEnr2();
    isCheck3 = checkEnr3();
    if (isCheck2=="0"){
        alert (isCheck2)
        swal("Oops!", "Please fill out all required fields.", "error");
    }
    else{
        $('#confRegisterModal').modal('show');
    }
}

function confRegister(){
    swal("Success!", "Your pre-registration form has been submitted!", "success");
    $('#confRegisterModal').modal('hide');
}
