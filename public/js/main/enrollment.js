var checkedReqP, checkedValReq, checkedDays, countT=0, countP=0, countDays=0, textReq;
var checkedReqT = 1, canCancel = 1, yearnow;
var isCheck1, isCheck2, isCheck3, isCheck3New;
var selected, checkLesOpt;
var selectedCourse = 0;
var paymentMeth=0, payHide=1, schedMeth=0;
var preRegData = {
    info: {},
    course: 0,
    branch: 0,
    license: 0,
    trans: {
        transaction: "",
        amount: 0,
    },
    sched: [],
    vehicle: "",
};
let transactionDisplay = {
    total: 0,
    enrollTotal: 0,
    additionTotal: 0,
};
$(function(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
    uncheckLesSelct();
    resetEnroll1();
    resetEnroll2();
    hideVehicleOptions();
    $('.paymentOptionBack').hide();
    $('.paymentOptionDiv1').hide();
    $('.paymentOptionDiv2').hide();
    $('#paymentOptionDivNoOnline').hide();
    $('#paymentOptionDiv').show();

    $('.pr2A').hide();
    $('.pr2').hide();
    $('.pr3').hide();
    $('.pr3New').hide();
    $('.pr4').hide();
    $('.pr1').show();

    $('.reqA').show();
    $('.reqB').show();
    $('.reqC').show();

    $('.lessonsOpt1').hide();
    $('.lessonsOpt2').hide();
    $('.lessonsOpt').show();

    $('.tblIncluLes').hide();
    $('.noSelCorsDiv').show();
    selected = 1;
    resetEnrollment();

    $('#enrBday').change(function() {
        var date = $("enrBday").val();
    });

    Number.prototype.formatMoney = function(c, d, t){
        var n = this, 
        c = isNaN(c = Math.abs(c)) ? 2 : c, 
        d = d == undefined ? "." : d, 
        t = t == undefined ? "," : t, 
        s = n < 0 ? "-" : "", 
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
        j = (j = i.length) > 3 ? j % 3 : 0;
       return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
     };

    preregister.getBranch(function(err, data){
        if(err) return console.error(err);
        var html = "<option value='0'>---</option>";
        data.forEach(x=>{
            html += "<option value='"+ x.id +"'>"+ x.name +"</option>";
        });
        $('#branch').html(html);
    });

    preregister.getCourse(function(err, data){
        if(err) return console.error(err);        
        var htmlA = "";
        var htmlB = "";
        data.forEach(x=>{
            var pad = "000";
            var id = "CRS-M" + (pad.substring(0, pad.length - (x.id + "").length) + x.id);
            var html = "<tr onclick='seletedCoursePreReg("+ id +")'>";
            html += "<td>"+ id +"</td>";
            html += "<td>"+ x.days +" Days</td>";
            html += "<td>" + parseInt(x.amount).formatMoney(2) +"</td>";
            html += "</tr>";
            if(x.carType == "a"){
                htmlA = html;
            }else{
                htmlB = html;
            }
        });
        $('#coursesA').html(htmlA);
        $('#coursesB').html(htmlB);
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

    $('input[name=enrLes]').change(function(){
        checkLesOpt = $('input[name=enrLes]:checked').val();
        if (checkLesOpt=="lesOpt1"){
            $('.lessonsOpt2').hide();
            $('.lessonsOpt1').show();
        }
        else if (checkLesOpt=="lesOpt2"){
            $('.lessonsOpt1').hide();
            $('.lessonsOpt2').show();
        }
    });

    $(".prefDaysCB").on('change',function(){
        if($(this).prop('checked')){
            preRegData.sched.push(this.value);
        }else{
            var elem = preRegData.sched.indexOf(this.value);
            preRegData.sched.splice(elem,1);
        }
    });
});

function hideVehicleOptions(){
    $('.h5both').hide();
    $('.h5auto').hide();
    $('.h5man').hide();
    $('#trManualVehicle').hide();
    $('#trAutoVehicle').hide();
}

function resetEnroll1 (){
    yearnow = (new Date()).getFullYear();
    $("#enrCont").inputmask({"mask": "(+63)-999-999-9999"});
    $("#enrGuardCont").inputmask({"mask": "(+63)-999-999-9999"});

    $('#btnCancPreregA').show();
    $('#btnPreregNext2A').show();
    $('#btnPreregPrevAddA').hide();
    $('#btnPreregNextAddA').hide();
    $('#btnPreregPrev2A').hide();
    $('#btnPreregDoneA').hide();

    $('#btnPreregPrevA').hide();
    $('#btnPreregNext3A').hide();
}

function resetEnroll2 (){
    yearnow = (new Date()).getFullYear();
    $("#enrCont").inputmask({"mask": "(+63)-999-999-9999"});
    $("#enrGuardCont").inputmask({"mask": "(+63)-999-999-9999"});

    $('#btnPreregPrev').hide();
    $('#btnPreregNext2').hide();
    $('#btnPreregPrev1').hide();
    $('#btnPreregNext3').hide();
    $('#btnPreregPrevAdd').hide();
    $('#btnPreregNextAdd').hide();
    $('#btnPreregPrev2').hide();
    $('#btnPreregDone').hide();

    $('#btnCancPrereg').show();
    $('#btnPreregNext1').show();
}

function uncheckLesSelct(){
    $('#lesOpt1').prop("checked", false);
    $('#lesOpt2').prop("checked", false);

}

function payMeth2(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
    // paymentMeth = 2;
    // swal ("Oops!", "We're sorry, but this option is not available for now.", "error");
    $('.paymentOptionDiv').hide();
    $('.paymentOptionDiv1').hide();
    $('.paymentOptionDiv2').show();
    paymentMeth = 2;
    $('.payCourse').html("");
    var ids = [];
    var total = 0;
    // preRegData.trans.amount = 0;
    cart.container.forEach(x=>{
        var data = course.getLocalData(x);
        ids.push(course.generateID(data.courseID, data.transmission));
        // total = 0;
        total += $('#special'+data.courseID+':checked').length!=0?(data.price*2):data.price;
    });
    var license = ($('input[name=enrReqP]:checked').data('price'));
    $('#payCourse2').html(ids.join());
    $('#payPrice2').html(total.formatMoney(0));
    $('.halfPrice').html((total/2).formatMoney(0));
    total += license ? license : 0;
    preRegData.trans.transaction = "Enrolment" + preRegData.trans.transaction;
    $('.totalAmount').html(total.formatMoney(0));
}

function payMeth1(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $('.paymentOptionDiv').hide();
    $('.paymentOptionDiv2').hide();
    $('.paymentOptionDiv1').show();
    paymentMeth = 1;
    $('.payCourse').html("");
    var ids = [];
    var total = 0;
    // preRegData.trans.amount = 0;
    cart.container.forEach(x=>{
        var data = course.getLocalData(x);
        ids.push(course.generateID(data.courseID, data.transmission));
        // total = 0;
        total += $('#special'+data.courseID+':checked').length!=0?(data.price*2):data.price;
    });
    var license = ($('input[name=enrReqP]:checked').data('price'));
    $('#payCourse').html(ids.join());
    $('#payPrice').html(total.formatMoney(0));
    $('.halfPrice').html((total/2).formatMoney(0));
    total += license ? license : 0;
    preRegData.trans.transaction = "Enrolment" + preRegData.trans.transaction;
    $('.totalAmount').html(total.formatMoney(0));
}

function paymentBack(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $('.paymentOptionDiv1').hide();
    $('.paymentOptionDiv2').hide();
    $('#paymentOptionDivNoOnline').hide();
    $('#paymentOptionDiv').show();
}


function schedBack(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $('.sched1Div').hide();
    $('.sched2Div').hide();
    $('#schedOptionDiv').show();
    schedMeth=0;
}

function schedOpt1(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $('#schedOptionDiv').hide();
    $('.sched1Div').show();
    $('.sched2Div').hide();
    schedMeth=1;
}

function schedOpt2(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $('#schedOptionDiv').hide();
    $('.sched1Div').hide();
    $('.sched2Div').show();
    schedMeth=2;
}

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
    $('input[name="includeLes"]').prop('checked', true);
    $("#enrReqT1").prop("checked", true);
    $("#enrLes1").prop("checked", false);
    $("#enrLes2").prop("checked", false);
    document.getElementById("enrSex1").checked = true;
    document.getElementById("enrSex2").checked = false;
    $('input[name="agree"]').prop('checked', false);
    $('input[name="confirmCourse"]').prop('checked', false);
    $("#manualVehiclesSelect").val('0');
    $("#autoVehiclesSelect").val('0');
    $('input[name="prefDaysCB"]').prop('checked', false);
    $('.lessonsOpt2').hide();
    $('.lessonsOpt1').hide();
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
    else{
        preRegData.info["fullname"] = fn + "_" + mn + "_" + sn;
        preRegData.info["birthdate"] = bday;
        preRegData.info["birthplace"] = bplace;
        preRegData.info["address"] = add;
        preRegData.info["telno"] = cont;
        preRegData.info["occupation"] = occ;
        preRegData.info["email"] = email;
        preRegData.info["civilStatus"] = civ;
        preRegData.info["sex"] = sex;
        preRegData.info["guardian"] = {
            name: guard,
            telno: gCont,
        };
        var age = parseInt(Date.parse("today").toString("yyyy")) - parseInt(Date.parse(preRegData.info.birthdate).toString("yyyy"));
        $('.req').hide();
        if(age < 18){
            swal("","Too young to drive,","error");
            return "2"; }           
        // }else if(preRegData.info.nationality == "Non-Filipino"){
        //     $('.reqC').show();
        // }else if(age < 19 && age > 16){
        //     $('.reqA').show();
        // }else if(age > 19){
        //     $('.reqB').show();
        // }
        return "1";
    } 
}

function checkEnr2 (){
    checkedReqP = $('input[name="enrReqP"]:checked').map(function () {
        return this.value;
    }).get();
    countP = $('input[name="enrReqP"]:checked').length;
    if (countP==0) return "0";
    else{
        return "1";
    } 
}

function checkEnr2A (){
    checkedReqP = $('input[name="enrLes"]:checked').map(function () {
        return this.value;
    }).get();
    countP = $('input[name="enrLes"]:checked').length;
    if (countP==0) return "0";
    else{
        return "1";
    } 
}

function checkEnr3New (){
    var selected_manual = $('#manualVehiclesSelect').val() != 0 ? $('#manualVehiclesSelect').val() : $('#autoVehiclesSelect').val() != 0 ? $('#autoVehiclesSelect').val() : 0;
    // checkedDays = $('input[name="prefDaysCB"]:checked').map(function () {
    //     return this.value;
    // }).get();
    countDays = $('input[name="prefDaysCB"]:checked').length;

    if (countDays==0 || selected_manual==0) return "0";
    else{
        return "1";
    }
}

function regCanc(){
    // isCheck2 = checkEnr2();
    // isCheck3 = checkEnr3();
    swal({
        title: "Cancel?",
        text: "Are you sure to cancel and discard all changes?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function(isConfirm){
        if (isConfirm) {
            hideVehicleOptions();
            resetEnrollment();
            $('.pr2A').hide();
            $('.pr2').hide();
            $('.pr3').hide();
            $('.pr3New').hide();
            $('.pr4').hide();
            $('.pr1').show();

            $('#btnPreregPrev').hide();
            $('#btnPreregNext2').hide();
            $('#btnPreregPrev1').hide();
            $('#btnPreregNext3').hide();
            $('#btnPreregPrev2').hide();
            $('#btnPreregDone').hide();

            $('#btnCancPrereg').show();
            $('#btnPreregNext1').show();

            $('.tblIncluLes').hide();
            $('.noSelCorsDiv').show();
            selected = 1;
            cartClick();
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
    isCheck1=1;
    if (isCheck1=="1"){
        $('.pr2A').hide();
        $('.pr1').hide();
        $('.pr3').hide();
        $('.pr3New').hide();
        $('.pr4').hide();
        $('.pr2').show();

        $('#btnPreregNext1').hide();
        $('#btnPreregPrev').hide();
        $('#btnPreregNext2').hide();
        $('#btnPreregPrev2').hide();
        $('#btnPreregPrev1').hide();
        $('#btnPreregNext3').hide();
        $('#btnPreregDone').hide();
        $('#btnPreregPrevAdd').hide();
        $('#btnPreregNextAdd').hide();

        $('#btnCancPrereg').show();
        $('#btnPreregPrev').show();
        $('#btnPreregNext2').show();
        resetStep2();
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }else if (isCheck1=="2"){
        swal("Oops!", "Enrollees must be 18 years old and above.", "error");
    }
    else{
        swal("Oops!", "Please fill out all required fields.", "error");
    }
}

function regPrev1(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
    hideVehicleOptions();
    $('.pr2A').hide();
    $('.pr2').hide();
    $('.pr3').hide();
    $('.pr3New').hide();
    $('.pr4').hide();
    $('.pr1').show();

    $('#btnPreregPrev').hide();
    $('#btnPreregNext2').hide();
    $('#btnPreregPrev1').hide();
    $('#btnPreregNext3').hide();
    $('#btnPreregPrev2').hide();
    $('#btnPreregDone').hide();
    $('#btnPreregPrevAdd').hide();
    $('#btnPreregNextAdd').hide();

    $('#btnCancPrereg').show();
    $('#btnPreregNext1').show();

    $('.tblIncluLes').hide();
    $('.noSelCorsDiv').show();
}

function regPrev1A(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $('.pr1').hide();
    $('.pr2').hide();
    $('.pr3').hide();
    $('.pr3New').hide();
    $('.pr4').hide();
    $('.pr2A').show();

    $('#btnCancPreregA').show();
    $('#btnPreregNext2A').show();

    $('#btnPreregPrev2A').hide();
    $('#btnPreregDoneA').hide();

    $('#btnPreregPrevA').hide();
    $('#btnPreregNext3A').hide();

    $('#btnPreregPrevAddA').hide();
    $('#btnPreregNextAddA').hide();
}

function regNext2(){
    $('.step3').html("Step 3: Preferred vehicle and schedule.");
    $('#schedOptionDiv').show();
    $('.sched1Div').hide();
    $('.sched2Div').hide();
    isCheck2 = checkEnr2();
    if (isCheck2==0){
        swal("Oops!", "Please select at least one.", "error");
    }
    else{
        var c = $('input[name=enrReqP]:checked').data("id");
        $('.additionalPayment').html("");
        if (c!=0){          
            preRegData.trans.transaction += ", Apply-" + $('input[name=enrReqP]:checked').data("id");
            preRegData.trans.amount += parseInt($('input[name=enrReqP]:checked').data("price"));
            $('.additionalPayment').html(" <br>Plus additional payment for licensing application assistance is <span class='payCourse'>"+ $('input[name=enrReqP]:checked').data().desc +" license</span> &#8369;<span class='payPrice'>"+ ($('input[name=enrReqP]:checked').data().price).formatMoney(0) + "</span>.<br>Overall total of &#8369;<span class='totalAmount' class='payPrice'><span>.");
            payHide=2;
            paymentBack();
        }
        else{
            payHide=1;
            paymentBack();
        }
        //preRegData.branch = branch;

        $('.pr2A').hide();
        $('.pr1').hide();
        $('.pr2').hide();
        $('.pr4').hide();
        $('.pr3').hide();
        $('.pr3New').show();
    
        $('#btnPreregPrev').hide();
        $('#btnPreregNext2').hide();
        $('#btnPreregNext1').hide();
        $('#btnPreregPrev').hide();
        $('#btnPreregNext2').hide();
        $('#btnPreregPrev2').hide();
        $('#btnPreregDone').hide();
        $('#btnPreregPrev1').hide();
        $('#btnPreregNext3').hide();

        $('#btnCancPrereg').show();
        $('#btnPreregPrevAdd').show();
        $('#btnPreregNextAdd').show();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        paymentMeth=0;
        preRegData.license = c; 
        var vtype = "";
        // console.log(vtype);
        cart.container.forEach((e,i)=>{
            vtype += course.getLocalData(e).transmission;
            if(i == cart.container.length-1){
                if(vtype.search('m') != -1 && vtype.search('a') != -1){
                    $('.h5both').show();
                    $('#trManualVehicle').show();
                    $('#trAutoVehicle').show();
                }else if(vtype.search('m') != -1){
                    $('.h5man').show();
                    $('#trManualVehicle').show();
                }else if(vtype.search('a') != -1){
                    $('.h5auto').show();
                    $('#trAutoVehicle').show();
                }
            }
        });
    }
}

function regNext2A(){
    $('.step4').html("Step 2: Select payment method.");
    isCheck2 = checkEnr2A();
    if (isCheck2==0){
        swal("Oops!", "Please select which lessons you wish to tackle first!", "error");
    }
    else{
        checkLesOpt = $('input[name=enrLes]:checked').val();
        if (checkLesOpt=="lesOpt1"){
            // preRegData.branch = branch;
            paymentBack();
            $('.pr2A').hide();
            $('.pr1').hide();
            $('.pr2').hide();
            $('.pr4').hide();
            $('.pr3New').hide();
            $('.pr3').show();
        
            $('#btnPreregNext2A').hide();
            $('#btnPreregPrev2A').hide();
            $('#btnPreregDoneA').hide();
            $('#btnPreregPrevAddA').hide();
            $('#btnPreregNextAddA').hide();

            $('#btnCancPreregA').show();
            $('#btnPreregPrevA').show();
            $('#btnPreregNext3A').show();
            preRegData.lesson = null;
            paymentMeth=0;
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
        else if (checkLesOpt=="lesOpt2"){
            var checkLes = $('input[name="includeLes"]:checked').map(function () {
                return this.value;
            }).get();
            count = $('input[name="includeLes"]:checked').length;
            if (count==0) swal("Oops!", "Please select which lessons you wish to tackle first!", "error");
            else{
                paymentBack();
                $('.pr2A').hide();
                $('.pr1').hide();
                $('.pr2').hide();
                $('.pr4').hide();
                $('.pr3').show();
            
                $('#btnPreregNext2A').hide();

                $('#btnPreregPrev2A').hide();
                $('#btnPreregDoneA').hide();

                $('#btnCancPreregA').show();
                $('#btnPreregPrevA').show();
                $('#btnPreregNext3A').show();
                $("html, body").animate({ scrollTop: 0 }, "slow");
                paymentMeth=0;
                var check = $('input[name=includeLes]:checked');
                var lesson = [];
                for(var x=0; x<check.length; x++){
                    lesson.push(check[x].value);
                }
                preRegData.lesson = lesson;
            }
        }
        var vtype = "";
        // console.log(vtype);
        cart.container.forEach((e,i)=>{
            vtype += course.getLocalData(e).transmission;
            if(i == cart.container.length-1){
                if(vtype.search('m') != -1 && vtype.search('a') != -1){
                    $('.h5both').show();
                    $('#trManualVehicle').show();
                    $('#trAutoVehicle').show();
                }else if(vtype.search('m') != -1){
                    $('.h5man').show();
                    $('#trManualVehicle').show();
                }else if(vtype.search('a') != -1){
                    $('.h5auto').show();
                    $('#trAutoVehicle').show();
                }
            }
        });
    }
}

function regPrev2(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $('.pr2A').hide();
    $('.pr1').hide();
    $('.pr3').hide();
    $('.pr3New').hide();
    $('.pr4').hide();
    $('.pr2').show();

    $('#btnPreregNext1').hide();
    $('#btnPreregPrev1').hide();
    $('#btnPreregNext3').hide();

    $('#btnPreregPrev2').hide();
    $('#btnPreregDone').hide();

    $('#btnPreregPrevAdd').hide();
    $('#btnPreregNextAdd').hide();

    $('#btnCancPrereg').show();
    $('#btnPreregPrev').show();
    $('#btnPreregNext2').show();    

    $('.tblIncluLes').hide();
    $('.noSelCorsDiv').show();
}

function regPrevAddA(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $('.pr1').hide();
    $('.pr2').hide();
    $('.pr3').hide();
    $('.pr3New').hide();
    $('.pr4').hide();
    $('.pr2A').show();

    $('#btnCancPreregA').show();
    $('#btnPreregNext2A').show();

    $('#btnPreregPrev2A').hide();
    $('#btnPreregDoneA').hide();

    $('#btnPreregPrevA').hide();
    $('#btnPreregNext3A').hide();

    $('#btnPreregPrevAddA').hide();
    $('#btnPreregNextAddA').hide();
}

function regNextAddA(){
    isCheck3New = checkEnr3New();
    if (isCheck3New==0){
        swal("Oops!", "Please fill out all required fields.", "error");
    }else{
        $('.step4').html("Step 2: Select payment method.");
        $('.pr2A').hide();
        $('.pr1').hide();
        $('.pr2').hide();
        $('.pr4').hide();
        $('.pr3New').hide();
        $('.pr3').show();
    
        $('#btnPreregNext2A').hide();
        $('#btnPreregPrev2A').hide();
        $('#btnPreregDoneA').hide();
        $('#btnPreregPrevAddA').hide();
        $('#btnPreregNextAddA').hide();

        $('#btnCancPreregA').show();
        $('#btnPreregPrevA').show();
        $('#btnPreregNext3A').show();
        preRegData.lesson = null;
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }
}

function regPrevAdd(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $('.pr2A').hide();
    $('.pr1').hide();
    $('.pr2').hide();
    $('.pr4').hide();
    $('.pr3').hide();
    $('.pr3New').show();

    $('#btnPreregPrev').hide();
    $('#btnPreregNext2').hide();
    $('#btnPreregNext1').hide();
    $('#btnPreregPrev').hide();
    $('#btnPreregNext2').hide();
    $('#btnPreregPrev2').hide();
    $('#btnPreregDone').hide();
    $('#btnPreregPrev1').hide();
    $('#btnPreregNext3').hide();

    $('#btnCancPrereg').show();
    $('#btnPreregPrevAdd').show();
    $('#btnPreregNextAdd').show();
}

function regNextAdd(){
    if (schedMeth==0){
        swal("Oops!", "Choose a scheduling method first.", "error");
    }else{
        $("html, body").animate({ scrollTop: 0 }, "slow");
        isCheck3New = checkEnr3New();
        if (isCheck3New==0){
            swal("Oops!", "Please fill out all required fields.", "error");
        }else{
            preRegData.vehicle = $('#manualVehiclesSelect').val() != 0 ? $('#manualVehiclesSelect').val() : $('#autoVehiclesSelect').val() == 0 ? "" : $('#autoVehiclesSelect').val();
            //$("input[name=prefDaysCB]:checked").each((a)=>{preRegData.sched.push(a)});
            $('.step4').html("Step 4: Select payment method.");
            $('.pr2A').hide();
            $('.pr1').hide();
            $('.pr2').hide();
            $('.pr4').hide();
            $('.pr3New').hide();
            $('.pr3').show();
        
            $('#btnPreregPrev').hide();
            $('#btnPreregNext2').hide();
            $('#btnPreregNext1').hide();
            $('#btnPreregPrev').hide();
            $('#btnPreregNext2').hide();
            $('#btnPreregPrev2').hide();
            $('#btnPreregDone').hide();
            $('#btnPreregPrevAdd').hide();
            $('#btnPreregNextAdd').hide();
        
            $('#btnCancPrereg').show();
            $('#btnPreregPrev1').show();
            $('#btnPreregNext3').show();
    
            transactionDisplay.total = 0;
            transactionDisplay.additionTotal = 0;
            transactionDisplay.enrollTotal = 0;
            cart.container.forEach((e,i)=>{
                var price = parseFloat(course.getLocalData(e).price);
                price = ($('#special'+ e +':checked').length==1 ? price*2 : price);
                transactionDisplay.total += price;
                transactionDisplay.enrollTotal += price;
            });
            transactionDisplay.total += parseFloat($('input[name=enrReqP]:checked').data("id") != 0 ? $('input[name=enrReqP]:checked').data("price") : 0);
            transactionDisplay.additionTotal = parseFloat($('input[name=enrReqP]:checked').data("id") != 0 ? $('input[name=enrReqP]:checked').data("price") : 0);
        }
    }
}

function regPrev3(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $('.pr2A').hide();
    $('.pr1').hide();
    $('.pr2').hide();
    $('.pr4').hide();
    $('.pr3').show();

    $('#btnPreregNext1').hide();
    $('#btnPreregPrev').hide();
    $('#btnPreregNext2').hide();
    $('#btnPreregPrev2').hide();
    $('#btnPreregDone').hide();
    $('#btnPreregPrevAdd').hide();
    $('#btnPreregNextAdd').hide();

    $('#btnCancPrereg').show();
    $('#btnPreregPrev1').show();
    $('#btnPreregNext3').show();
}

function regPrev3A(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $('.pr2A').hide();
    $('.pr1').hide();
    $('.pr2').hide();
    $('.pr4').hide();
    $('.pr3').show();

    $('#btnPreregNext2A').hide();
    $('#btnPreregPrev2A').hide();
    $('#btnPreregDoneA').hide();

    $('#btnCancPreregA').show();
    $('#btnPreregPrevA').show();
    $('#btnPreregNext3A').show();
}

function regNext3(){
    if(paymentMeth==0){
        swal("Oops!", "Select payment method first!", "error");
    }
    else if(paymentMeth==1 || paymentMeth==2){
        var check = $('input[name="confirmCourse"]:checked').map(function () {
            return this.value;
        }).get();
        var count = $('input[name="confirmCourse"]:checked').length;
        if (count==0){
            swal("Oops!", "Please confirm your enrolled course first", "error");
        }
        else{
            $('.step5').html("Step 5: Terms and Agreements");
            $('.pr2A').hide();
            $('.pr1').hide();
            $('.pr2').hide();
            $('.pr3').hide();
            $('.pr3New').hide();
            $('.pr4').show();
        
            $('#btnPreregPrev').hide();
            $('#btnPreregNext2').hide();
            $('#btnPreregNext1').hide();
            $('#btnPreregPrev1').hide();
            $('#btnPreregNext3').hide();
            $('#btnPreregPrevAdd').hide();
            $('#btnPreregNextAdd').hide();
        
            $('#btnCancPrereg').show();
            $('#btnPreregPrev2').show();
            $('#btnPreregDone').show();
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
    }
}

function regNext3A(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
    if(paymentMeth==0){
        swal("Oops!", "Select payment method first!", "error");
    }
    else if(paymentMeth==1 || paymentMeth==2){
        var check = $('input[name="confirmCourse"]:checked').map(function () {
            return this.value;
        }).get();
        var count = $('input[name="confirmCourse"]:checked').length;
        if (count==0){
            swal("Oops!", "Please confirm your enrolled course first", "error");
        }
        else{
            $('.step5').html("Step 3: Terms and Agreements");
            $('.pr2A').hide();
            $('.pr1').hide();
            $('.pr2').hide();
            $('.pr3').hide();
            $('.pr3New').hide();
            $('.pr4').show();
        
            $('#btnPreregNext2A').hide();
        
            $('#btnPreregPrevA').hide();
            $('#btnPreregNext3A').hide();

            $('#btnCancPreregA').show();
            $('#btnPreregPrev2A').show();
            $('#btnPreregDoneA').show();
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
    }
}

function regDone(){
    var check = $('input[name="agree"]:checked').map(function () {
        return this.value;
    }).get();
    var count = $('input[name="agree"]:checked').length;
    if (count==0){
        swal("Oops!", "Please confirm that you have read and agreed to the terms and agreement first.", "error");
    }
    else{
        var selBranch = $('#branchID option:selected').text();
        preRegData.course = cart.container;
        preRegData.branch = $('#branchID').val();
        $('.prefBranch').html(selBranch);
        preRegData.special = {
            course: getSpecialCourseID(),
            location: $('input[name=specialCrs]:checked').length > 0 ? $('#enrPickup').val() : null,
        };
        enrollment.enroll(preRegData.info,preRegData.course, preRegData.branch, paymentMeth, preRegData.license,preRegData.special,preRegData.trans,preRegData.vehicle,preRegData.sched).submit(function(err,invoiceLink, name){
            if(err) return swal("Failed!", err.message, "error");
            $('.oneWeekDeadline').html(Date.parse("next week").toString("MMM dd, yyyy"));
            preRegData.license = $('input[name="enrReqP"]:checked').val();
            $('.invoiceLink').attr('href','api/v1/web/invoice?orno=' + invoiceLink + '&fullname=' + name);
            if (paymentMeth==1) $('#successEnrollModal1').modal('show');
            else if (paymentMeth==2) $('#successEnrollModal2').modal('show');
        });
    }
}

function regDoneA(){
    var check = $('input[name="agree"]:checked').map(function () {
        return this.value;
    }).get();
    var count = $('input[name="agree"]:checked').length;
    if (count==0){
        swal("Oops!", "Please confirm that you have read and agreed to the terms and agreement first.", "error");
    }
    else{
        preRegData.course = cart.container;
        preRegData.branch = $('#branchID').val();
        preRegData.special = {
            course: getSpecialCourseID(),
            location: $('input[name=specialCrs]:checked').length > 1 ? $('#enrPickup').val() : null,
        };
        enrollment.enrollWithAcc(1,preRegData.course, preRegData.lesson, preRegData.branch, paymentMeth, preRegData.special).submit(function(err,invoiceLink, name){
            if(err) return swal("Failed!", err.message, "error");
            $('.oneWeekDeadline').html(Date.parse("next week").toString("MMM dd, yyyy"));
            $('.invoiceLink').attr('href','api/v1/web/invoice?orno=' + invoiceLink + '&fullname=' + name);
            if (paymentMeth==1) $('#successEnrollModal1A').modal('show');
            else if (paymentMeth==2) $('#successEnrollModal2A').modal('show');
        });
    } 
}

$('.btnGotItPay').click(function(){
    location.reload();
    homeClick();
});

function confRegister(){
    preregister.sendForm(preRegData, function(err){
        if(err){
            swal("Failed!", err.message, "error");
        }else{
            swal("Success!", "Your pre-registration form has been submitted!", "success");
            $('#confRegisterModal').modal('hide');
        }
    });    
}

var seletedCoursePreReg = function(id){
    preRegData.course = id;
}

var preregister = {
    sendForm: function(data, cb){
        var onfail = function(detail){
            cb(new Error(detail));
        }
        $.post('api/v1/stud/register',{data: JSON.stringify(data)}, function(res){
            if(res.success){
                cb(null);
            }else{
                onfail(res.detail);
            }
        }).fail((xhr)=>{
            onfail("Error: " + xhr.status + "\n" + xhr.statusText);
        });
    },
    getBranch: function(cb){
        var onfail = function(detail){
            cb(new Error(detail));
        }
        $.get('api/v1/branch?limit=99', function(res){
            if(res.success){
                cb(null, res.data);
            }else{
                onfail(res.detail)
            }
        }).fail(xhr=>{
            onfail("Error: " + xhr.status + "\n" + xhr.statusText);
        });
    },
    getCourse: function(cb){
        var onfail = function(detail){
            cb(new Error(detail));
        }
        $.get('api/v1/util/lesson/course?limit=99', function(res){
            if(res.success){
                cb(null, res.data);
            }else{
                onfail(res.detail)
            }
        }).fail(xhr=>{
            onfail("Error: " + xhr.status + "\n" + xhr.statusText);
        });
    }
}

var getSpecialCourseID = function(){
    var items = $('input[name=specialCrs]:checked');
    var ids = [];
    for(var x=0; x<items.length; x++){
        ids.push(items[x].value);
    }
    return ids;
}

//----------------------SCHEDULING
$('#schedOptCal').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    eventDurationEditable : false,
    editable: true,
    droppable: true, // this allows things to be dropped onto the calendar
    dragRevertDuration: 0,
    selectable: true,
    selectHelper: true,
    eventLimit: true, // allow "more" link when too many events
    eventClick: function(event, jsEvent, view){
      //console.log(event); OPEN A MODAL THAT SHOWS THE INFO ABOUT THIS SCHEDULE <----------------------------------------
      //console.log(event._id);
      editRecSched1(event._id);
    },
    drop: function(date, jsEvent, ui, resourceId) {
      // is the "remove after drop" checkbox checked?
      if ($('#drop-remove').is(':checked')) {
        // if so, remove the element from the "Draggable Events" list
        $(this).remove();
        var index = schedToRemove.indexOf($(this).data("schedid"));
        schedToRemove.splice(index,1);
      }
    },
    eventDragStop: function (event, jsEvent, ui, view) {
      if (isEventOverDiv(jsEvent.clientX, jsEvent.clientY)) {
        studentSchedule.removeSched(event._id, function(err){
          if(err == null){
            $('#schedOptCal').fullCalendar('removeEvents', event._id);
            var el = $("<div data-schedid="+ event._id +" class='fc-event'>").appendTo('#availEvents').text(event.title);
            el.draggable({
              zIndex: 999,
              revert: true,
              revertDuration: 0
            });
            el.data('event', { title: event.title, _id: event._id, stick: true, data: event.data });
            schedToRemove.push(event._id);
          }
        });
      }
    },
    eventDrop: function(event, delta, revertFunc, jsEvent, ui, view){
      if(!event.allDay){
        event.color = "#7f7f7f";
        updateCalendar(event);
        var date = moment(event.start).format("YYYY-MM-DD");
        var time = moment(event.start).format("HH:mm:ss");
        app.scheduler.checkIfAvailable(event, date, time, function(err, available){
          if(err){
            event.color = "#AA1414";
            updateCalendar(event);
          }else{
            event.overtime = false;
            var color;
            switch(available){
              case 0 : { //Unavailable
                color = "#AA1414";
                break;
              } 
              case 1 : {  //Available
                color = "#3A87AD";
                break;
              } 
              case 2 : {  //Overtime
                color = "#ffbd16";
                event.overtime = true;
                break;
              } 
            }
            event.color = color;
            updateCalendar(event);
          }
        });
      }else{
        event.color = "#AA1414";
        updateCalendar(event);
      }
    },
    businessHours:[
      {
        dow: [ 1, 2, 3, 4, 5, 6, 7 ], // Monday, Tuesday, Wednesday
        start: '09:00', // 8am
        end: '17:30' // 6pm
      },
      {
        dow: [7],
        start: '09:00', 
        end: '17:30'
      }
    ],
  });