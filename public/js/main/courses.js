$(function(){
    $('#crsActive1').addClass("crsActive");
    $('#crsActive2').removeClass("crsActive");

    $(".toKnowCrs1").show();
    $(".toKnowCrs2").hide();
    Number.prototype.formatMoney = function(c, d, t){
        var n = this, 
        c = isNaN(c = Math.abs(c)) ? 2 : c, 
        d = d == undefined ? "." : d, 
        t = t == undefined ? "," : t, 
        s = n < 0 ? "-" : "", 
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
        j = (j = i.length) > 3 ? j % 3 : 0;
       return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };
    cart.loadCart();
    branch.getData();
    lesson.getData();
    crs1Click();
});

function crs1Click (){
    $('#crsActive1').addClass("crsActive");
    $('#crsActive2').removeClass("crsActive");
    $(".toKnowCrs1").show();
    $(".toKnowCrs2").hide();
    $('#crs2').hide();
    $('#crs1').show();
    renderCourse(0);
}
function crs2Click (){
    $('#crsActive2').addClass("crsActive");
    $('#crsActive1').removeClass("crsActive");
    $(".toKnowCrs1").hide();
    $(".toKnowCrs2").show();
    $('#crs1').hide();
    $('#crs2').show();
    renderCourse(1);
}

var renderCourse = function(type){
    //$('.loader').show();
    $('.preloader').fadeIn();
    course.selectedType = type;
    course.getData(function(err){
        if(err) return console.error(err);
        //$('.loader').fadeOut();
        $('.preloader').fadeOut();
    });
}