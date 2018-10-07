var preRegLoaded = 0;
var loadPreReg = function(refresh){
    if(refresh == undefined){
        refresh = false
    }else{
        preRegLoaded = 0;
        preRegAssess.offset = 0;
    };
    if(branchLoaded == 0 || courseLoaded == 0){
        loadBranch(function(){
            loadCourse(function(){
                loadPreReg();
            });
        });
    }else{
        if(preRegLoaded == 0){
            $(".preloader").fadeIn();    
            license.get(function(err){
                if(err) return console.error(err);
            });          
            preRegAssess.getList(err=>{
                if(err) return console.error(err);
                renderEnrollTbl(preRegAssess.pages[preRegAssess.currPage]);
                var c = preRegAssess.pages[preRegAssess.currPage].length;
                $('.enrTodayDash').html(c);
                if(preRegAssess.pages[preRegAssess.currPage].length==0){
                    $('.noEnrolleesTr').show();
                    $('.noEnrolleesDet').show();
                    $('.hrReg').show();
                    $('.hasEnrollee').hide();
                    $('.hasEnrolleeBtn').hide();
                    $('.tblReg').hide();
                    viewPendingStudent(-1);
                }else{
                    $('.noEnrolleesTr').hide();
                    $('.noEnrolleesDet').hide();
                    $('.hrReg').hide();
                    $('.hasEnrollee').show();
                    $('.hasEnrolleeBtn').show();
                    $('.tblReg').show();
                    viewPendingStudent(preRegAssess.pages[preRegAssess.currPage][0].id);
                }
                bindMark();
                $('#searchEnrollment').on('click', function(e){
                    var data = preRegAssess.pages[preRegAssess.currPage].slice(0);
                    data.forEach((e,i)=>{
                        data[i].data = JSON.stringify(e.data);
                        if(i==data.length-1){
                            search.init(data, ["dateSubmited","data",], function(data1){
                                var data2 = data1.slice(0);
                                if(data2.length==0) return generateTbl();
                                data2.forEach((e,i)=>{
                                    try{
                                        data2[i].data = JSON.parse(e.data);
                                    }catch(e){
                                        //data2[i].data = JSON.parse(e.data);
                                        //console.log(e); 
                                    }
                                    if(i==data2.length-1){
                                        setTimeout(generateTbl,1000);
                                    }
                                });
                                function generateTbl(){
                                    renderEnrollTbl(data2);
                                    bindMark(); 
                                }
                            });
                        }
                    });
                });
                $('#searchEnrollment').on('keyup', function(e){
                    search.keypress($('#searchEnrollment').val());
                });
                preRegLoaded = 1;
                $(".preloader").fadeOut(); 
                
                function bindMark(){
                    $('.tblReg tbody tr:first').addClass("highlightTr");
                    $('.tblReg tbody tr').click(function () {
                        var selected = $(this).hasClass("highlightTr");
                        $('.tblReg tbody tr').removeClass("highlightTr");
                        if (!selected)
                            $(this).addClass("highlightTr");
                    });
                }
            })
        }
    }
}

function viewRegForm(){
    $('#enrRegPickup').removeAttr('disabled');
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
        $('#enrRegPickup').val(profile.data.special.location);
        $('.enrCourse').val(profile.data.course);
        $('.enrBranch').val(profile.data.branch);
        $('input[name=enrRegNat]').removeAttr('checked');
        $('input[name=enrRegSex]').removeAttr('checked');
        $('input[name=enrRegSex][value='+ info.sex +']').attr('checked','checked');
        $('input[name=enrRegNat][value='+ info.nationality +']').attr('checked','checked');
        $('#viewRegFormModal').modal('show');
        if(profile.data.special.location==""){
            $('#enrRegPickup').attr('disabled','true');
        }
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
                    loadPreReg(1);
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
                        loadPreReg(1);
                        //DB: Remove registration function here
                    }
                });
            }
        });
    }
}

function openPayment(){
    if(preRegAssess.selected != -1){
        var total = 0;
        preRegAssess.getLocalData(function(profile){
            $('.addPayName').html(profile.data.info.fullname.replace(/_/g," "));
            $('.addPayDate').html(Date.parse("today").toString("MMM dd, yyyy"));
            $('.paymentModal').html("");
            for(var i = 0; i < profile.data.course.length; i++){
                var e = profile.data.course[i];
                courseModule.selected = e;
                courseModule.getLocalData(function(data){
                    var price = profile.data.special.course.indexOf(data.id+"") == -1 ? data.amount : (data.amount * 2);
                    total += price;// data.amount;
                    var html = "<tr>";
                    html += "<td>Tuition Fee</td>";
                    html += "<td><span>"+ data.courseID + (profile.data.special.course.indexOf(data.id) == -1 ? "" : "(SPECIAL)") +"</span></td>";
                    html += "<td>"+ price.formatMoney(2) +"</td>";
                    html += "</tr>";
                    $('.paymentModal').append(html);
                    $('.totAssessHalf').html((price/2).formatMoney(2));
                    //console.log(html);
                });
            }
            $('.totAssess').html(total);
            license.getLocal(profile.data.applyLicense, function(license){
                if(license.price == 0) return;
                total += license.price;
                $('.totAssess').html(total);
                var html = "<tr>";
                html += "<td>Apply</td>";
                html += "<td>" + license.desc + "</td>";
                html += "<td>" + license.price.formatMoney(2) + "</td>";
                html += "</tr>";
                $('.paymentModal').append(html);
            });
            payments.amount = total;
            payments.transactionID = profile.data.transaction.ORnum;
            $('.totAssess').html(total.formatMoney(2));
        });
        $('#paymentEnroll').val("")
        $('#addPaymentModal').modal('show');
    }
}

