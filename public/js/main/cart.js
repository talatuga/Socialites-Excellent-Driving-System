var a;
$(function(){
    $('input[name=specialCrs]').change(function(){
        if (this.checked){
            $('.divPickup').show();
            $('#enrPickup').val("");
            a=1;
        }
        else{
            $('.divPickup').hide();
            $('#enrPickup').val("");
            a=2;
        }
    });
});


function specialCrsChange(){
    if (this.checked){
            $('.divPickup').show();
            $('#enrPickup').val("");
            a=1;
        }
        else{
            $('.divPickup').hide();
            $('#enrPickup').val("");
            a=2;
        }
}

function enrollClick (){
    var x = $('#enrPickup').val();
    if (a==1){
        if (x == '' || x == null ){
            swal("Oops!", "Please fill out all required fields.", "error");
        }else{
            $('#enrollClickModal').modal('show');
        }
    }else{
        $('#enrollClickModal').modal('show');
    }
}

function enroll1Click (){
    account.checkAuth(function(err){
        if(err){
            $('#usernameEnroll').val("");
            $('#passwordEnroll').val("");
            $('#enrollClickModal').modal('hide');
            $('#enrollLoginModal').modal('show');
        }else{
            $('#enrollClickModal').modal('hide');
            successLoginEnroll();
        }
    });
}

function enroll2Click (){
    resetEnroll2();
    enrollmentClick(2);
    $('#enrollClickModal').modal('hide');
}

function successLoginEnroll () 
{
    resetEnroll1();
    enrollmentClick(1);
    $("#enrollLoginModal").modal('hide');
}

(function ($) {
    "use strict";
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input1 .input100');
    $('input[name=enrLes]').removeAttr('checked');

    $('.validate-form1').on('submit',function(e){
        e.preventDefault();
        var username = $('#usernameEnroll').val();
        var password = $('#usernameEnroll').val();
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        if (check==true){
            $('.loader').show();
            $('.preloader').fadeIn();
            account.signin(username,password,function(err){
                $('.loader').fadeOut();
                $('.preloader').fadeOut();
                if(err){
                    swal('Failed!', err.message, 'error');
                }else{
                    successLoginEnroll();
                }
            });
        }
    });

    $('.validate-form1 .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).val().trim() == ''){
            return false;
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

})(jQuery);
