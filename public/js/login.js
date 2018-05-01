$(document).ready(function(){
    $('#btnLogin').on('click', function(e){
        e.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();

        if (username == "" || username.length == 0 || username == null
            || password == "" || password.length == 0 || password == null) {
				swal("Oops!", "Please fill out all required fields.", "error");
            }
        else {
            $.post('/admin', {user: username, pass: password}, function(err, data){
                if(err) 
                {
                    //alert (password);
                    swal("Oops!", "Invalid username or password!", "error");
                    return console.log("Failed");
                }
                else
                {
                    //alert ('hehe');
                    swal("Success!", "You are now logged in as an administrator!", "success");
                    setTimeout (successLogin, 3000);
                }
            });
        }
    });
});


function successLogin () 
{
	 window.location = "/admin";
}