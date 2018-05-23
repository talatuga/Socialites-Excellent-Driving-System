$(document).ready(function(){
    var x = $(window).height(); 
    $(".unix-login").height(x);
    $("#main-wrapper").height(x);

    var login = function(){
        var username = $('#username').val();
        var password = $('#password').val();

        if (username == "" || username.length == 0 || username == null
            || password == "" || password.length == 0 || password == null) {
				swal("Oops!", "Please fill out all required fields.", "error");
            }
        else {
            $.post('/admin', {user: username, pass: password}, function(data){
                if(data.success == false) 
                {
                    swal("Oops!", "Invalid username or password!", "error");
                    return console.log("Failed");
                }
                else
                {
                    successLogin();
                    // swal("Success!", "You are now logged in as an administrator!", "success");
                    //setTimeout (successLogin, 3000);
                }
            });
        }
    }

    $('#btnLogin').on('click', function(e){
        e.preventDefault();
        login();
    });

    $('#login').on('submit', function(e){
        e.preventDefault();
        login();        
    });
});


function successLogin () 
{
	 window.location = "/admin";
}