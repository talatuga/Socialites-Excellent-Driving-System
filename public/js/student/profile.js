function openDropzoneStud(){
    $('#uploadProfileStudModal').modal('show');
}

function resetStudent1P(){
    $(".btnUpdateStudentAcc1").show();
    $(".btnDeactStudentAcc").show();
    $(".btnSaveUpdStudent1").hide();
    $(".btnResetUpdStudent1").hide();
    $(".btnCancUpdStudent1").hide();
    app.account.getInfo(function(err, data){
        if(err) return swal("Failed", err.message, "error");
        data.forEach(element => {
            var fullname = element.fullname.split("_");
            var otherData = JSON.parse(element.data);
            $('#editStudentAccFN').val(fullname[0]);
            $('#editStudentAccMN').val(fullname[1]);
            $('#editStudentAccSN').val(fullname[2]);
            $('.profileNameStud').html(element.fullname.replace(/_/g, " "));
            $('#editStudentAccBday').val(Date.parse(element.birthdate).toString("yyyy-MM-dd"));
            $('#editStudentAccBplace').val(element.birthplace);
            $('#editStudentAccAdd').val(element.address);
            $('.profileAddressStud').html(element.address);
            $('#editStudentAccCivStatus').val(element.civilStatus);
            $('#editStudentAccCont').val(element.telno);
            $('.profilePhoneStud').html(element.telno);
            $('#editStudentAccEmail').val(element.email);
            $('.profileEmailStud').html(element.email);
            $('input[name=editStudentAccSex][value='+ element.sex +']').prop('checked','checked');
            $('#editStudentAccOcc').val(otherData.occupation);
            $('#editStudAccGuard').val(otherData.guardian.name);
            $('#editStudAccGuardCont').val(otherData.guardian.telno);
            $('.profPicStud').attr('src',otherData.avatar || "assets/images/user-medium.png");
            $('.profileBranchStud').html("STUD-" + element.studID);
        });
    });
}

function showbtnsP1(){
    $(".btnUpdateStudentAcc1").hide();
    $(".btnDeactStudentAcc").hide();
    $(".btnSaveUpdStudent1").show();
    $(".btnResetUpdStudent1").show();
    $(".btnCancUpdStudent1").show();
}

function saveProfPicStud(action){
    app.account.updatePic(app.account.studentID, app.account.infoID, action == 1 ? true : false, function(err, done, path){
        if(err){
            swal("Failed!", err.message, "error");
            console.error(err);
        }else{
            swal("Done!", done, "success");
            $('.profPicStud').attr('src', path || "assets/images/user-medium.png");
            $('.userImg').attr('src', path || "assets/images/user4.png");
        }
        $('#uploadProfileStudModal').modal('hide');
    });
}

function resetSettingsStudent (){
    $("#editStudentAccFN").prop("disabled", true);
    $("#editStudentAccMN").prop("disabled", true);
    $("#editStudentAccSN").prop("disabled", true);
    $("#editStudentAccBday").prop("disabled", true);
    $("#editStudentAccBplace").prop("disabled", true);
    $("#editStudentAccAdd").prop("disabled", true);
    $("#editStudentAccOcc").prop("disabled", true);
    $("#editStudentAccCont").prop("disabled", true);
    $("#editStudentAccEmail").prop("disabled", true);
    $("#editStudentAccGuard").prop("disabled", true);
    $("#editStudentAccGuardCont").prop("disabled", true);
    $("#editStudentAccUN").prop("disabled", true);
    $("#editStudentAccPW").prop("disabled", true);
    $("#editStudentAccCPW").prop("disabled", true);
    $("#editStudentAccCivStatus").prop("disabled", true);
    $("#editEnrSex1").prop("disabled", true);
    $("#editEnrSex2").prop("disabled", true);
    resetStudent1P();
}

function updateStudent1 (){
    $("#editStudentAccFN").removeAttr("disabled");
    $("#editStudentAccMN").removeAttr("disabled");
    $("#editStudentAccSN").removeAttr("disabled");
    $("#editStudentAccBday").removeAttr("disabled");
    $("#editStudentAccBplace").removeAttr("disabled");
    $("#editStudentAccAdd").removeAttr("disabled");
    $("#editStudentAccOcc").removeAttr("disabled");
    $("#editStudentAccCont").removeAttr("disabled");
    $("#editStudentAccEmail").removeAttr("disabled");
    $("#editStudentAccGuard").removeAttr("disabled");
    $("#editStudentAccGuardCont").removeAttr("disabled");
    $("#editStudentAccUN").removeAttr("disabled");
    $("#editStudentAccPW").removeAttr("disabled");
    $("#editStudentAccCPW").removeAttr("disabled");
    $("#editStudentAccCivStatus").removeAttr("disabled");
    $("#editEnrSex1").removeAttr("disabled");
    $("#editEnrSex2").removeAttr("disabled");
    showbtnsP1();
}

function resetUpdStudent1(){
    //reset fields here
}

function cancUpdStudent1(){
    swal({
        title: "Cancel and discard changes?",
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
            resetSettingsStudent();
            resetUpdStudent1();
        }
    });
}

function saveUpdStudent1(){
    var a, b, c, d, e, f, g, h, i ,j;  //for checking lang to
    var fn = $("#editStudentAccFN").val();
    var mn = $("#editStudentAccMN").val();
    var sn = $("#editStudentAccSN").val();
    var bday = $("#editStudentAccBday").val();
    var bplace = $("#editStudentAccBplace").val();
    var add = $("#editStudentAccAdd").val();
    var sex = $('input[name="editStudentAccSex"]:checked').val();
    var cont = $("#editStudentAccCont").val();
    var guard = $("#editStudentAccGuard").val();
    var guardCont = $("#editStudentccGuardCont").val();
    var un = $("#editStudentAccUN").val();
    var pw = $("#editStudentAccPW").val();
    var civ = $('select[name="editStudentAccCivStatus"]').val();
    var email = $('#editStudentAccEmail').val();

    a = fn.replace(/\s+/g, '');
    b = sn.replace(/\s+/g, '');
    c = bplace.replace(/\s+/g, '');
    d = add.replace(/\s+/g, '');
    e = cont.replace(/\s+/g, '');
    f = guard.replace(/\s+/g, '');
    g = guardCont.replace(/\s+/g, '');
    h = un.replace(/\s+/g, '');
    i = pw.replace(/\s+/g, '');

    if (a=="" || sn=="" || c=="" || d=="" 
        || e=="" || f=="" || g=="" || civ=="civ0"){
            swal("Oops!", "Please fill out all required fields.", "error");
        }
    else if (h=="" && i==""){
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
                swal("Success!", "Changes have been saved!", "success");
                resetSettingsStudent();
                //DB: Update Student account function
            }
        });
    }
}

function deactStudent(){
    swal({
        title: "Warning!",
        text: "Are you sure you want to deactivate this account?",
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
            Student.delete(function(err){
                if(err){
                    swal("Failed!", err.message, "error");
                }else{
                    swal("Success!", "Student account is now deativated.", "success");
                    resetSettingsStudent();
                    //DB: Deactivate/delete Student account function
                }
            });
        }
    });
}