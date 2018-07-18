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
    $("#announcements").hide();
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
    $("#announcements").hide();
    $("#login").hide();
    $("#homeCls").show();
}

var servicesClick = function(a) 
{
    if (a==1){
        serv1Click();
    }else if(a==2){
        serv2Click();
    }
    else if(a==3){
        serv3Click();
    }
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
    $("#announcements").hide();
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
    $("#announcements").hide();
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
    $("#announcements").hide();
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
    $("#announcements").hide();
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
    $("#announcements").hide();
    $("#tips").show();
}

var loginClick = function() 
{
    gobackLogin();
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
    $("#announcements").hide();
    $("#login").show();
}

var coursesClick = function(a) 
{
    if (a==1){
        crs1Click();
    }else if(a==2){
        crs2Click();
    }
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
    $("#announcements").hide();
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
    $('.divPickup').hide();
    $('#specialCrs').prop('checked', false);
    $("#announcements").hide();
    $("#cart").show();
}

var enrollmentClick = function(a) 
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
    $("#announcements").hide();
    $("#enrollment").show();

    if (a==1){
        $('.pr1').hide();
        $('.pr3').hide();
        $('.pr4').hide();
        $('.pr2').hide();
        $('.pr2A').show();
        $('.btnsNoAcc').hide();
        $('.btnsHasAcc').show();
    }
    else if(a==2){
        $('.pr2A').hide();
        $('.pr2').hide();
        $('.pr3').hide();
        $('.pr4').hide();
        $('.pr1').show();
        $('.btnsHasAcc').hide();
        $('.btnsNoAcc').show();
    }
}

var announceClick = function() 
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
    $("#service").hide();
    $("#announcements").show();
}