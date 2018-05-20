var checkedReqP, checkedValReq, countT=0, countP=0, textReq;
var checkedReqT = 1, canCancel = 1;
var isCheck1, isCheck2, isCheck3;

$(function(){
    resetEnrollment();

    $('input:radio[name="enrReqT"]').change(
    function(){
        if ($(this).is(':checked') && $(this).val() == 'reqT1') {
            checkedReqT = 1;
            resetReqB();
            resetReqC();
            $('.reqB').hide();
            $('.reqC').hide();
            $('.reqA').show();
        }
        else if ($(this).is(':checked') && $(this).val() == 'reqT2') {
            checkedReqT = 2;
            resetReqA();
            resetReqC();
            $('.reqA').hide();
            $('.reqC').hide();
            $('.reqB').show();
        }
        else if ($(this).is(':checked') && $(this).val() == 'reqT3') {
            checkedReqT = 3;
            resetReqA();
            resetReqB();
            $('.reqA').hide();
            $('.reqB').hide();
            $('.reqC').show();
        }
    });
});

function resetEnrollment(){
    resetReqA();
    resetReqB();
    resetReqC();
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
    document.getElementById("enrSex1").checked = true;
    document.getElementById("enrSex2").checked = false;
    $('input:radio').prop('checked', false);
    $("#enrReqT1").prop("checked", true);
}

function resetReqA(){
    document.getElementById("rA1").checked = false;
    document.getElementById("rA2").checked = false;
    document.getElementById("rA3").checked = false;
}


function resetReqB(){
    document.getElementById("rB1").checked = false;
    document.getElementById("rB2").checked = false;
    document.getElementById("rB3").checked = false;
}


function resetReqC(){
    document.getElementById("rC1").checked = false;
    document.getElementById("rC2").checked = false;
    document.getElementById("rC3").checked = false;
}

function enrollStud(){
    isCheck1 = checkEnr1();
    isCheck2 = checkEnr2();
    isCheck3 = checkEnr3();
    // alert(isCheck1 + isCheck2 + isCheck3);
    if (isCheck1==0 || isCheck2==0){
        swal("Oops!", "Please fill out all required fields.", "error");
    }else{
        if (isCheck3==0){
            textReq="All requirements are not met. Proceed?";
        }
        else{
            var x = countT;
            if (x==1) textReq= ("Only " + x +" requirement is met. Proceed?");
            else if (x==2) textReq= ("Only " + x + " requirements are met. Proceed?");
            else if (x==3) textReq= "Are you sure you want to enroll this student and create an account?";
        }
        swal({
            title: "Warning!",
            text: textReq + "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function(isConfirm){
            if (isConfirm) {
                swal("Success!", "Student is enrolled and account is created!", "success");
                resetEnrollment();
                //DB: Adding of new student here
                //DB: Go back to students list
            }
        });
    }
}

function checkEnr1 (){
    var fn = $('#enrFN').val();
    var sn = $('#enrSN').val();
    var bday = $('#enrBday').val();
    var bplace = $('#enrBplace').val();
    var add = $('#enrAddress').val();
    var cont = $('#enrCont').val();
    var guard = $('#enrGuard').val();
    var gCont = $('#enrGuardCont').val();
    var civ = $('select[name="enrCivStatus"]').val();

    fn = fn.replace(/\s+/g, '');
    sn = sn.replace(/\s+/g, '');
    bplace = bplace.replace(/\s+/g, '');
    add = add.replace(/\s+/g, '');
    cont = cont.replace(/\s+/g, '');
    guard = guard.replace(/\s+/g, '');
    gCont = gCont.replace(/\s+/g, '');

    if (fn=="" && sn=="" && bday==""
    && bplace=="" && add=="" && cont==""
    && guard=="" && gCont=="" && civ=="civ0"){
        canCancel=1;
        }
    else canCancel=0;

    if (fn=="" || sn=="" || bday==""
        || bplace=="" || add=="" || cont==""
        || guard=="" || gCont=="" || civ=="civ0"){
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

function cancEnrollStud(){
    isCheck2 = checkEnr2();
    isCheck3 = checkEnr3();
    if (canCancel==0 || isCheck2==1 || isCheck3==1){
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
                swal("Changes have been discarded!", "" ,"success")
                resetEnrollment();
            }
        });
    }
}