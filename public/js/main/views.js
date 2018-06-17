$(function() {    
    $("#main_menu").removeClass("menu-scroll");
    $("#service").hide();
    $("#branches").hide();
    $("#aboutus").hide();
    $("#gallery").hide();
    $("#tips").hide();
    $("#login").hide();
    $("#homeCls").show();
});

var homeClick = function() 
{
    $("#main_menu").removeClass("menu-scroll");
    $("#service").hide();
    $("#aboutus").hide();
    $("#gallery").hide();
    $("#tips").hide();
    $("#branches").hide();
    $("#homeCls").show();
}

var servicesClick = function() 
{
    $("#main_menu").addClass("menu-scroll");
    $("#homeCls").hide();
    $("#aboutus").hide();
    $("#gallery").hide();
    $("#tips").hide();
    $("#login").hide();
    $("#branches").hide();
    $("#service").show();
}

var branchesClick = function() 
{
    $("#main_menu").addClass("menu-scroll");
    $("#homeCls").hide();
    $("#service").hide();
    $("#aboutus").hide();
    $("#gallery").hide();
    $("#tips").hide();
    $("#login").hide();
    $("#branches").show();
}

var aboutusClick = function() 
{
    $("#main_menu").addClass("menu-scroll");
    $("#homeCls").hide();
    $("#service").hide();
    $("#branches").hide();
    $("#gallery").hide();
    $("#tips").hide();
    $("#login").hide();
    $("#aboutus").show();
}

var galleryClick = function() 
{
    $("#main_menu").addClass("menu-scroll");
    $("#homeCls").hide();
    $("#service").hide();
    $("#branches").hide();
    $("#aboutus").hide();
    $("#tips").hide();
    $("#login").hide();
    $("#gallery").show();
}

var tipsClick = function() 
{
    $("#main_menu").addClass("menu-scroll");
    $("#homeCls").hide();
    $("#service").hide();
    $("#branches").hide();
    $("#aboutus").hide();
    $("#gallery").hide();
    $("#login").hide();
    $("#tips").show();
}

var loginClick = function() 
{
    $("#main_menu").addClass("menu-scroll");
    $("#homeCls").hide();
    $("#service").hide();
    $("#branches").hide();
    $("#aboutus").hide();
    $("#gallery").hide();
    $("#tips").hide();
    $("#login").show();
}