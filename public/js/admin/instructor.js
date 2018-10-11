var instID;
var yearnow, monthnow, uptomonth, uptomonth1;
$(function () {
    //DB: Pakilagay naman yung highlightTr
    // $('.tblInstructor tbody tr:first').addClass("highlightTr");
    // $('.tblInstructor tbody tr').click(function () {
    //     var selected = $(this).hasClass("highlightTr");
    //     $('.tblInstructor tbody tr').addClass("highlightTr");
    //     if (!selected)
    //         $(this).removeClass("highlightTr");
    // });

    $("#btnNewInstructor").on("click", function () { //opens add instructor modal
        resetNewInstr();
        $('#newInstructorModal').modal('show');
    });

    $(".backInst").on("click", function () { //when back button is clicked (right side of instructor information)
        //SD: Dapat may modal pa dito kung ididiscard ba yung changes
        $('.view-viewInstructor').hide();
        $('.view-instructor').show();
    });

    $(".btnDelInstAcc").on("click", function () { //opens confirmation modal upon clicking delete account. UNDONE.
        $('#confirmDeleteInstructor').modal('show');
    });

    $(".btnUpdateInstAcc").on("click", function () { //opens confirmation modal upon clicking update account. UNDONE.
        $('#confirmDeleteInstructor').modal('show');
    });

    $('.btnDelInstAcc').click(function(){
        inst.getLocalData(function(data){
            $('#instResign').attr("min", Date.parse(data.dateRegistered).addDays(1).toString("yyyy-MM-dd"));
            $('#instResign').attr("max", Date.parse("today").toString("yyyy-MM-dd"));
        });
        $('#instResign').val(Date.parse("today").toString("yyyy-MM-dd"));
    });
    
    $('#searchInst').on('click', function(e){
        search.init(inst.pages[inst.currPage], ["fullname","instID","license"], function(data){
            renderInstTablePage(data);
        });
    });

    $('#searchInst').on('keyup', function(e){
        search.keypress($('#searchInst').val());
    });
});

$("#btnViewInstructor").on("click", function () { //opens view instructor page upon clicking view details
    $('.view-instructor').hide();
    $('.view-viewInstructor').show();
    resetSettingsInst();
    loadEvalInst();   
    scheduler.getInstSched(inst.selected, function(err, sched){
        if(err) return console.error(err);
        // if(sched.length == 0) return;
        var html = "<table class='table tblCustom'>";
        html += "<thead><tr><th>Date</th><th>Time</th><th>Student</th><th>Branch</th></tr></thead><tbody class='instScheduleTbl'></tbody></table>";
        $('#instructorSched').html(html);
        if(sched.length!=0){
            $('.noInstSched').hide();
            sched.forEach((e,i)=>{
                scheduler.getStudName(e.studID, function(err, student){
                    scheduler.getBranchName(e.branch, function(err, branch){
                        var row = "<tr>";
                        row += "<td>"+ Date.parse(e.date).toString('MMM dd, yyyy') +"</td>";
                        row += "<td>"+ Date.parse(e.time).toString('hh:mm tt') +"</td>";
                        row += "<td>"+ student.fullname.replace(/_/g, " ") +"</td>";
                        row += "<td>"+ branch +"</td>";
                        row += "</tr>";
                        $('.instScheduleTbl').append(row);
                    });
                });
            });
        }else{
            $('.noInstSched').show();
        }
    });
});

var loadInst = function(){
    $(".preloader").fadeIn();  
    inst.getInstList(function (err, done) {
        if (err) return console.log(err);
        renderInstTablePage(inst.pages[inst.currPage]);
        viewInstProfile(inst.pages[inst.currPage][0].instID);
        $('.tblInstructor tbody tr:first').addClass("highlightTr");                
            $('.tblInstructor tbody tr').click(function () {
                var selected = $(this).hasClass("highlightTr");
                $('.tblInstructor tbody tr').removeClass("highlightTr");
                if (!selected)
                    $(this).addClass("highlightTr");
            });
        $(".preloader").fadeOut();   
    });    
}

