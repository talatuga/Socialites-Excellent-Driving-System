$(function() {    
    gobackLogin();
    if($('.loginStudent').length){
        loginClick();
        logStud();
    };
    if($('.loginInst').length){
        loginClick();
        logInst();
    };
});

$('.input100').bind("cut copy paste", function(e){
    e.preventDefault();
});

var logStud = function() 
{
    $('.socialitesLogin').attr('action','/student');
    clrFields();
    $('.limiter1').hide();
    $('.limiter2').show();
    $('.h5inst').hide();
    $('.h5stud').show();
}

var logInst = function() 
{
    $('.socialitesLogin').attr('action','/instructor');
    clrFields();
    $('.limiter1').hide();
    $('.limiter2').show();
    $('.h5stud').hide();
    $('.h5inst').show();
}
var gobackLogin = function(){
    clrFields();
    $('.limiter1').show();
    $('.limiter2').hide();
}
var clrFields = function(){
    $('#usernameTxt').val("");
    $('#passwordTxt').val("");
}