function appRegForm(){ //Approve Registration
    var x = $('#paymentEnroll').val();
    var bal="0.00"; 
    if (x=="" || x==0 || x==0.00){
        swal("Oops!", "Please enter amount of payment.", "error");
    }
    else{
        $('.preloader').fadeIn();
        preRegAssess.enrolleeSelected = preRegAssess.selected;
        payments.pay(x, "enrolment", function(err, response){
            if(err){
                console.log(err);
                $('.preloader').fadeOut();
                swal('Failed!', err.message, 'error');
            }else{
                var reg = function(cb){
                    preRegAssess.approve(preRegAssess.enrolleeSelected, function(err){
                        $('.preloader').fadeOut();
                        if(err){
                            setTimeout(()=>{
                                swal('Problem encountered', err.message, 'error');
                            },100);
                            cb(err);
                        }else{
                            swal('Done', "Student Successfully Enrolled!",'success');
                            preRegAssess.enrolleeSelected = -1;
                            loadPreReg(1);
                            cb(null);
                        }
                    });
                };
                if(response.status == 1){
                    swal({
                        title: 'Done!',
                        text: "Balance fully paid",
                        type: "success"
                    },()=>{
                        reg(()=>{});
                    });
                }else if(response.status == 2){
                    swal({
                        title: 'Done!',
                        text: "Balance Left: " + response.balance,
                        type: "warning"
                    },()=>{
                        reg(()=>{});
                    });
                }else if(response.status == 0){
                    $('.preloader').fadeOut();
                    swal({
                        title: 'Notice!',
                        text: response.detail,
                        type: "warning"
                    },()=>{
                        reg(()=>{});
                    });
                }
                $('#addPaymentModal').modal('hide');
                loadPreReg(1);
            }
        });
    }
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
            $('.noEnrolleesTr').hide();
            office.selected = temp.data.branch;
            office.getLocalData(function(branch){
                temp.data["branchName"] = branch.name;
                var targetID = temp.id;
                var html = "";
                html += "<tr onclick='viewPendingStudent("+ targetID +")'>";
                html += "<td>"+ Date.parse(temp.dateSubmit).toString("MMM dd, yyyy") +"</td>";
                html += "<td>"+ (temp.data.info.fullname).replace(/_/g,' ') +"</td>";
                html += "<td class='enrollReq"+ targetID +"'></td>";
                html += "</tr>";
                $('#preRegTbl').append(html); 
                license.getLocal(temp.data.applyLicense, l=>{
                    $('.enrollReq'+targetID).html(l.desc);
                });
                cb(null);
            });
        // }else{
        //     $('.noEnrolleesTr').hide();
        // }
    }
    queryer.start(task,data,function(err,done){
        if(err) return console.error(err);
    });
}

var viewPendingStudent = function(id){
    $('.regEnrName').html("");
    $('.regEnrBranch').html("");
    $('.regPaymeth').html("");
    $('.regEnrDeadline').html("");
    preRegAssess.selected = id;
    preRegAssess.getLocalData(function(profile){
        payments.transactionID = profile.data.transaction.ORnum;
        $('.regEnrName').html(profile.data.info.fullname.replace(/_/g, ' '));
        $('.regEnrBranch').html(profile.data.branchName);
        $('.regPaymeth').html(profile.data.payment == 1 ? "PAY ON BRANCH" : "PAY ON BANK");
        if(profile.data.payment != 1){ //lumalabas lang pag pay on bank
            $('.attachDiv').show();
        }else $('.attachDiv').hide();
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

function showAttach(){ //when view attachment is clicked
    if ($('.attachNo').html()=="0") swal("", "There are no attachment yet.", "error");
    else{
        if(preRegAssess.selected != -1){
            var total = 0;
            preRegAssess.getLocalData(function(profile){
                $('.addPayName').html(profile.data.info.fullname.replace(/_/g," "));
                $('.paymentModal').html("");
                for(var i = 0; i < profile.data.course.length; i++){
                    var e = profile.data.course[i];
                    courseModule.selected = e;
                    courseModule.getLocalData(function(data){
                        var price = profile.data.special.course.indexOf(data.id+"") == -1 ? data.amount : (data.amount * 2);
                        total += price;// data.amount;
                        var html = "<tr>";
                        html += "<td>Tuition Fee</td>";
                        html += "<td><span>"+ data.courseID + (profile.data.special.course.indexOf(data.id) == -1 ? "" : "(SPECIAL)") +"</span></td>";
                        html += "<td>"+ price.formatMoney(2) +"</td>";
                        html += "</tr>";
                        $('.paymentModal').append(html);
                        $('.totAssessHalf').html((price/2).formatMoney(2));
                    });
                }
                $('.totAssess').html(total);
                license.getLocal(profile.data.applyLicense, function(license){
                    if(license.price == 0) return;
                    total += license.price;
                    $('.totAssess').html(total);
                    var html = "<tr>";
                    html += "<td>Apply</td>";
                    html += "<td>" + license.desc + "</td>";
                    html += "<td>" + license.price.formatMoney(2) + "</td>";
                    html += "</tr>";
                    $('.paymentModal').append(html);
                });
                payments.amount = total;
                payments.transactionID = profile.data.transaction.ORnum;
                $('.totAssess').html(total.formatMoney(2));
            });
            $('#paymentEnroll').val("")
        }
        $('#viewAttachModal').modal('show');
    }
}