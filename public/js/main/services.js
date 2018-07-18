$(function(){
    serv1Click();
});

function serv1Click (){
    $('#servActive1').addClass("crsActive");
    $('#servActive2').removeClass("crsActive");
    $('#servActive3').removeClass("crsActive");
    $(".toKnow1").show();
    $(".toKnow2").hide();
    $(".toKnow3").hide();
    $('#dtp').show();
    $('#license').hide();
    $('#lect').hide();
}
function serv2Click (){
    $('#servActive2').addClass("crsActive");
    $('#servActive1').removeClass("crsActive");
    $('#servActive3').removeClass("crsActive");
    $(".toKnow1").hide();
    $(".toKnow2").show();
    $(".toKnow3").hide();
    $('#dtp').hide();
    $('#license').show();
    $('#lect').hide();
}
function serv3Click (){
    $('#servActive3').addClass("crsActive");
    $('#servActive2').removeClass("crsActive");
    $('#servActive1').removeClass("crsActive");
    $(".toKnow1").hide();
    $(".toKnow2").hide();
    $(".toKnow3").show();
    $('#dtp').hide();
    $('#license').hide();
    $('#lect').show();
}