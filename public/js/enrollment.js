var preRegLoaded = 0;
var loadPreReg = function(){
    if(branchLoaded == 0){
        loadBranch();
        loadCourse();
        loadPreReg();
    }else{
        if(preRegLoaded == 0){
            $(".preloader").fadeIn();              
            preRegAssess.getList(err=>{
                if(err) return console.error(err);
                renderEnrollTbl(preRegAssess.pages[preRegAssess.currPage]);
                viewPendingStudent(preRegAssess.pages[preRegAssess.currPage][0].id);
                $('.tblReg tbody tr:first').addClass("highlightTr");
                $('.tblReg tbody tr').click(function () {
                    var selected = $(this).hasClass("highlightTr");
                    $('.tblReg tbody tr').removeClass("highlightTr");
                    if (!selected)
                        $(this).addClass("highlightTr");
                });
                preRegLoaded = 1;
                $(".preloader").fadeOut();                  
            })
        }
    }
}

function viewRegForm(){
    preRegAssess.getLocalData(function(profile){
        var name = profile.data.info.fullname.split('_');
        var info = profile.data.info;
        $('#enrRegFN').val(name[0]);
        $('#enrRegMN').val(name[1]);
        $('#enrRegSN').val(name[2]);
        $('#enrRegBday').val(info.birthdate);
        $('#enrRegBplace').val(info.birthplace);
        $('#enrRegAddress').val(info.address);
        $('.enrCivStatus').val(info.civilStatus);
        $('#enrRegOcc').val(info.occupation);
        $('#enrRegCont').val(info.telno);
        $('#enrRegEmail').val(info.email);
        $('#enrRegGuard').val(info.guardian.name);
        $('#enrRegGuardCont').val(info.guardian.telno);
        $('#enrRegPickup').val(profile.data.special);
        $('.enrCourse').val(profile.data.course);
        $('.enrBranch').val(profile.data.branch);
        $('input[name=enrRegNat]').removeAttr('checked');
        $('input[name=enrRegSex]').removeAttr('checked');
        $('input[name=enrRegSex][value='+ info.sex +']').attr('checked','checked');
        $('input[name=enrRegNat][value='+ info.nationality +']').attr('checked','checked');
        $('#viewRegFormModal').modal('show');
    });
}

function remRegForm(){ //Remove or reject registration form
    swal({
        title: "Warning!",
        text: "Are you sure you want to reject/remove this registration form?",
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
            preRegAssess.delete(function(err){
                if(err){
                    swal("Failed!", err.message, "error");
                }else{
                    $('#viewRegFormModal').modal('hide');
                    swal("Success!", "Registration form is rejected.", "success");
                    //DB: Remove registration function here
                }
            });
        }
    });
}

function saveEnrReg(){ //Save changes on View Registration Modal
    var info;
    var check = checkEnrReg(x=>{
        info = x;
    });
    if (check==0){
        swal("Oops!", "Please fill out all required fields.", "error");
    }
    else{
        swal({
            title: "Warning!",
            text: "Are you sure you want to save the changes?",
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
                var data = {
                    data: JSON.stringify(info),
                }
                preRegAssess.update(data, function(err){
                    if(err){
                        swal("Failed!", err ,"error");
                    }else{
                        swal("Changes have been saved!", "" ,"success");
                        $('#viewRegFormModal').modal('hide');
                        //DB: Remove registration function here
                    }
                });
            }
        });
    }
}

function openPayment(){
    $('#addPaymentModal').modal('show');
}

function appRegForm(){ //Approve Registration
    $('#addPaymentModal').modal('hide');
    // $('#enrRegFN').modal('show');
    swal({
        title: "Warning!",
        text: "Are you sure you want to approve this registration form?",
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
            preRegAssess.delete(function(err){
                if(err){
                    swal("Failed!", err.message, "error");
                }else{
                    swal("Registration has been accepted", "" ,"success");
                    $('#viewRegFormModal').modal('hide');
                }
            });
        }
        else{
            $('#addPaymentModal').modal('show');  
        }
    });
}

