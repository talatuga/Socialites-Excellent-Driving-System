// $(document).ready(function(){
//     var x = $(window).height(); 
//     $(".unix-login").height(x);
//     $("#main-wrapper").height(x);

//     var login = function(){
//         var username = $('#username').val();
//         var password = $('#password').val();

//         if (username == "" || username.length == 0 || username == null
//             || password == "" || password.length == 0 || password == null) {
// 				swal("Oops!", "Please fill out all required fields.", "error");
//             }
//         else {
//             $.post('/admin', {user: username, pass: password}, function(data){
//                 if(data.success == false) 
//                 {
//                     swal("Oops!", "Invalid username or password!", "error");
//                     return console.log("Failed");
//                 }
//                 else
//                 {
//                     successLogin();
//                     // swal("Success!", "You are now logged in as an administrator!", "success");
//                     //setTimeout (successLogin, 3000);
//                 }
//             });
//         }
//     }

//     $('#btnLogin').on('click', function(e){
//         e.preventDefault();
//         login();
//     });

//     $('#login').on('submit', function(e){
//         e.preventDefault();
//         login();        
//     });
// });


// function successLogin () 
// {
// 	 window.location = "/admin";
// }

(function ($) {
    "use strict";
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(e){
        e.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        if (check==true){
            $.post('/admin', {user: username, pass: password}, function(data){
                if(data.success == false){
                    swal("Oops!", "Invalid username or password!", "error");
                    return console.log("Failed");
                }
                else{
                    successLogin();
                }
            });
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
    
    function successLogin () 
    {
    	 window.location = "/admin";
    }

})(jQuery);