function loadEvalInst(){
    yearnow = (new Date()).getFullYear();
    monthnow = (new Date()).getUTCMonth();
    uptomonth1 = monthnow;
    monthnow += 1;
    $('.selectFromEval').val(monthnow);
    $('.yrNow').html(yearnow);

    inst.getEvalInstPerc(function(err, data){
        if(err){
            swal("Failed!", err.message, "error");
            console.log(err);
        }else{
            $('.startEvalPerc').html("");
            var dataLen = data.length;
            if(data.length!=0){
                var html = data[0].count*20 + "%";
                $('.startEvalPerc').append(html);
            } else{
                var html = "0%";
                $('.startEvalPerc').append(html);
            }
        }
    });

    if (monthnow== (new Date()).getUTCMonth()+1){
        $('.monthEvalPerc').html("0%");
    }else{
        inst.getEvalInstPercMonth(function(err, data){
            if(err){
                swal("Failed!", err.message, "error");
                console.log(err);
            }else{
                $('.monthEvalPerc').html("");
                var dataLen = data.length;
                if(data.length!=0){
                    var html = data[0].count*20 + "%";
                    $('.monthEvalPerc').append(html);
                } else{
                    var html = "0%";
                    $('.monthEvalPerc').append(html);
                }
            }
        });
    }

    if (monthnow== (new Date()).getUTCMonth()+1){
        $('.noEvalYet').show();
    }else{
        inst.getInstEval(function (err, data){
            if(err){
                swal("Failed!", err.message, "error");
                console.log(err);
            }else{
                $('#evalInstAdmin').html("");
                var x = 1;
                var pad = "0000";
                var eval;
                if(data.length!=0){
                    data.forEach((e,i)=>{
                        var html = "<div class='sl-item'><div class='sl-left'> <img src='assets/images/user4.png' alt='Student' id='studEvalPic' class='img-circle /> </div><div class='sl-right'>";
                        html += "<div><a href='#' class='link' id='studEvalName'>" + e.fullname.replace(/_/g, ' ') + "</a><br>Date Evaluated: <span class='sl-date'>" + (Date.parse(e.dateEvaluated ).toString("MMM dd, yyyy")) + "</span>";
                        html += "<br>Course Enrolled: <span class='crsInstEval'>CRS-" + e.carType.toUpperCase() + (pad.substring(0, pad.length-(e.courseID+"").length) + e.courseID) + "</span><div class='separator2'></div>";
                        html += "<p style='color: #455a64;'>Evaluation Grade: <span class='studEvalGrade'>" + e.grade + " (" + (e.grade == 5 ? '100%' : (e.grade == 4 ? '80%' : (e.grade == 3 ? '60%' : (e.grade == 2 ? '40%' : '20%')))) + ")" + "</span></p>";
                        html += "<p class='m-t-10 studEvalMsg'>\"" + e.comment + "\"</p>";
                        html += "</div></div></div><hr>";
                        x++;
                        $('#evalInstAdmin').append(html);
                    }); 
                }
            }
        });
    }

    switch (monthnow){
        case 1: 
            monthnow = "(January)";
            uptomonth1 = 0;
            break;
        case 2: 
            uptomonth1 = 1;
            uptomonth = "January";
            monthnow = "(February)";
            break;
        case 3: 
            uptomonth1 = 2;
            uptomonth = "February";
            monthnow = "(March)";
            break;
        case 4: 
            uptomonth1 = 3;
            uptomonth = "March";
            monthnow = "(April)";
            break;
        case 5: 
            uptomonth1 = 4;
            uptomonth = "April";
            monthnow = "(May)";
            break;
        case 6: 
            uptomonth1 = 5;
            uptomonth = "May";
            monthnow = "(June)";
            break;
        case 7: 
            uptomonth1 = 6;
            uptomonth = "June";
            monthnow = "(July)";
            break;
        case 8: 
            uptomonth1 = 7;
            uptomonth = "July";
            monthnow = "(August)";
            break;
        case 9: 
            uptomonth1 = 8;
            uptomonth = "August";
            monthnow = "(September)";
            break;
        case 10: 
            uptomonth1 = 9;
            uptomonth = "September";
            monthnow = "(October)";
            break;
        case 11: 
            uptomonth1 = 10;
            uptomonth = "October";
            monthnow = "(November)";
            break;
        case 12: 
            uptomonth1 = 11;
            uptomonth = "November";
            monthnow = "(December)";
            break;
    }
    $('.uptoMonth').html(uptomonth);
    $('.yearEval').html(yearnow);
    $('.curMonth').html(monthnow);
    $('.monthEval').html(monthnow);
}

