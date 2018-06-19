$(function() {    
    $("#main_menu").removeClass("menu-scroll");
    $("#service").hide();
    $("#branches").hide();
    $("#aboutus").hide();
    $("#gallery").hide();
    $("#tips").hide();
    $("#login").hide();
    $("#courses").hide();
    $("#cart").hide();
    $("#enrollment").hide();
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
    $("#courses").hide();
    $("#cart").hide();
    $("#enrollment").hide();
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
    $("#courses").hide();
    $("#cart").hide();
    $("#enrollment").hide();
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
    $("#courses").hide();
    $("#cart").hide();
    $("#enrollment").hide();
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
    $("#courses").hide();
    $("#cart").hide();
    $("#enrollment").hide();
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
    $("#courses").hide();
    $("#cart").hide();
    $("#enrollment").hide();
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
    $("#courses").hide();
    $("#cart").hide();
    $("#enrollment").hide();
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
    $("#courses").hide();
    $("#cart").hide();
    $("#enrollment").hide();
    $("#login").show();
}

var coursesClick = function() 
{
    cart.checkCart();
    $("#main_menu").addClass("menu-scroll");
    $("#homeCls").hide();
    $("#service").hide();
    $("#branches").hide();
    $("#aboutus").hide();
    $("#gallery").hide();
    $("#tips").hide();
    $("#login").hide();
    $("#cart").hide();
    $("#enrollment").hide();
    $("#courses").show();
}

var cartClick = function() 
{
    course.loadAll(function(){
        cart.renderTbl();
    });
    $("#main_menu").addClass("menu-scroll");
    $("#homeCls").hide();
    $("#service").hide();
    $("#branches").hide();
    $("#aboutus").hide();
    $("#gallery").hide();
    $("#tips").hide();
    $("#login").hide();
    $("#courses").hide();
    $("#enrollment").hide();
    $("#cart").show();
}

var enrollmentClick = function() 
{
    $("#main_menu").addClass("menu-scroll");
    $("#homeCls").hide();
    $("#service").hide();
    $("#branches").hide();
    $("#aboutus").hide();
    $("#gallery").hide();
    $("#tips").hide();
    $("#login").hide();
    $("#courses").hide();
    $("#cart").hide();
    $("#enrollment").show();
}