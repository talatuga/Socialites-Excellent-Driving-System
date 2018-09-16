var yearnow, monthnow, uptomonth;

function loadEvalInst(){
    var yearnow = (new Date()).getFullYear();
    var monthnow = (new Date()).getUTCMonth();
    $('.selectFromEval').val(monthnow+1);
    $('.yrNow').html(yearnow);

    switch (monthnow+1){
        case 1: 
            monthnow = "(January)";
            break;
        case 2: 
            uptomonth = "January";
            monthnow = "(February)";
            break;
        case 3: 
            uptomonth = "February";
            monthnow = "(March)";
            break;
        case 4: 
            uptomonth = "March";
            monthnow = "(April)";
            break;
        case 5: 
            uptomonth = "April";
            monthnow = "(May)";
            break;
        case 6: 
            uptomonth = "May";
            monthnow = "(June)";
            break;
        case 7: 
            uptomonth = "June";
            monthnow = "(July)";
            break;
        case 8: 
            uptomonth = "July";
            monthnow = "(August)";
            break;
        case 9: 
            uptomonth = "August";
            monthnow = "(September)";
            break;
        case 10: 
            uptomonth = "September";
            monthnow = "(October)";
            break;
        case 11: 
            uptomonth = "October";
            monthnow = "(November)";
            break;
        case 12: 
            uptomonth = "November";
            monthnow = "(December)";
            break;
    }
    $('.uptoMonth').html(uptomonth);
    $('.yearEval').html(yearnow);
    $('.monthEval').html(monthnow);

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
                    html += "<div><a href='#' class='link' id='studEvalName'>" + e.fullname.replace(/_/g, ' ') + "</a> <span class='sl-date'>" + (Date.parse(e.dateEvaluated ).toString("MMM dd, yyyy")) + "</span>";
                    html += "<br><small class='crsStudEval'>CRS-" + e.carType.toUpperCase() + (pad.substring(0, pad.length-(e.courseID+"").length) + e.courseID) + "</small><div class='separator2'></div>";
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

function goEvalSearch(){
    var selMonth = $('.selectFromEval').find("option:selected").text();
    monthnow = $('.selectFromEval').find("option:selected").val();
    $(".preloader").fadeIn(); 
    loadEvalInst();
    $(".preloader").fadeOut(); 
}

function loadEvalSearch(){
    faq.getEvalInstPerc(function(err, data){
        if(err){
            swal("Failed!", err.message, "error");
            console.log(err);
        }else{
            $('#faqLabelSel').html("");
            var dataLen = data.length;
            if(data.length!=0){
                data.forEach(e => {
                    var html = "<option value='"+ e.id +"'>"+ e.label +"</option>";
                    $('#faqLabelSel').append(html);
                });
                var x = $('#faqLabelSel').find("option:first-child").text();
                var y = $('#faqLabelSel').find("option:first-child").val();
                selLbl = x;
                faqID = y;
                $('.faqDisplaySpan').html(x);
                loadFaqList(y, x);
            } else{
                var html = "<option>---</option>";
                $('#faqLabelSel').append(html);
            }
            $("#faqLabelSel").change(function () {
                var text1 = $(this).find("option:selected").text();
                $('.faqDisplaySpan').html(text1);
                selLbl = text1;
                faqID = this.value;
                loadFaqList(this.value, text1);
            });
        }
    });
}