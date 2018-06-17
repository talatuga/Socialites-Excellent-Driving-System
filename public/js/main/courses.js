$(function(){
    crs1Click();
});

function crs1Click (){
    $(".toKnowCrs1").show();
    $(".toKnowCrs2").hide();
    $(".toKnowCrs3").hide();
}
function crs2Click (){
    $(".toKnowCrs1").hide();
    $(".toKnowCrs2").show();
    $(".toKnowCrs3").hide();
}
function crs3Click (){
    $(".toKnowCrs1").hide();
    $(".toKnowCrs2").hide();
    $(".toKnowCrs3").show();
}