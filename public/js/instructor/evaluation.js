$(function (){
    var yearnow = (new Date()).getFullYear();
    var monthnow = (new Date()).getUTCMonth();
    $(".selectFromEval").val(monthnow+1);

    switch (monthnow+1){
        case 1: 
            monthnow = "(January)";
            break;
        case 2: 
            monthnow = "(February)";
            break;
        case 3: 
            monthnow = "(March)";
            break;
        case 4: 
            monthnow = "(April)";
            break;
        case 5: 
            monthnow = "(May)";
            break;
        case 6: 
            monthnow = "(June)";
            break;
        case 7: 
            monthnow = "(July)";
            break;
        case 8: 
            monthnow = "(August)";
            break;
        case 9: 
            monthnow = "(September)";
            break;
        case 10: 
            monthnow = "(October)";
            break;
        case 11: 
            monthnow = "(November)";
            break;
        case 12: 
            monthnow = "(December)";
            break;
    }
    $('.yearEval').html(yearnow);
    $('.monthEval').html(monthnow);
});

function goEvalSearch(){

}