function transferReq(){
    $('#txtBranchFrom').val("SED-Quezon City (Main)");
    $(".selTransferBranch").val($(".selTransferBranch option:first").text());
    $('#txtTransferDate').val("");
    $('#txtTransferDate').attr("min", Date.parse("today").addDays(2).toString("yyyy-MM-dd"));

    $('#transferBranchModal').modal("show");
}

function submitTransReq(){
    swal({
        title: "Warning!",
        text: "Are you sure you want to submit this transfer request?",
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
            $('#transferBranchModal').modal('hide');
            swal("Success!", "Transfer request has been submitted to your current branch's admin. Please wait until tomorrow for the response.", "success");
            //DB: Submit transfer request
        }
    });
}