function goEvalSearch(){
    var selMonth = $('.selectFromEval').find("option:selected").text();
    monthnow = $('.selectFromEval').find("option:selected").val();
    $('.monthEval').html("(" + selMonth + ")");
    $('.curMonth').html("(" + selMonth + ")");
    $(".preloader").fadeIn(); 

    if (monthnow== (new Date()).getUTCMonth()+1){
        $('.monthEvalPerc').html("0%");
    }else{
        inst.getEvalInstPercMonth(function(err, data){
            if(err){
                swal("Failed!", err.message, "error");
                console.log(err);
            }else{
                $('.monthEvalPerc').html("");
                var dataLen = data.length;
                if(data.length!=0){
                    var html = data[0].count*20 + "%";
                    $('.monthEvalPerc').append(html);
                } else{
                    var html = "0%";
                    $('.monthEvalPerc').append(html);
                }
            }
        });
    }

    if (monthnow==(new Date()).getUTCMonth()+1){
        $('.noEvalYet').show();
    }else{
        inst.getInstEval(function(err, data){
            if(err){
                swal("Failed!", err.message, "error");
                console.log(err);
            }else{
                $('#evalInstAdmin').html("");
                var pad = "000";
                var x = 1;
                var dataLen = data.length;
                if(data.length!=0){
                    $('.noEvalYet').hide();
                    data.forEach(e => {
                        var html = "<div class='sl-item'><div class='sl-left'> <img src='assets/images/user4.png' alt='Student' id='studEvalPic' class='img-circle /> </div><div class='sl-right'>";
                        html += "<div><a href='#' class='link' id='studEvalName'>" + e.fullname.replace(/_/g, ' ') + "</a><br>Date Evaluated: <span class='sl-date'>" + (Date.parse(e.dateEvaluated ).toString("MMM dd, yyyy")) + "</span>";
                        html += "<br>Course Enrolled: <span class='crsInstEval'>CRS-" + e.carType.toUpperCase() + (pad.substring(0, pad.length-(e.courseID+"").length) + e.courseID) + "</span><div class='separator2'></div>";
                        html += "<p style='color: #455a64;'>Evaluation Grade: <span class='studEvalGrade'>" + e.grade + " (" + (e.grade == 5 ? '100%' : (e.grade == 4 ? '80%' : (e.grade == 3 ? '60%' : (e.grade == 2 ? '40%' : '20%')))) + ")" + "</span></p>";
                        html += "<p class='m-t-10 studEvalMsg'>\"" + e.comment + "\"</p>";
                        html += "</div></div></div><hr>";
                        x++;
                        $('#evalInstAdmin').append(html);
                    });
                } else{
                    $('.noEvalYet').show();
                }
            }
        });
    }
    $(".preloader").fadeOut(); 
}

function resetNewInstr() //resets fields on add instructor modal
{
    $("#newInstFirstname").val("");
    $("#newInstMidname").val("");
    $("#newInstSurname").val("");
    $("#newInstBday").val("");
    $("#newInstAddress").val("");
    $("#newInstPhone").val("");
    $("#newInstEmail").val("");
    $("#newInstLicense").val("");
    $('select[name="newInstEduc"]').val(0);
    document.getElementById("g1NI").checked = true;
    document.getElementById("g2NI").checked = false;
    $("#btnDoneAddInst").show();
}

