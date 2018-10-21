var monthnow = (new Date()).getUTCMonth()+1;
var yearnow = (new Date()).getFullYear();
var switchMonth = monthnow;
var fromYrQ, fromYrS, yearFromQ, yearFromS, yearEnd=yearnow;
var freq, daily, week, month, year, monthfrom, monthto, yearfrom, yearto;
var title, title2, branch;

$(function(){
    $(".selReportFreq").change(function() {
        var freq = this.value;
        switchMonth = monthnow;
        $('.freqDiv').hide();
        loadDates();
        if (freq=="1"){
            $('.dailyDiv').show();
        }
        else if (freq=="2"){
            $('.weeklyDiv').show();
        }
        else if (freq=="3"){
            $('.monthlyDiv').show();
        }
        else if (freq=="4"){
            $('.quarterlyDiv').show();
        }
        else if (freq=="5"){
            $('.semiAnnuallyDiv').show();
        }
        else if (freq=="6"){
            $('.annuallyDiv').show();
        }
    });

    $('#selReport2').change(function(){
        var x = this.value;
        if (x=="Transferees") $('.selReportBranch2').attr('disabled', true);
        else $('.selReportBranch2').removeAttr('disabled');
    });

    $(".yearRepDate").change(function() {
        yearEnd = this.value;
    });

    $(".semiRepDate").change(function() {
        switchMonth = this.value;
        loadMonths();
        $('.selSemiMonths').html(fromS + " " + yearFromS + " - " + selMonth + " " + yearEnd);
    });

    $(".quarterlyRepDate").change(function() {
        switchMonth = this.value;
        loadMonths();
        $('.selQuartMonths').html(fromQ + " " + yearFromQ + " - " + selMonth + " " + yearEnd);
    });
});

function showReports(a){
    loadInitReport();
    loadDates();
    loadBranches();
    if (a==1) reports1();
    else if (a==2) reports2();
    else if (a==3) reports3();
    else if (a==4) reports4();
}

function loadInitReport(){
    $("#selReport1").val($("#selReport1 option:first").val());
    $("#selReport2").val($("#selReport2 option:first").val());
    $("#selReport3").val($("#selReport3 option:first").val());
    $(".selReportFreq").val($(".selReportFreq option:first").val());
    $(".selReportBranch").val($(".selReportBranch option:first").val());
    $('.selReportBranch2').removeAttr('disabled');
    $('.selReportBranch3').attr('disabled', true);

    $('.freqDiv').hide();
    $('.dailyDiv').show();
}

function loadMonths(){
    if (switchMonth==1){
        selMonth = "January";
        fromQ = "October";
        fromS = "August"; 
    }else if (switchMonth==2){
        selMonth = "February";
        fromQ = "November";
        fromS = "September";
    }else if (switchMonth==3){
        selMonth = "March";
        fromQ = "December";
        fromS = "October";
    }else if (switchMonth==4){
        selMonth = "April";
        fromQ = "January";
        fromS = "November";
    }else if (switchMonth==5){
        selMonth = "May";
        fromQ = "February";
        fromS = "December";
    }else if (switchMonth==6){
        selMonth = "June";
        fromQ = "March";
        fromS = "January";
    }else if (switchMonth==7){
        selMonth = "July";
        fromQ = "April";
        fromS = "February";
    }else if (switchMonth==8){
        selMonth = "August";
        fromQ = "May";
        fromS = "March";
    }else if (switchMonth==9){
        selMonth = "September";
        fromQ = "June";
        fromS = "April";
    }else if (switchMonth==10){
        selMonth = "October";
        fromQ = "July";
        fromS = "May";
    }else if (switchMonth==11){
        selMonth = "November";
        fromQ = "August";
        fromS = "June";
    }else if (switchMonth==12){
        selMonth = "December";
        fromQ = "September";
        fromS = "July";
    }
    fromYrQ = switchMonth - 3;
    fromYrS = switchMonth - 5;
    if (fromYrQ<=0){
        yearFromQ = yearEnd - 1;
    }else{
        yearFromQ = yearEnd;
    }

    if (fromYrS<=0){
        yearFromS = yearEnd - 1;
    }else{
        yearFromS = yearEnd;
    }

}

