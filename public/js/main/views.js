var yearNow = (new Date()).getFullYear();

$(function() {    
    $("html, body").animate({ scrollTop: 0 }, "slow");
    homeClick();
});

var homeClick = function() 
{
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $('.yrNowWeb').html(yearNow);
    display.getTotEnrollees(function(err, data){
        if(err){
            swal("Failed!", err.message, "error");
            console.log(err);
        }else{
            if(data.length!=0){
                var x = data[0].counter;
                $('.enrolleesJan').html(x);
            }else{
                $('.enrolleesJan').html('0');
            }
        }
    });
    display.getTotStud(function(err, data){
        if(err){
            swal("Failed!", err.message, "error");
            console.log(err);
        }else{
            if(data.length!=0){
                var x = data[0].counter;
                $('.curStud').html(x);
            }else{
                $('.curStud').html('0');
            }
        }
    });
    $('.enrolleesJan').html();
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
    $("#faq").hide();
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
    $("#faq").hide();
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
    $("#faq").hide();
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
    $("#faq").hide();
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
    $("#faq").hide();
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
    $("#faq").hide();
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
    $("#faq").hide();
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
    $("#faq").hide();
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
    $("#faq").hide();
    $("#cart").show();
}

var enrollmentClick = function(a) 
{
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $("#main_menu").addClass("menu-scroll");
    $("#homeCls").hide();
    $("#service").hide();
    $("#branches").hide();
    $("#aboutus").hide();
    $("#gallery").hide();
    $("#tips").hide();
    $("#login").hide();
    $("#courses").hide();
    $("#faq").hide();
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
    $("#faq").hide();
    viewAnnouncements();
    $("#announcements").show();
}

var faqClick = function() 
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
    $("#announcements").hide();
    loadFaqLabel();
    $("#faq").show();
}