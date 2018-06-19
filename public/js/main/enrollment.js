var checkedReqP, checkedValReq, countT=0, countP=0, textReq;
var checkedReqT = 1, canCancel = 1;
var isCheck1, isCheck2, isCheck3;
var selected;
var selectedCourse = 0;
var paymentMeth;
var preRegData = {
    info: {},
    course: 0,
    branch: 0,
    license: 0,
};

$(function(){
    $('.paymentOptionBack').hide();
    $('.paymentOptionDiv1').hide();
    $('.paymentOptionDiv').show();

    $('.pr2').hide();
    $('.pr3').hide();
    $('.pr4').hide();
    $('.pr1').show();

    $('.reqA').show();
    $('.reqB').show();
    $('.reqC').show();

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
    resetEnrollment();

    $('#enrBday').change(function() {
        var date = $("enrBday").val();
        console.log(date, 'change')
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

});

function payMeth1(){
    $('.paymentOptionDiv').hide();
    $('.paymentOptionDiv1').show();
    paymentMeth = 1;
}

function paymentBack(){
    $('.paymentOptionDiv1').hide();
    $('.paymentOptionDiv').show();
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
    $("#enrReqT1").prop("checked", true);
    document.getElementById("enrSex1").checked = true;
    document.getElementById("enrSex2").checked = false;
    $('input[name="agree"]').prop('checked', false);
    $('input[name="confirmCourse"]').prop('checked', false);
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
        preRegData.info["nationality"] = nat;
        preRegData.info["guardian"] = {
            name: guard,
            telno: gCont,
        };
        var age = parseInt(Date.parse("today").toString("yyyy")) - parseInt(Date.parse(preRegData.info.birthdate).toString("yyyy"));
        $('.req').hide();
        if(age < 17){
            swal("","Too young to drive,","error");
            return "0"; }           
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
        closeOnConfirm: false,
        closeOnCancel: true
    },
    function(isConfirm){
        if (isConfirm) {
            resetEnrollment();
            swal("Changes have been discarded!", "" ,"success")
            $('.pr2').hide();
            $('.pr3').hide();
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
    // isCheck1 = checkEnr1();
    isCheck1 = 1;
    if (isCheck1=="1"){
        $('.pr1').hide();
        $('.pr3').hide();
        $('.pr4').hide();
        $('.pr2').show();

        $('#btnPreregNext1').hide();
        $('#btnPreregPrev').hide();
        $('#btnPreregNext2').hide();
        $('#btnPreregPrev2').hide();
        $('#btnPreregPrev1').hide();
        $('#btnPreregNext3').hide();
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
}

function regNext2(){
    isCheck2 = checkEnr2();
    if (isCheck2==0){
        swal("Oops!", "Please select at least one.", "error");
    }
    else{
        // preRegData.branch = branch;
        paymentBack();
        $('.pr1').hide();
        $('.pr2').hide();
        $('.pr4').hide();
        $('.pr3').show();
    
        $('#btnPreregPrev').hide();
        $('#btnPreregNext2').hide();
        $('#btnPreregNext1').hide();
        $('#btnPreregPrev').hide();
        $('#btnPreregNext2').hide();
        $('#btnPreregPrev2').hide();
        $('#btnPreregDone').hide();

        $('#btnCancPrereg').show();
        $('#btnPreregPrev1').show();
        $('#btnPreregNext3').show();
    }
}

function regPrev2(){
    $('.pr1').hide();
    $('.pr3').hide();
    $('.pr4').hide();
    $('.pr2').show();

    $('#btnPreregNext1').hide();
    $('#btnPreregPrev1').hide();
    $('#btnPreregNext3').hide();

    $('#btnPreregPrev2').hide();
    $('#btnPreregDone').hide();

    $('#btnCancPrereg').show();
    $('#btnPreregPrev').show();
    $('#btnPreregNext2').show();    

    $('.tblIncluLes').hide();
    $('.noSelCorsDiv').show();
}

function regPrev3(){
    $('.pr1').hide();
    $('.pr2').hide();
    $('.pr4').hide();
    $('.pr3').show();

    $('#btnPreregNext1').hide();
    $('#btnPreregPrev').hide();
    $('#btnPreregNext2').hide();
    $('#btnPreregPrev2').hide();
    $('#btnPreregDone').hide();

    $('#btnCancPrereg').show();
    $('#btnPreregPrev1').show();
    $('#btnPreregNext3').show();
}

function regNext3(){
    var check = $('input[name="confirmCourse"]:checked').map(function () {
        return this.value;
    }).get();
    var count = $('input[name="confirmCourse"]:checked').length;
    if (count==0){
        swal("Oops!", "Please confirm your enrolled course first", "error");
    }
    else{
        $('.pr1').hide();
        $('.pr2').hide();
        $('.pr3').hide();
        $('.pr4').show();
    
        $('#btnPreregPrev').hide();
        $('#btnPreregNext2').hide();
        $('#btnPreregNext1').hide();
        $('#btnPreregPrev1').hide();
        $('#btnPreregNext3').hide();
    
        $('#btnCancPrereg').show();
        $('#btnPreregPrev2').show();
        $('#btnPreregDone').show();
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
        if (paymentMeth==1){
            $('.oneWeekDeadline').html(Date.parse("next week").toString("MMM dd, yyyy"));
            // preRegData.license = $('input[name="enrReqP"]:checked').val();
            $('#successEnrollModal2').modal('show');
        }
        else if (paymentMeth==2){
            $('#successEnrollModal2').modal('show');
        }
    }
}

$('.btnGotItPay').click(function(){
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

