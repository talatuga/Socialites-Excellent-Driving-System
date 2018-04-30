$(document).ready(function(){
    $('#btnLogin').on('click', function(e){
        e.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();

        if (username == "" || username.length == 0 || username == null
            || password == "" || password.length == 0 || password == null) {
				// swal("Oops!", "Please fill out all required fields.", "error");
				alert (username);
            }
        else {
            $.post('/admin', {user: username,pass: password}, function(err, data){
                if(err) return console.log("Failed");
                swal("Success!", "You are now logged in as an administrator!", "success");
            });
            // setTimeout (successLogin, 3000);
        }
    });
});


function successLogin () 
{
	 window.location = "/admin";
}