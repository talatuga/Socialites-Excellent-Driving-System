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

function licMaint(){ //when Maintenance button is clicked
    $('.viewDiv').hide();
    $('.view-licMaintenance').show();
}

$('.back').on('click', function(){ 
    $('.viewDiv').hide();
    $('.view-license').show();
});

function licAddLic(){ //when add new license/permit is clicked
    $('#newLic').val("");
    $('#newLicPrice').val("");
    $('#addLicenseModal').modal("show");
}

function addNewLic(){ //when add btn is clicked (add new license/permit modal)
    var x = $('#newLic').val();
    var y = $('#newLicPrice').val();

    if ((x==null || x=="" || x.length==0 || x.replace(/ /g, '')=="") || (y==0 || y.replace(/0/g, ' ')=="" || y=="" || y.length==0)){
        swal("Oops!", "Please fill out all required fields!" ,"error");
    }else{
        //DB: Add new license function here
        swal("Success!", "New license/permit has been succesfully added!" ,"success");
        $('#addLicenseModal').modal("hide");
    }
}

function editLicMain(){ //when edit btn is clicked in table
    $('#editLic').val("");
    $('#editLicPrice').val("");
    $('#editLicenseModal').modal("show");
}

function saveEditLic(){ //when save btn is clicked (edit license/permit modal)
    var x = $('#editLic').val();
    var y = $('#editLicPrice').val();

    if ((x==null || x=="" || x.length==0 || x.replace(/ /g, '')=="") || (y==0 || y.replace(/0/g, ' ')=="" || y=="" || y.length==0)){
        swal("Oops!", "Please fill out all required fields!" ,"error");
    }else{
        //DB: Edit license function here
        swal("Success!", "Changes have been saved!" ,"success");
        $('#editLicenseModal').modal("hide");
    }
}

function delLicMain(){ //when delete button is clicked in license maintenance table
    swal({
        title: "Are you sure?",
        text: "Delete this from permits/licenses offered in licensing assistance?",
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
            //DB: Delete license function here
            swal("Success!", "Successfully deleted from opermits/licenses offered in licensing assistance!" ,"success");
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