$(document).ready(function(){
	var formInputs = $('input[type="text"],input[type="password"]');
	formInputs.focus(function() {
       $(this).parent().children('p.formLabel').addClass('formTop');
       $('div#formWrapper').addClass('darken-bg');
       $('div.logo').addClass('logo-active');
	});
	formInputs.focusout(function() {
		if ($.trim($(this).val()).length == 0){
		$(this).parent().children('p.formLabel').removeClass('formTop');
		}
		$('div#formWrapper').removeClass('darken-bg');
		$('div.logo').removeClass('logo-active');
	});
	$('p.formLabel').click(function(){
		 $(this).parent().children('.form-style').focus();
	});
});

/* function login(){
	var cred = $('#credential').serializeArray();
	alert(JSON.stringify(cred));
} */

$('#credential').submit(function(e){
	e.preventDefault();
	$.post('/admin', $('#credential').serialize(),function(data, status){
		if(data[0] == 2){
			location.reload();
		}else if(data[0] == 0){
			//alert(data[1]);
			swal("Oops!", "Invalid username or password.", "error");
			document.getElementById('username').value = "";
			document.getElementById('password').value = "";
		}
	});
});