function checkEnrReg (cb){ //Checker of empty fields
    var a, b, c, d, e, f, g; //checker variables
    var fn = $('#enrRegFN').val();
    var mn = $('#enrRegMN').val();
    var sn = $('#enrRegSN').val();
    var bday = $('#enrRegBday').val();
    var bplace = $('#enrRegBplace').val();
    var add = $('#enrRegAddress').val();
    var occ = $('#enrRegOcc').val();
    var cont = $('#enrRegCont').val();
    var email = $('#enrRegEmail').val();
    var guard = $('#enrRegGuard').val();
    var gCont = $('#enrRegGuardCont').val();
    var civ = $('select[name="enrRegCivStatus"]').val();
    var crs = $('select[name="enrRegBranch"]').val();
    var branch = $('select[name="enrRegCivStatus"]').val();
    var sex = $('input[name="enrRegSex"]:checked').val();
    var pick = $('#enrRegPickup').val();
    
    a = fn.replace(/\s+/g, '');
    b = sn.replace(/\s+/g, '');
    c = bplace.replace(/\s+/g, '');
    d = add.replace(/\s+/g, '');
    e = cont.replace(/\s+/g, '');
    f = guard.replace(/\s+/g, '');
    g = gCont.replace(/\s+/g, '');

    if (a=="" || b=="" || bday==""
        || c=="" || d=="" || e==""
        || f=="" || g=="" || civ=="civ0"){
            return "0";
            //DB: Add validation for course and branch here
        }
    else{
        var preRegData = {info:{}};
        preRegData.info["fullname"] = fn + "_" + mn + "_" + sn;
        preRegData.info["birthdate"] = bday;
        preRegData.info["birthplace"] = bplace;
        preRegData.info["address"] = add;
        preRegData.info["telno"] = cont;
        preRegData.info["occupation"] = occ;
        preRegData.info["email"] = email;
        preRegData.info["civilStatus"] = civ;
        preRegData.info["sex"] = sex;
        preRegData["special"] = pick;
        preRegData.info["guardian"] = {
            name: guard,
            telno: gCont,
        };
        //preRegData["course"] = $('input[name="enrRegCourse"]:checked').val();
        preRegAssess.getLocalData(function(x){
            preRegData["payment"] = x.data.payment;
            preRegData["course"] = x.data.course;
            preRegData["applyLicense"] = x.data.applyLicense;
            preRegData["branch"] = x.data.branch;
        });
        console.log(preRegData);
        var age = parseInt(Date.parse("today").toString("yyyy")) - parseInt(Date.parse(preRegData.info.birthdate).toString("yyyy"));
        $('.req').hide();
        if(age < 17){
            swal("", "Sorry, only 17 years old and above are allowed to register.", "error");
            return "0";            
        }else if(preRegData.info.nationality == "Non-Filipino"){
            $('.reqC').show();
        }else if(age < 19 && age > 16){
            $('.reqA').show();
        }else if(age > 19){
            $('.reqB').show();
        };
        cb(preRegData);
        return "1";
    } 
}

var renderEnrollTbl = function(data){
    $('#preRegTbl').html("");    
    var task = function(_data, cb){
        var temp = _data;
        office.selected = temp.data.branch;
        office.getLocalData(function(branch){
            temp.data["branchName"] = branch.name;
            var html = "";
            html += "<tr onclick='viewPendingStudent("+ temp.id +")'>";
            html += "<td>"+ Date.parse(temp.dateSubmit).toString("MMM dd, yyyy") +"</td>";
            html += "<td>"+ temp.data.info.fullname.replace(/_/g,' ') +"</td>";
            html += "<td>"+ branch.name +"</td>";
            html += "</tr>";
            $('#preRegTbl').append(html); 
            cb(null);      
        });
    }
    queryer.start(task,data,function(err,done){
        if(err) return console.error(err);
    });
}

var viewPendingStudent = function(id){
    preRegAssess.selected = id;
    preRegAssess.getLocalData(function(profile){
        $('.regEnrName').html(profile.data.info.fullname.replace(/_/g, ' '));
        $('.regEnrBranch').html(profile.data.branchName);
        $('.regPaymeth').html(profile.data.payment == 1 ? "PAY ON BRANCH" : "ONLINE PAYMENT");
        $('.regEnrDeadline').html(Date.parse(profile.dateSubmit).addWeeks(1).toString("MMM dd, yyyy"));
        var age = parseInt(Date.parse("today").toString("yyyy")) - parseInt(Date.parse(profile.data.info.birthdate).toString("yyyy"));
        $('.reqForm').hide();
        if(profile.data.nationality == "Non-Filipino"){
            $('.reqC').show();
        }else if(age < 19){
            $('.reqA').show();
        }else if(age > 18){
            $('.reqB').show();
        }
    });
}