var nextInst = function ()
{
    var un = 'gtatel0517@gmail.com'; //temp
    var pw = 'ella123'; //temp

    var fn = $("#newInstFirstname").val();
    var mn = $("#newInstMidname").val();
    var sn = $("#newInstSurname").val();
    var bday = $("#newInstBday").val();
    var add = $("#newInstAddress").val();
    var phone = $("#newInstPhone").val();
    var email = $("#newInstEmail").val();
    var educ = $('select[name="newInstEduc"]').val();
    var gender = $('input[name="newInstGender"]:checked').val();
    var license = $('#newInstLicense').val();

    fn = fn.replace(/\s+/g, '');
    sn = sn.replace(/\s+/g, '');
    bday = bday.replace(/\s+/g, '');
    add = add.replace(/\s+/g, '');
    phone = phone.replace(/\s+/g, '');
    email = email.replace(/\s+/g, '');

    if (fn=="" || sn=="" || add=="" 
        || phone=="" || email=="" || bday=="") {
            swal("Oops!", "Please fill out all required fields.", "error");
        }
        else {    
            //SD: need more validation here please.
            fn = $("#newInstFirstname").val();
            mn = $("#newInstMidname").val();
            sn = $("#newInstSurname").val();
            bday = $("#newInstBday").val();
            add = $("#newInstAddress").val();
            phone = $("#newInstPhone").val();
            email = $("#newInstEmail").val();
            educ = $('select[name="newInstEduc"]').val();
            gender = $('input[name="newInstGender"]:checked').val();

            inst.registrationDetail["info"] = {
                fullname: fn + "_" + mn + "_" + sn,
                address: add,
                telno: phone,
                email: email,
                bdate: bday,
                education: educ, 
                sex: gender,
            };
            inst.registrationDetail["license"] = license;

            swal({
                title: "Warning!",
                text: "Are you sure you want to create this instructor account?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes",
                cancelButtonText: "Cancel",
                closeOnConfirm: false,
                closeOnCancel: false
            },
                function (isConfirm) {
                    if (isConfirm) {
                        inst.registrationDetail["credential"] = {
                            username: un,
                            password: pw,
                            usertype: 2,
                        },
                        inst.register(function(err, done){
                            if(err){
                                console.error(err);
                                swal("Failed!", err.message, "error");                                
                                return 
                            }
                            swal("Success!", "Instructor account created! Instructor credentials has been sent via email!", "success");
                            $("#newInstructorModal").modal('hide');
                        });
                    }
                    else {
                        swal("Cancelled", "", "error");
                    }
                });
        }
}

// function doneInst() {
//     var un = $("#newInstUsername").val();
//     var pw = $("#newInstPassword").val();
//     var cpw = $("#newInstConfPassword").val();
//     if (un == "" || un.length == 0 || un == null
//         || pw == "" || pw.length == 0 || pw == null
//         || cpw == "" || cpw.length == 0 || cpw == null) {
//         swal("Oops!", "Please fill out all required fields.", "error");
//     }
//     else {
//         nextInst();
//         if (pw == cpw) {
//             swal({
//                 title: "Warning!",
//                 text: "Are you sure you want to create this instructor account?",
//                 type: "warning",
//                 showCancelButton: true,
//                 confirmButtonColor: "#DD6B55",
//                 confirmButtonText: "Yes",
//                 cancelButtonText: "Cancel",
//                 closeOnConfirm: false,
//                 closeOnCancel: false
//             },
//                 function (isConfirm) {
//                     if (isConfirm) {
//                         inst.registrationDetail["credential"] = {
//                             username: un,
//                             password: pw,
//                             usertype: 2,
//                         },
//                         inst.register(function(err, done){
//                             if(err){
//                                 console.error(err);
//                                 swal("Failed!", err.message, "error");                                
//                                 return 
//                             }
//                             swal("Success!", "Instructor account has been created!", "success");
//                             $("#newInstructorModal").modal('hide');
//                         });
//                         //DB: Adding of new instructor here
//                     }
//                     else {
//                         swal("Cancelled", "", "error");
//                     }
//                 });
//         }
//         else {
//             swal("Oops!", "Passwords do not match.", "error");
//         }
//     }
// }

