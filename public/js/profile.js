function openDropzone(){
    $('#uploadProfileModal').modal("show");
}

dropzone.options.profileDrop = {
    init: function(){
        this.on("queuecomplete", function(file){
            setTimeout(function() {location.reload();
            });
        });
    }
};

function resetAdmin1P(){
    $(".btnUpdateAdminAcc1").show();
    $(".btnDeactAdminAcc").show();
    $(".btnSaveUpdAdmin1").hide();
    $(".btnResetUpdAdmin1").hide();
    $(".btnCancUpdAdmin1").hide();
}

function showbtnsP1(){
    $(".btnUpdateAdminAcc1").hide();
    $(".btnDeactAdminAcc").hide();
    $(".btnSaveUpdAdmin1").show();
    $(".btnResetUpdAdmin1").show();
    $(".btnCancUpdAdmin1").show();
}


function resetSettingsAdmin (){
    $("#editAdminAccFN").prop("disabled", true);
    $("#editAdminAccMN").prop("disabled", true);
    $("#editAdminAccSN").prop("disabled", true);
    $("#editAdminAccBday").prop("disabled", true);
    $("#editAdminAccBplace").prop("disabled", true);
    $("#editAdminAccAdd").prop("disabled", true);
    $("#editAdminAccOcc").prop("disabled", true);
    $("#editAdminAccCont").prop("disabled", true);
    $("#editAdminAccEmail").prop("disabled", true);
    $("#editAdminAccUN").prop("disabled", true);
    $("#editAdminAccPW").prop("disabled", true);
    $("#editAdminAccCPW").prop("disabled", true);
    $("#editAdminAccCivStatus").prop("disabled", true);
    $("#editEnrSex1").prop("disabled", true);
    $("#editEnrSex2").prop("disabled", true);
    resetAdmin1P();
}

function updateAdmin1 (){
    $("#editAdminAccFN").removeAttr("disabled");
    $("#editAdminAccMN").removeAttr("disabled");
    $("#editAdminAccSN").removeAttr("disabled");
    $("#editAdminAccBday").removeAttr("disabled");
    $("#editAdminAccBplace").removeAttr("disabled");
    $("#editAdminAccAdd").removeAttr("disabled");
    $("#editAdminAccOcc").removeAttr("disabled");
    $("#editAdminAccCont").removeAttr("disabled");
    $("#editAdminAccEmail").removeAttr("disabled");
    $("#editAdminAccUN").removeAttr("disabled");
    $("#editAdminAccPW").removeAttr("disabled");
    $("#editAdminAccCPW").removeAttr("disabled");
    $("#editAdminAccCivStatus").removeAttr("disabled");
    $("#editEnrSex1").removeAttr("disabled");
    $("#editEnrSex2").removeAttr("disabled");
    showbtnsP1();
}

function resetUpdAdmin1(){
    //reset fields here
}

function cancUpdAdmin1(){
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
            resetSettingsAdmin();
            resetUpdAdmin1();
        }
    });
}

function saveUpdAdmin1(){
    var a, b, c, d, e, f, g, h, i ,j;  //for checking lang to
    var fn = $("#editAdminAccFN").val();
    var mn = $("#editAdminAccMN").val();
    var sn = $("#editAdminAccSN").val();
    var bday = $("#editAdminAccBday").val();
    var bplace = $("#editAdminAccBplace").val();
    var add = $("#editAdminAccAdd").val();
    var sex = $('input[name="editAdminAccSex"]:checked').val();
    var cont = $("#editAdminAccCont").val();
    var un = $("#editAdminAccUN").val();
    var pw = $("#editAdminAccPW").val();
    var civ = $('select[name="editAdminAccCivStatus"]').val();
    var email = $('#editAdminAccEmail').val();

    a = fn.replace(/\s+/g, '');
    b = sn.replace(/\s+/g, '');
    c = bplace.replace(/\s+/g, '');
    d = add.replace(/\s+/g, '');
    e = cont.replace(/\s+/g, '');
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
                resetSettingsAdmin();
                //DB: Update Admin account function
            }
        });
    }
}

function deactAdmin(){
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
            Admin.delete(function(err){
                if(err){
                    swal("Failed!", err.message, "error");
                }else{
                    swal("Success!", "Admin account is now deativated.", "success");
                    resetSettingsAdmin();
                    //DB: Deactivate/delete Admin account function
                }
            });
        }
    });
}