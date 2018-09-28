$(function () {
    clrSearchCourses();
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
    $('#searchCourses').on('click', function(e){
        search.init(courseModule.pages[courseModule.currPage], ["courseID","carType","amount","days"], function(data){
            renderCourseTable(data);
        });
    });
    $('#searchCourses').on('keyup', function(e){
        search.keypress($('#searchCourses').val());
    });
    loadCourse();
});

var courseLoaded = 0;
var loadCourse = function(cb){
    if(courseLoaded == 0){
        $(".preloader").fadeIn();          
        courseModule.getList(()=>{
            renderCourseTable(courseModule.pages[courseModule.currPage]);
            $('.tblCourses tbody tr:first').addClass("highlightTr");
            $('.tblCourses tbody tr').click(function () {
                var selected = $(this).hasClass("highlightTr");
                $('.tblCourses tbody tr').removeClass("highlightTr");
                if (!selected)
                    $(this).addClass("highlightTr");
            });
            $(".preloader").fadeOut();
            $('.enrCourse').html("");
            courseModule.pages[courseModule.currPage].forEach(x=>{
                $('.enrCourse').append("<option value='"+ x.id +"'>"+ x.days +" Days</option>");
            });
            courseLoaded = 1; 
            if(cb != undefined){
                cb();
            }             
        });
    }
}

function clrSearchCourses(){
    $('#searchCourses').val("");
}

function addCourse(){
    resetAddCourse();
    $('.h6AddCourse').html("ADD NEW COURSE");
    $('#btnConfResetCourse').hide();
    $('#btnConfEditCourse').hide();
    $('#btnCancAddCourse').show();
    $('#btnConfAddCourse').show();
    $('#addCourseModal').modal('show');
}

function editCourse(id){
    resetAddCourse();
    courseModule.selected = id;
    courseModule.getLocalData(function(profile){
        $("#newCrsDays").val(profile.days);
        $("#newCrsPrice").val(profile.amount);
        $("#newCrsVehiType").val(profile.carType);
    });
    $('.h6AddCourse').html("UPDATE COURSE");
    $('#btnConfAddCourse').hide();
    $('#btnCancAddCourse').show();
    $('#btnConfResetCourse').show();
    $('#btnConfEditCourse').show();
    $('#addCourseModal').modal('show');
}

function resetAddCourse(){
    $('#newCrsDays').val("");
    $('#newCrsPrice').val("");
    $('select[name="newCrsVehiType"]').val("0");
}

function remCourse(id){
    courseModule.selected = id;    
    swal({
        title: "Warning!",
        text: "Are you sure you want to remove this course?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        closeOnConfirm: false,
        closeOnCancel: true
    },
    function(isConfirm){
        if (isConfirm) {
            courseModule.delete(function(err){
                if(err){
                    swal("Failed!", err.message, "error");
                }else{
                    $('#addCourseModal').modal('hide');
                    swal("Success!", "Course is now unavailable.", "success");
                    //DB: Remove course function here
                }
            })
        }
    });
}

function checkFieldsCourse(){
    var a, b;
    var days = $('#newCrsDays').val();
    var price = $('#newCrsPrice').val();
    var vehiType = $('select[name="newCrsVehiType"]').val();

    a = days.replace(/\s+/g, '');
    b = price.replace(/\s+/g, '');

    if (a=="" || b=="" || vehiType=="0") return "0";
    else return "1";
}

function confCancAddCourse(){
    var check = checkFieldsCourse();
    if (check=="0") $('#addCourseModal').modal('hide');
    else {
        swal({
            title: "Warning!",
            text: "Are you sure you want to discard the changes?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function(isConfirm){
            if (isConfirm) {
                $('#addCourseModal').modal('hide');
                //DB: Cancel changes here
            }
        });
    }
}

function confAddCourse(){
    var check = checkFieldsCourse();
    if (check==0)
        swal("Oops!", "Please fill out all required fields.", "error");
    else {
        swal({
            title: "Warning!",
            text: "Are you sure you want to add this course?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function(isConfirm){
            if (isConfirm) {
                var data = {};
                data["days"] = $('#newCrsDays').val();
                data["price"] = $('#newCrsPrice').val();
                data["carType"] = $('select[name="newCrsVehiType"]').val();
                courseModule.add(data, function(err){
                    if(err){
                        swal("Failed!", err.message, "error");
                    }else{
                        swal("Success!", "New course has been added!", "success");
                        $('#addCourseModal').modal('hide');
                        //DB: Adding of course function here
                    }
                });
            }
        });
    }
}

function confEditCourse(){
    var check = checkFieldsCourse();
    if (check==0)
        swal("Oops!", "Please fill out all required fields.", "error");
    else {
        swal({
            title: "Warning!",
            text: "Are you sure you want to save the changes?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function(isConfirm){
            if (isConfirm) {
                var data = {};
                data["days"] = $('#newCrsDays').val();
                data["price"] = $('#newCrsPrice').val();
                data["carType"] = $('select[name="newCrsVehiType"]').val();
                courseModule.update(data, function(err){

                });
                swal("Success!", "Course has been successully updated!", "success");
                $('#addCourseModal').modal('hide');
                //DB: Updating of course function here
            }
        });
    }
}

function confResetCourse(){
    resetAddCourse();
}

var renderCourseTable = function(data){
    var html = "";
    data.forEach(item=>{
        if(item.purgeFlag !=0 ){
            html += "<tr onclick=''>";
            html += "<td>"+ item.courseID +"</td>";
            html += "<td>"+ item.days +" Days</td>";
            html += "<td>" + parseInt(item.amount).formatMoney(2) + "</td>";
            html += "<td>" + (item.carType == "A" ? "Automatic" : "Manual") + "</td>";
            html += "<td><i class='ti-pencil tiDef2 btnRemCourse' onclick='editCourse("+ item.id +")' data-toggle='tooltip' data-placement='bottom' title='Edit'></i><i class='ti-close tiDef2 btnEditCourse' onclick='remCourse("+ item.id +")' data-toggle='tooltip' data-placement='bottom' title='Remove'></i></td>";
            html += "</tr>";
        }
    });
    $('#courseTable').html(html);
}