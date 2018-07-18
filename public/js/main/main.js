"use strict";
jQuery(document).ready(function ($) {

    $("#enroll").hide();
    $('#signupNL').click(function(){
        var email = $("#emailNL").val();
        if (email=="" || email==null || email.length==0){
            swal("Oops!", "Please enter your email address first.", "error");
        }else if(!isEmail(email)){
            swal("Oops!", "Please enter a valid email address.", "error");
        }else{
            swal("Yeey!", "Thanks for subscribing! You will now receive announcements, random driving tips and tutorials, news and many more!", "success");
            $("#emailNL").val("");
        }
    });
    
    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    $(window).load(function () {
        $(".loaded").fadeOut();
        $(".preloader").delay(1000).fadeOut("slow");
    });
    /*---------------------------------------------*
     * Mobile menu
     ---------------------------------------------*/
    $('.navbar-collapse').find('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - 40)
                }, 1000);
                if ($('.navbar-toggle').css('display') != 'none') {
                    $(this).parents('.container').find(".navbar-toggle").trigger("click");
                }
                return false;
            }
        }
    });


// slick slider active 
    $(".main_home_slider").slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow:"<i class='fa fa-angle-left nextprevleft'></i>",
        nextArrow:"<i class='fa fa-angle-right nextprevright'></i>"
    });

//    $(".study_slider").slick({
//        dots: true,
//        slidesToShow: 1,
//        slidesToScroll: 1
//    });
    $(".study_slider").slick({
        dots: true,
        arrows:false,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    /*---------------------------------------------*
     * STICKY scroll
     ---------------------------------------------*/

    $("").localScroll();

    /*---------------------------------------------*
     * WOW
     ---------------------------------------------*/

    var wow = new WOW({
        mobile: false // trigger animations on mobile devices (default is true)
    });
    wow.init();


// magnificPopup

    $('.portfolio-img').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

//---------------------------------------------
// Counter 
//---------------------------------------------

    $('.statistic-counter').counterUp({
        delay: 10,
        time: 2000
    });

// main-menu-scroll

    jQuery(window).scroll(function () {
        var top = jQuery(document).scrollTop();
        var height = 200;
        //alert(batas);

        // if ($("#main_menu").hasClass("menu-scroll")){
        //     console.log("Menu Scrolled");
        // }
        // else{
            if (top > height) {
                jQuery('.navbar-fixed-top').addClass('menu-scroll');
            } else {
                jQuery('.navbar-fixed-top').removeClass('menu-scroll');
            }
        // }
    });

// scroll Up

    $(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            $('.scrollup').fadeIn('slow');
        } else {
            $('.scrollup').fadeOut('slow');
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({scrollTop: 0}, 1000);
        return false;
    });


// scrool Down
    $('.scrooldown a').bind('click', function () {
        $('html , body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top - 160
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });



// Portfoliowork init
    jQuery('#portfoliowork').mixItUp({
        selectors: {
            target: '.tile',
            filter: '.filter'
                    //           sort: '.sort-btn'
        },
        animation: {
            animateResizeContainer: false,
            effects: 'fade scale'
        }

    });

// dropdown menu
    $('.dropdown-menu').click(function (e) {
        e.stopPropagation();
    });

    //End

});



$(document).on("scroll", function () {
    if ($(document).scrollTop() > 120) {
        $("nav").addClass("small");
    } else {
        $("nav").removeClass("small");
    }
});