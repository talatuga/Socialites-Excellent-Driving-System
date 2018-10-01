function openDropzoneInst(){
    $('#openDropzoneInst').modal('show');
}

dropzone.options.profileDrop = {
    init: function(){
        this.on("queuecomplete", function(file){
            setTimeout(function() {location.reload();
            });
        });
    }
};

function resetInstructor1P(){
    $(".btnUpdateInstructorAcc1").show();
    $(".btnDeactInstructorAcc").show();
    $(".btnSaveUpdInstructor1").hide();
    $(".btnResetUpdInstructor1").hide();
    $(".btnCancUpdInstructor1").hide();
}

function showbtnsP1(){
    $(".btnUpdateInstructorAcc1").hide();
    $(".btnDeactInstructorAcc").hide();
    $(".btnSaveUpdInstructor1").show();
    $(".btnResetUpdInstructor1").show();
    $(".btnCancUpdInstructor1").show();
}


function resetSettingsInstructor (){
    $("#editInstructorAccFN").prop("disabled", true);
    $("#editInstructorAccMN").prop("disabled", true);
    $("#editInstructorAccSN").prop("disabled", true);
    $("#editInstructorAccBday").prop("disabled", true);
    $("#editInstructorAccBplace").prop("disabled", true);
    $("#editInstructorAccAdd").prop("disabled", true);
    $("#editInstructorAccOcc").prop("disabled", true);
    $("#editInstructorAccCont").prop("disabled", true);
    $("#editInstructorAccEmail").prop("disabled", true);
    $("#editInstructorAccUN").prop("disabled", true);
    $("#editInstructorAccPW").prop("disabled", true);
    $("#editInstructorAccCPW").prop("disabled", true);
    $("#editInstructorAccCivStatus").prop("disabled", true);
    $("#editEnrSex1").prop("disabled", true);
    $("#editEnrSex2").prop("disabled", true);
    resetInstructor1P();
}

function updateInstructor1 (){
    $("#editInstructorAccFN").removeAttr("disabled");
    $("#editInstructorAccMN").removeAttr("disabled");
    $("#editInstructorAccSN").removeAttr("disabled");
    $("#editInstructorAccBday").removeAttr("disabled");
    $("#editInstructorAccBplace").removeAttr("disabled");
    $("#editInstructorAccAdd").removeAttr("disabled");
    $("#editInstructorAccOcc").removeAttr("disabled");
    $("#editInstructorAccCont").removeAttr("disabled");
    $("#editInstructorAccEmail").removeAttr("disabled");
    $("#editInstructorAccUN").removeAttr("disabled");
    $("#editInstructorAccPW").removeAttr("disabled");
    $("#editInstructorAccCPW").removeAttr("disabled");
    $("#editInstructorAccCivStatus").removeAttr("disabled");
    $("#editEnrSex1").removeAttr("disabled");
    $("#editEnrSex2").removeAttr("disabled");
    showbtnsP1();
}

function resetUpdInstructor1(){
    //reset fields here
}

function cancUpdInstructor1(){
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
            resetSettingsInstructor();
            resetUpdInstructor1();
        }
    });
}

function saveUpdInstructor1(){
    var a, b, c, d, e, f, g, h, i ,j;  //for checking lang to
    var fn = $("#editInstructorAccFN").val();
    var mn = $("#editInstructorAccMN").val();
    var sn = $("#editInstructorAccSN").val();
    var bday = $("#editInstructorAccBday").val();
    var bplace = $("#editInstructorAccBplace").val();
    var add = $("#editInstructorAccAdd").val();
    var sex = $('input[name="editInstructorAccSex"]:checked').val();
    var cont = $("#editInstructorAccCont").val();
    var un = $("#editInstructorAccUN").val();
    var pw = $("#editInstructorAccPW").val();
    var civ = $('select[name="editInstructorAccCivStatus"]').val();
    var email = $('#editInstructorAccEmail').val();

    a = fn.replace(/\s+/g, '');
    b = sn.replace(/\s+/g, '');
    c = bplace.replace(/\s+/g, '');
    d = add.replace(/\s+/g, '');
    e = cont.replace(/\s+/g, '');
    h = un.replace(/\s+/g, '');
    i = pw.replace(/\s+/g, '');

    if (a=="" || sn=="" || c=="" || d=="" 
        || e=="" || civ=="civ0"){
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
                resetSettingsInstructor();
                //DB: Update Instructor account function
            }
        });
    }
}

function deactInstructor(){
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
            Instructor.delete(function(err){
                if(err){
                    swal("Failed!", err.message, "error");
                }else{
                    swal("Success!", "Instructor account is now deactivated.", "success");
                    resetSettingsInstructor();
                    //DB: Deactivate/delete Instructor account function
                }
            });
        }
    });
}