function loadDates(){
    loadMonths();

    //Daily
    $('.dailyRepDate').attr("max", Date.parse("today").toString("yyyy-MM-dd"));

    //Weekly
    function getWeekNumber(d) {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
        return [d.getUTCFullYear(), weekNo];
    }
    var result = getWeekNumber(new Date());
    week = result[1];
    var weekNum = result[0] + "-W" +  result[1];
    $('.weeklyRepDate').attr("max", weekNum);

    //Monthly
    $(".monthlyRepDate").val(monthnow);

    //Quarterly
    $(".quarterlyRepDate").val(monthnow);
    $('.selQuartMonths').html(fromQ + " " + yearFromQ + " - " + selMonth + " " + yearEnd);

    //SemiAnnually
    $(".semiRepDate").val(monthnow);
    $('.selSemiMonths').html(fromS + " " + yearFromS + " - " + selMonth + " " + yearEnd);

    //Annually
    $(".yearRepDate").val($(".yearRepDate option:first").val());
    yearEnd = $(".yearRepDate").val();
}

function loadBranches(){
    report.getBranchList(function(err, data){
        if(err){
            swal("Failed!", err.message, "error");
            console.log(err);
        }else{
            $('.selReportBranch').html("");
            var len = data.length;
            var x=0;
            if(data.length!=0){
                data.forEach(e => {
                    var html="";
                    html += "<option value='"+ e.branchID +"'>SED-"+ e.branchName +"</option>";
                    $('.selReportBranch').append(html);
                });
                $('.selReportBranch').append("<option value='allBr'>All</option>");
            }else{
                var html = "<option value='0'>---</option>";
                $('.selReportBranch').append(html);
            }
        }
    });
}

