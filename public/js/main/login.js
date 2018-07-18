$(function() {    
    gobackLogin();
});

var logStud = function() 
{
    clrFields();
    $('.limiter1').hide();
    $('.limiter2').show();
    $('.h5inst').hide();
    $('.h5stud').show();
}

var logInst = function() 
{
    clrFields();
    $('.limiter1').hide();
    $('.limiter2').show();
    $('.h5stud').hide();
    $('.h5inst').show();
}
var gobackLogin = function(){
    clrFields();
    $('.limiter1').hide();
    $('.limiter2').hide();
}
var clrFields = function(){
    $('#usernameTxt').val("");
    $('#passwordTxt').val("");
}