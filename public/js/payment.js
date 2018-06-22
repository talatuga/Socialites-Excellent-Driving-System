function openPayment1(){
    $('#paymentBalEnroll').val("");
    $('#addPaymentModal1').modal('show');  
}

function addPaymentBal(){
    var x = $('#paymentBalEnroll').val();
    var bal="0.00"; 
    if (x=="" || x==0 || x==0.00){
        swal("Oops!", "Please enter amount of payment.", "error");
    }
    else{
        swal({
            title: "Warning!",
            text: "Save payment record?",
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
                        swal("Payment record is saved!", "" ,"success");
                        $('#addPaymentModal1').modal('hide');
                    }
                });
            }
            else{
                $('#addPaymentModal1').modal('show');  
            }
        });
    }
}