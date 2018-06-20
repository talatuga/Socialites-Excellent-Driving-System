function enrollClick (){
    $('#enrollClickModal').modal('show');
}

function enroll1Click (){
    $('#usernameEnroll').val("");
    $('#passwordEnroll').val("");
    $('#enrollClickModal').modal('hide');
    $('#enrollLoginModal').modal('show');
}

function enroll2Click (){
    resetEnroll2();
    enrollmentClick(2);
    $('#enrollClickModal').modal('hide');
}

(function ($) {
    "use strict";
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(e){
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
            // $.post('/admin', {user: usernameEnroll, pass: usernameEnroll}, function(data){
            //     if(data.success == false){
            //         swal("Oops!", "Invalid username or password!", "error");
            //         return console.log("Failed");
            //     }
            //     else{
                    successLoginEnroll();
                // }
        //     }
        // );
        }
        // return check;

    });

    $('.validate-form .input100').each(function(){
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
    
    function successLoginEnroll () 
    {
        resetEnroll1();
        enrollmentClick(1);
        $("#enrollLoginModal").modal('hide');
    }

})(jQuery);
