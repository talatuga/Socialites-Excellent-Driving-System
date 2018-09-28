var yearnow, monthnow, uptomonth, uptomonth1;

function loadEvalInst(){
    yearnow = (new Date()).getFullYear();
    monthnow = (new Date()).getUTCMonth();
    uptomonth1 = monthnow;
    monthnow += 1;
    $('.selectFromEval').val(monthnow);
    $('.yrNow').html(yearnow);

    evaluation.getEvalInstPerc(function(err, data){
        if(err){
            swal("Failed!", err.message, "error");
            console.log(err);
        }else{
            $('.startEvalPerc').html("");
            var dataLen = data.length;
            if(data.length!=0){
                var html = data[0].count*20 + "%";
                $('.startEvalPerc').append(html);
            } else{
                var html = "0%";
                $('.startEvalPerc').append(html);
            }
        }
    });

    if (monthnow== (new Date()).getUTCMonth()+1){
        $('.monthEvalPerc').html("0%");
    }else{
        evaluation.getEvalInstPercMonth(function(err, data){
            if(err){
                swal("Failed!", err.message, "error");
                console.log(err);
            }else{
                $('.monthEvalPerc').html("");
                var dataLen = data.length;
                if(data.length!=0){
                    var html = data[0].count*20 + "%";
                    $('.monthEvalPerc').append(html);
                } else{
                    var html = "0%";
                    $('.monthEvalPerc').append(html);
                }
            }
        });
    }

    if (monthnow== (new Date()).getUTCMonth()+1){
        $('.noEvalYet').show();
    }else{
        evaluation.getEvalInst(function(err, data){
            if(err){
                swal("Failed!", err.message, "error");
                console.log(err);
            }else{
                $('.evalInstDiv').html("");
                var pad = "000";
                var x = 1;
                var dataLen = data.length;
                if(data.length!=0){
                    $('.noEvalYet').hide();
                    data.forEach(e => {
                        var html = "<div class='sl-item' id='1'> <div class='sl-left'> <img src='assets/images/user4.png' alt='Student' id='studEvalPic' class='img-circle' /> </div> <div class='sl-right'>";
                        html += "<div>Date Evaluated: <span class='sl-date'>" + (Date.parse(e.dateEvaluated ).toString("MMM dd, yyyy")) + "</span>";
                        html += "<br>Course Enrolled: <span class='crsStudEval'>CRS-" + e.carType.toUpperCase() + (pad.substring(0, pad.length-(e.courseID+"").length) + e.courseID) + "</span><div class='separator2'></div>";
                        html += "<p style='color: #455a64;'>Evaluation Grade: <span class='studEvalGrade'>" + e.grade + " (" + (e.grade == 5 ? '100%' : (e.grade == 4 ? '80%' : (e.grade == 3 ? '60%' : (e.grade == 2 ? '40%' : '20%')))) + ")" + "</span></p>";
                        html += "<p class='m-t-10 studEvalMsg'>\"" + e.comment + "\"</p>";
                        html += "</div></div></div><hr>";
                        x++;
                        $('.evalInstDiv').append(html);
                    });
                } else{
                    $('.noEvalYet').show();
                }
            }
        });
    }

    switch (monthnow){
        case 1: 
            monthnow = "(January)";
            uptomonth1 = 0;
            break;
        case 2: 
            uptomonth1 = 1;
            uptomonth = "January";
            monthnow = "(February)";
            break;
        case 3: 
            uptomonth1 = 2;
            uptomonth = "February";
            monthnow = "(March)";
            break;
        case 4: 
            uptomonth1 = 3;
            uptomonth = "March";
            monthnow = "(April)";
            break;
        case 5: 
            uptomonth1 = 4;
            uptomonth = "April";
            monthnow = "(May)";
            break;
        case 6: 
            uptomonth1 = 5;
            uptomonth = "May";
            monthnow = "(June)";
            break;
        case 7: 
            uptomonth1 = 6;
            uptomonth = "June";
            monthnow = "(July)";
            break;
        case 8: 
            uptomonth1 = 7;
            uptomonth = "July";
            monthnow = "(August)";
            break;
        case 9: 
            uptomonth1 = 8;
            uptomonth = "August";
            monthnow = "(September)";
            break;
        case 10: 
            uptomonth1 = 9;
            uptomonth = "September";
            monthnow = "(October)";
            break;
        case 11: 
            uptomonth1 = 10;
            uptomonth = "October";
            monthnow = "(November)";
            break;
        case 12: 
            uptomonth1 = 11;
            uptomonth = "November";
            monthnow = "(December)";
            break;
    }
    $('.uptoMonth').html(uptomonth);
    $('.yearEval').html(yearnow);
    $('.curMonth').html(monthnow);
    $('.monthEval').html(monthnow);
}

function goEvalSearch(){
    var selMonth = $('.selectFromEval').find("option:selected").text();
    monthnow = $('.selectFromEval').find("option:selected").val();
    $('.monthEval').html("(" + selMonth + ")");
    $('.curMonth').html("(" + selMonth + ")");
    $(".preloader").fadeIn(); 

    if (monthnow== (new Date()).getUTCMonth()+1){
        $('.monthEvalPerc').html("0%");
    }else{
        evaluation.getEvalInstPercMonth(function(err, data){
            if(err){
                swal("Failed!", err.message, "error");
                console.log(err);
            }else{
                $('.monthEvalPerc').html("");
                var dataLen = data.length;
                if(data.length!=0){
                    var html = data[0].count*20 + "%";
                    $('.monthEvalPerc').append(html);
                } else{
                    var html = "0%";
                    $('.monthEvalPerc').append(html);
                }
            }
        });
    }

    if (monthnow== (new Date()).getUTCMonth()+1){
        $('.noEvalYet').show();
    }else{
        evaluation.getEvalInst(function(err, data){
            if(err){
                swal("Failed!", err.message, "error");
                console.log(err);
            }else{
                $('.evalInstDiv').html("");
                var pad = "000";
                var x = 1;
                var dataLen = data.length;
                if(data.length!=0){
                    $('.noEvalYet').hide();
                    data.forEach(e => {
                        var html = "<div class='sl-item' id='1'> <div class='sl-left'> <img src='assets/images/user4.png' alt='Student' id='studEvalPic' class='img-circle' /> </div> <div class='sl-right'>";
                        html += "<div>Date Evaluated: <span class='sl-date'>" + (Date.parse(e.dateEvaluated ).toString("MMM dd, yyyy")) + "</span>";
                        html += "<br>Course Enrolled: <span class='crsStudEval'>CRS-" + e.carType.toUpperCase() + (pad.substring(0, pad.length-(e.courseID+"").length) + e.courseID) + "</span><div class='separator2'></div>";
                        html += "<p style='color: #455a64;'>Evaluation Grade: <span class='studEvalGrade'>" + e.grade + " (" + (e.grade == 5 ? '100%' : (e.grade == 4 ? '80%' : (e.grade == 3 ? '60%' : (e.grade == 2 ? '40%' : '20%')))) + ")" + "</span></p>";
                        html += "<p class='m-t-10 studEvalMsg'>\"" + e.comment + "\"</p>";
                        html += "</div></div></div><hr>";
                        x++;
                        $('.evalInstDiv').append(html);
                    });
                } else{
                    $('.noEvalYet').show();
                }
            }
        });
    }
    $(".preloader").fadeOut(); 
}