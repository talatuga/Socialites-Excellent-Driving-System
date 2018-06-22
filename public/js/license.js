function rejectLicReq(){
    swal({
        title: "Warning!",
        text: "Are you sure you want to reject this request?",
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
                    swal("Request has been rejected!", "" ,"success");
                }
            });
        }
    });
}

function moveInProcess(){
    $('#addPaymentModal2').modal('show');
}

function moveDone(){
    swal({
        title: "Are you sure?",
        text: "Move this to Done?",
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
                    swal("Success!", "" ,"success");
                }
            });
        }
    });
}

function checkDone(){
    swal({
        title: "Claimed?",
        // text: "Move this to Done?",
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
                    swal("Success!", "License has been claimed!" ,"success");
                }
            });
        }
    });
}

function addPaymentLic(){
    swal({
        title: "Are you sure?",
        // text: "Are you sure you want to approve this enrolment form?",
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
                    swal("Success!", "This request is now being processed!" ,"success");
                    $('#addPaymentModal2').modal('hide');
                }
            });
        }
        else{
            $('#addPaymentModal2').modal('show');  
        }
    });
}