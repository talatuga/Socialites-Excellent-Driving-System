var monthnow = (new Date()).getUTCMonth()+1;
var yearnow = (new Date()).getFullYear();
var switchMonth = monthnow;
var fromYrQ, fromYrS, yearFromQ, yearFromS, yearEnd=yearnow;

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
}

function loadInitReport(){
    $("#selReport1").val($("#selReport1 option:first").val());
    $("#selReport2").val($("#selReport2 option:first").val());
    $("#selReport3").val($("#selReport3 option:first").val());
    $(".selReportFreq").val($(".selReportFreq option:first").val());
    $(".selReportBranch").val($(".selReportBranch option:first").val());

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