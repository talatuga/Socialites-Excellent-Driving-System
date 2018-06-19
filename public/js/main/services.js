$(function(){
    serv1Click();
});

function serv1Click (){
    $(".toKnow1").show();
    $(".toKnow2").hide();
    $(".toKnow3").hide();
}
function serv2Click (){
    $(".toKnow1").hide();
    $(".toKnow2").show();
    $(".toKnow3").hide();
}
function serv3Click (){
    $(".toKnow1").hide();
    $(".toKnow2").hide();
    $(".toKnow3").show();
}