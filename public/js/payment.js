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
                payments.amount = bal;
                payments.pay(bal, function(err, response){
                    if(err){
                        console.log(err);
                        swal('Failed!', err.message, 'error');
                    }else{
                        if(response.status == 1){
                            swal('Done!', "Balance fully paid", "success");
                        }else if(response.status == 2){
                            swal('Done!', "Balance Left: " + response.balance, "warning");
                        }else if(response.status == 0){
                            swal('Fail!', response.detail, "error");
                        }
                    }
                });
                /* preRegAssess.delete(function(err){
                    if(err){
                        swal("Failed!", err.message, "error");
                    }else{
                        swal("Payment record is saved!", "" ,"success");
                        $('#addPaymentModal1').modal('hide');
                    }
                }); */
            }
            else{
                $('#addPaymentModal1').modal('show');  
            }
        });
    }
}