function resetSettingsInst (){
    $("#editInstAccFN").prop("disabled", true);
    $("#editInstAccMN").prop("disabled", true);
    $("#editInstAccLN").prop("disabled", true);
    $("#editInstAccBday").prop("disabled", true);
    $("#editInstAccAdd").prop("disabled", true);
    $("#editInstAccPhone").prop("disabled", true);
    $("#editInstAccEmail").prop("disabled", true);
    $("#editInstAccUN").prop("disabled", true);
    $("#editInstAccPW").prop("disabled", true);
    $("#editInstAccCPW").prop("disabled", true);
    $("#editInstAccEduc").prop("disabled", true);
    $("#editInstAccSex").prop("disabled", true);
    $("#editInstLicense").attr("disabled","true");
    $('.btnCancUpdInst').hide();
    $('.btnResetUpdInst').hide();
    $('.btnSaveUpdInst').hide();
}

function enableFields (){
    $("#editInstAccFN").removeAttr("disabled");
    $("#editInstAccMN").removeAttr("disabled");
    $("#editInstAccLN").removeAttr("disabled");
    $("#editInstAccBday").removeAttr("disabled");
    $("#editInstAccAdd").removeAttr("disabled");
    $("#editInstAccPhone").removeAttr("disabled");
    $("#editInstAccEmail").removeAttr("disabled");
    $("#editInstAccUN").removeAttr("disabled");
    $("#editInstAccPW").removeAttr("disabled");
    $("#editInstAccCPW").removeAttr("disabled");
    $("#editInstAccEduc").removeAttr("disabled");
    $("#editInstAccSex").removeAttr("disabled");
    $("#editInstLicense").removeAttr("disabled");
}

function updateInst (){
    enableFields();
    $('.btnDelInstAcc').hide();
    $('.btnUpdateInstAcc').hide();
    $('.btnCancUpdInst').show();
    $('.btnResetUpdInst').show();
    $('.btnSaveUpdInst').show();
}

function resetUpdInst(){
    //reset fields here
    renderInstEdit();
}

function cancUpdInst(){
    swal({
        title: "Cancel and discard changes?",
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
            swal("Cancelled", "", "error");
            resetSettingsInst();
            resetUpdInst();
        }
        else {
            // swal("Cancelled", "", "error");
        }
    });
}

