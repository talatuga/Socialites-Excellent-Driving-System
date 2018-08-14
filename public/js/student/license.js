function applyLicense(){
    $('#priceLicToApply').val("");
    $('#licenseApplyModal').modal('show');
}

function doneApplyLicense(){
    swal({
        title: "Are you sure?",
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
            swal("Success!", "This request is now added to list of licenses to be processed!" ,"success");
            $('#licenseApplyModal').modal('hide');
        }
    });
}