function generateReport(a){
    daily = 0, week = 0, month = 0, year = 0, monthfrom = 0, monthto = 0, yearfrom = 0, yearto = 0;

    if (a==1){
        title = "Gross Income";
        title2 = $('#selReport1').find("option:selected").val();
        freq = $('.selReportFreq1').find("option:selected").val();
        branch = $('.selReportBranch1').find("option:selected").val();

        var date;

        if (freq==1){
            daily = $('.dailyRepDate1').val();
            date = Date.parse(daily).toString("yyyy-MM-dd");
        }else if (freq==2){
            date = $('.weeklyRepDate1').val();
            // year = week.substring(0, 4);
            // week = week.substring(6, 8);
        }else if (freq==3){
            month = parseInt($(".monthlyRepDate1").val());
            year = $(".yearRepDate1").val();

            date = Date.parse((month - 1) + " month").toString('MMM');
            date += " " + year;
        }else if (freq==4){
            if (fromYrQ<=0){
                fromYrQ = 12 + fromYrQ;
            }
            monthfrom = fromYrQ;
            monthto = $(".quarterlyRepDate1").val();
            yearfrom = yearFromQ;
            yearto = $(".yearRepDate1").val();

            date = Date.parse((monthto-1) + " month").toString('MMM');
            date += " " + yearto;
        }else if (freq==5){
            if (fromYrS<=0){
                fromYrS = 12 + fromYrS;
            }
            monthfrom = fromYrS;
            monthto = $(".semiRepDate1").val();
            yearfrom = yearFromS;
            yearto = $(".yearRepDate1").val();

            date = Date.parse((monthto-1) + " month").toString('MMM');
            date += " " + yearto;
        }else if (freq==6){
            year = $(".yearRepDate1").val();
            date = year;
        }

        var link = "api/v1/report/";

        switch(title2){
            case 'Tuition/Enrollment' : {
                link += 'tuition';
                break;
            }
            case 'Certificate' : {
                link += 'certificate';
                break;
            }
            case 'Licensing Assistance' : {
                link += 'license';
                break;
            }
            case 'All' : {
                link += 'overall';
                break;
            }
        }

        link += "?";
        
        swal({
            title: "Generate Report?",
            text: title + ": " + title2,
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        }, function (conf){
            if(conf){
                link += "freq=" + freq;
                link += "&date=" + date;
                link += branch != "allBr" ? "&branch="+branch : "";
                setTimeout(function(){
                    swal('Done','','success');
                    // window.location = link;
                    window.open(link, "_blank");
                },1000)
            }
        });
    }
    
    else if (a==2){
        title = "Students";
        title2 = $('#selReport2').find("option:selected").val();
        freq = $('.selReportFreq2').find("option:selected").val();
        branch = $('.selReportBranch2').find("option:selected").val();

        if (branch==null || branch=="")branch=0;
        if (freq==1){
            daily = $('.dailyRepDate2').val();
            daily = Date.parse(daily).toString("yyyy-MM-dd");
        }else if (freq==2){
            week = $('.weeklyRepDate2').val();
            daily = week;
            year = week.substring(0, 4);
            week = week.substring(6, 8);
        }else if (freq==3){
            month = $(".monthlyRepDate2").val();
            year = $(".yearRepDate2").val();
            daily = Date.parse(month-1 + " month").toString('MMM ') + year;
        }else if (freq==4){
            if (fromYrQ<=0){
                fromYrQ = 12 + fromYrQ;
            }
            monthfrom = fromYrQ;
            monthto = $(".quarterlyRepDate2").val();
            yearfrom = yearFromQ;
            yearto = $(".yearRepDate2").val();
            daily = Date.parse(monthto - 1 + " month").toString('MMM ') + yearto;
        }else if (freq==5){
            if (fromYrS<=0){
                fromYrS = 12 + fromYrS;
            }
            monthfrom = fromYrS;
            monthto = $(".semiRepDate2").val();
            yearfrom = yearFromS;
            yearto = $(".yearRepDate2").val();
            daily = Date.parse(monthto - 1 + " month").toString('MMM ') + yearto;
        }else if (freq==6){
            year = $(".yearRepDate2").val();
            daily = year;
        }

        //swal("Downloading...", title + ": " + title2 + " report is now downloading.");

        var link = "api/v1/report/";

        switch(title2){
            case "Enrollees": {
                link += "enrollee";
                break;
            }
            case "Transferees": {
                link += "transfer";
                branch = "allBr";
                break;
            }
            case "Performance Evaluation": {
                link += "evaluation";
                break;
            }
        }

        link += "?";

        link += (branch != "allBr" ? "branch=" + branch : "");
        link += "&freq=" + freq;
        link += "&date=" + daily;

        swal({
            title: "Generate Report?",
            text: title + ": " + title2,
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        }, function (conf){
            if(conf){
                setTimeout(function(){
                    swal('Done','','success');
                    window.location = link;
                },1000)
            }
        });
        // link += "&report=" + title2;
        // link += "&week=" + week;
        // link += "&year=" + year;
        // link += "&month=" + month;
        // link += "&monthfrom=" + monthfrom;
        // link += "&monthto=" + monthto;
        // link += "&yearfrom=" + yearfrom;
        // link += "&yearto=" + yearto;

        //window.location = link;

        // report.getStud(function(err, link){
        //     if(err){
        //         swal("Failed!", err.message, "error");
        //         console.log(err.message);
        //     }else{
        //         windows.location = link;
        //     }
        // });
    }
    
    else if (a==3){
        title = "Instructors";
        title2 = $('#selReport3').find("option:selected").val();
        freq = $('.selReportFreq3').find("option:selected").val();
        branch = 0;

        if (freq==1){
            daily = $('.dailyRepDate1').val();
            date = Date.parse(daily).toString("yyyy-MM-dd");
        }else if (freq==2){
            date = $('.weeklyRepDate1').val();
            // year = week.substring(0, 4);
            // week = week.substring(6, 8);
        }else if (freq==3){
            month = $(".monthlyRepDate1").val();
            year = $(".yearRepDate1").val();

            date = Date.parse(month).toString('MMM ');
            date += " " + year;
        }else if (freq==4){
            if (fromYrQ<=0){
                fromYrQ = 12 + fromYrQ;
            }
            monthfrom = fromYrQ;
            monthto = $(".quarterlyRepDate1").val();
            yearfrom = yearFromQ;
            yearto = $(".yearRepDate1").val();

            date = Date.parse(monthto-1).toString('MMM');
            date += " " + yearto;
        }else if (freq==5){
            if (fromYrS<=0){
                fromYrS = 12 + fromYrS;
            }
            monthfrom = fromYrS;
            monthto = $(".semiRepDate1").val();
            yearfrom = yearFromS;
            yearto = $(".yearRepDate1").val();

            date = Date.parse(monthto-1).toString('MMM');
            date += " " + yearto;
        }else if (freq==6){
            year = $(".yearRepDate1").val();
            date = year;
        }

        var link = "api/v1/report/instructor";

        link += "?";
        link += "branch=" + branch != "allBr" ? branch : "";
        link += "&freq=" + freq;
        link += "&date=" + date;

        swal({
            title: "Generate Report?",
            text: title + ": " + title2,
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        }, function (conf){
            if(conf){
                setTimeout(function(){
                    swal('Done','','success');
                    window.location = link;
                },1000)
            }
        });
    }
}