function saveUpdInst(){
    var a, b, c, d, e, f, g; //for checking lang to
    var fn = $("#editInstAccFN").val();
    var mn = $("#editInstAccMN").val();
    var sn = $("#editInstAccLN").val();
    var bday = $("#editInstAccBday").val();
    var add = $("#editInstAccAdd").val();
    var phone = $("#editInstAccPhone").val();
    var email = $("#editInstAccEmail").val();
    var educ = $('#editInstAccEduc').val();
    var sex = $('input[name="editInstAccSex"]:checked').val();
    var un = $("#editInstAccUN").val();
    var pw = $("#editInstAccPW").val();
    var cpw = $("#editInstAccCPW").val();
    var lic = $("#editInstLicense").val();

    a = fn.replace(/\s+/g, '');
    b = sn.replace(/\s+/g, '');
    c = add.replace(/\s+/g, '');
    d = phone.replace(/\s+/g, '');
    e = un.replace(/\s+/g, '');
    f = pw.replace(/\s+/g, '');
    g = cpw.replace(/\s+/g, '');

    if (a=="" || b=="" || c=="" 
        || d=="" || bday==""){
            swal("Oops!", "Please fill out all required fields.", "error");
        }
        else{
            if (e=="" && f=="" && g==""){
                swal({
                    title: "Warning!",
                    text: "Are you sure you want to save these changes?",
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
                        swal("Success!", "Instructor account is updated successfully!", "success");
                        var data = {
                            fullname: fn + "_" + mn + "_" + sn,
                            address: add,
                            telno: phone,
                            bdate: bday,
                            sex: sex,
                            email: email,
                            education: educ,
                            username: un,
                            password: pw, 
                            license: lic,
                        };
                        inst.update(data, function(err, done){
                            if(err){
                                swal("Failed!", err.message, "error");                
                            }else{
                                swal("Success!", "Instructor account is updated successfully!", "success");
                                resetSettingsInst();
                            }
                        });
                        //DB: Update instructor account function
                    }
                });
            }
            else{
                if (f!="" && g!=""){
                    if (pw==cpw){
                        swal({
                            title: "Warning!",
                            text: "Are you sure you want to save these changes?",
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
                                swal("Success!", "Instructor account is updated successfully!", "success");
                                var data = {
                                    fullname: fn + "_" + mn + "_" + sn,
                                    address: add,
                                    telno: phone,
                                    bdate: bday,
                                    sex: sex,
                                    email: email,
                                    education: educ,
                                    username: un,
                                    password: pw, 
                                };
                                inst.update(data, function(err, done){
                                    if(err){
                                        swal("Failed!", err.message, "error");                
                                    }else{
                                        swal("Success!", "Instructor account is updated successfully!", "success");
                                        resetSettingsInst();
                                    }
                                });
                                //DB: Update instructor account function
                            }
                        });
                    }
                    else{
                        swal("Oops!", "Passwords do not match!", "error");
                    }
                }
                else if (f=="" && g==""){
                    swal({
                        title: "Warning!",
                        text: "Are you sure you want to save these changes?",
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
                            swal("Success!", "Instructor account is updated successfully!", "success");
                            var data = {
                                fullname: fn + "_" + mn + "_" + sn,
                                address: add,
                                telno: phone,
                                bdate: bday,
                                sex: sex,
                                email: email,
                                education: educ,
                                username: un,
                                password: pw, 
                                license: lic,
                            };
                            inst.update(data, function(err, done){
                                if(err){
                                    swal("Failed!", err.message, "error");                
                                }else{
                                    swal("Success!", "Instructor account is updated successfully!", "success");
                                    resetSettingsInst();
                                }
                            });
                            //DB: Update instructor account function
                        }
                    });
                }
                else{
                    swal("Oops!", "Please fill out all required fields.", "error");
                }
            }
        }

    // else{
    //     //SD: VALIDATIONS!!!! please pafilter mabuti ng mga data,
    //     fn = $("#editInstAccFN").val();
    //     mn = $("#editInstAccMN").val();
    //     sn = $("#editInstAccLN").val();
    //     bday = $("#editInstAccBday").val();
    //     add = $("#editInstAccAdd").val();
    //     phone = $("#editInstAccPhone").val();
    //     email = $("#editInstAccEmail").val();
    //     educ = $('#editInstAccEduc').val();
    //     sex = $('#editInstAccSex').val();
    //     un = $("#editInstAccUN").val();

    //     var data = {
    //         fullname: fn + "_" + mn + "_" + sn,
    //         address: add,
    //         telno: phone,
    //         bdate: bday,
    //         sex: sex,
    //         email: email,
    //         education: educ,
    //         username: un,
    //         password: pw, 
    //     };
    //     inst.update(data, function(err, done){
    //         if(err){
    //             swal("Failed!", err.message, "error");                
    //         }else{
    //             swal("Success!", "Instructor account is updated successfully!", "success");
    //             resetSettingsInst();
    //         }
    //     });
    //     //DB: Update instructor account function
    // }
}

function resignInst(){
    var resDate = Date.parse($('#instResign').val());
    inst.getLocalData(function(data){
        var register = Date.parse(data.dateRegistered);
        if(resDate.toString("yyyy-MM-dd") == register.toString("yyyy-MM-dd") || register.addDays(1).toString("yyyy-MM-dd") == resDate.toString("yyyy-MM-dd")){
            swal("Oops!", "Instructor cannot be resigned.", "error");            
        }else{
            if (resDate=="" || resDate.length==0 ||resDate==null){
                swal("Oops!", "Please enter the resignation date.", "error");
            }else{
                inst.delete(resDate.toString("yyyy-MM-dd"),function(err, done){
                    if(err){
                        swal("Failed!", err.message, "error");                
                    }else{
                        swal("Success!", "Instructor accout has been removed.", "success");
                        $('#confResignModal').modal('hide');
                        $('.divResigned').show();
                        $('.instDateResigned').html(Date.parse(resDate).toString("MMM d, yyyy")); //babaguhin ko pa format nito to MM-DD-YYYY (ex: May 19, 2018)                
                    }
                });
                //DB: Delete/Resign function here then go back to instructor list
                //DB: As of now, idagdag mo pa rin sya sa table pero dapat sa dulo sya malalagay tas yung status nya: Resigned
                //DB: Iniisip ko pa kasi kung gagawan ko pa sya ng bagong table, sabi kasi ni sir wag na.
                //DB: Tsaka yung sa view profile ng resigned, dapat iba na laman. Wala na dapat sched, pero may evaluation pa rin.
                //Wala na rin dapat settings. Or activate account? Basta. Wag mo muna intindihin yun.
            }
        }
    });
}

