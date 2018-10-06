var email, code, valid;
function openBankPayment(){
    $('#emailBank').val("");
    $('#codeBank').val("");
    $('#bankPaymentModal').modal('show');
}

function sendPayslip(){
    email = $('#emailBank').val();
    code = $('#codeBank').val();
    var a = validateEmail(email);

    if (email.replace(/_/g, ' ') == "" || code.replace(/_/g, ' ') == "") swal("Oops!", "Please fill out all required fields!", "error");
    else{
        if(a==1){
            $('#bankPaymentModal').modal('hide');
            $('#bankPaymentOkay').modal('show');
        }
        else swal("Oops!", "Please enter valid email.", "error");
    }
}

function validateEmail(mail) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
}