// --------------------
var renderInstTablePage = function (data) {
    var html = "";
    var counter = 1;
    if (data.length!=0){
        $('.noInstTr').hide();
        $('.noInstDetTr').hide();
        $('.hrInst').hide();
        $('.hasInstDet').show();
        $('.tblInstructor').show();
        data.forEach(element => {
            var status = (element.vacant == Date.parse("today").toString('dddd') ? "<span class='text-danger'>Day Off</span>" : element.status == 1 ? "<span class='text-success'>Available</span>" : element.status == 2 ? "<span class='text-warning'>In session</span>" : "<span class='text-danger'>Resigned</span>");
            html += "<tr onclick='viewInstProfile(\""+ element.instID +"\")'>";
            html += "<td>" + counter + "</td>";
            html += "<td>" + (element.fullname.replace(/_/g," ")) + "</td>";
            html += "<td>" + status + "</td>";
            html += "</tr>";
            counter++;
        });
        $('#instructorTable').html(html); 
    }else{
        $('.hasInstDet').hide();
        $('.tblInstructor').hide();
        $('.noInstTr').show();
        $('.noInstDetTr').show();
        $('.hrInst').show();
    }
}

var viewInstProfile = function(id){
    inst.selected = id;
    renderInstEdit();
    inst.getLocalData(function(profile){
        try {
            instID = profile.instID;
            $('.instNum').html(profile.instID);
            $('.instName').html(profile.fullname.replace(/_/g,' '));
            $('.instAddress').html(profile.address);
            $('.instPhone').html(profile.telno);
            $('.instEmail').html(profile.email);
            $('.instLicense').html(profile.license);
            $('.instDateHired').html(Date.parse(profile.dateRegistered).toString("MMM d, yyyy"));
            profile.data = typeof profile.data == "string" ? JSON.parse(profile.data) : profile.data;
            $('.studPic').attr('src',profile.data.avatar || "assets/images/user-medium.png");
            if(profile.dateRetired != null){
                $('.instDateResigned').html(Date.parse(profile.dateRetired).toString("MMM d, yyyy"));
                $('.divResigned').show();
                // $('.btnDelInstAcc').attr("disabled", true);
                $(".btnDelInstAcc").hide();
                $(".btnUpdateInstAcc").hide();
            }else{
                $('.divResigned').hide();         
                // $('.btnDelInstAcc').attr("disabled", false);
                $(".btnDelInstAcc").show();
                $(".btnUpdateInstAcc").show();
            }
        } catch (error) {
            console.error(error);
        }
    });
}

var renderInstEdit = function(){
    inst.getLocalData(function(profile){
        var name = profile.fullname.split("_");
        $('#editInstAccFN').val(name[0]);        
        $('#editInstAccMN').val(name[1]);        
        $('#editInstAccLN').val(name[2]); 
        $('input[name="editInstAccSex"]').removeAttr('checked');       
        $('input[name="editInstAccSex"][value="'+ profile.sex +'"]').attr('checked', 'checked');
        $('#editInstAccBday').val(Date.parse(profile.birthdate).toString("yyyy-MM-dd"));        
        $('#editInstAccPhone').val(profile.telno);            
        $('#editInstAccEmail').val(profile.email);            
        $('#editInstAccAdd').val(profile.address);            
        $('#editInstAccEduc').val(profile.educAttain);   
        $('#editInstAccUN').val(profile.username);   
        $("#editInstLicense").val(profile.license);         
    });
}