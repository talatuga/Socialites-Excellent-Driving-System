var studName, studID, courseID, schedID, lessonID, dataID;
var selectedLesson, selectedGrade, selectedComment, selectedDate, selectedTime, selectedDataID, selectedInstID, selectedLessonID, selectedSchedID;
$(function() {
});

$("#studentTblGrade tr").on('click', function() {
    $('#editGradeModal').modal('show');
});

function addGrade(){
    $('#addGradeModal').modal('show');
}

function evaluateStud(){
    $('#evalStudModal').modal('show');
}

$("#btnViewStudent").on("click", function() { //opens view student page upon clicking view details
    $('.viewDiv').hide();
    $('.view-viewStudent').show();
    resetSettingsStud();
    loadEvalStud();
    loadCourses();
    scheduler.getStudSched(stud.selectedID, function(err, sched){
        if(err) return console.error(err);
        if(sched.length == 0) return;
        var html = "<table class='table tblCustom'>";
        html += "<thead><tr><th>Date</th><th>Time</th><th>Instructor</th><th>Branch</th></tr></thead><tbody class='studScheduleTbl'></tbody></table>";
        $('#studentSched').html(html);
        if(sched.length!=0){
            $('.noStudSched').hide();
            sched.forEach((e,i)=>{
                scheduler.getInstName(e.instID, function(err, name){
                    scheduler.getBranchName(e.branch, function(err, branch){
                        var row = "<tr>";
                        row += "<td>"+ Date.parse(e.date).toString('MMM dd, yyyy') +"</td>";
                        row += "<td>"+ Date.parse(e.time).toString('hh:mm tt') +"</td>";
                        row += "<td>"+ name.replace(/_/g, " ") +"</td>";
                        row += "<td>"+ branch +"</td>";
                        row += "</tr>";
                        $('.studScheduleTbl').append(row);
                    });
                });
            });
        }else{
            $('.noStudSched').show();
        }
    });
});

$(".backStud").on("click", function() { //closes view instructor page then goes back to previous page
    $('.viewDiv').hide();
    $('.view-student').show();
});

$('.searchStud').on('click', function(e){
    console.log("Searching Students...");
    search.init(stud.pages[stud.tableType==0?"current":"past"][stud.currPage[stud.tableType==0?"0":"1"]], ["fullname","email","studID"], function(data){
        renderStudentTable(data,function(){
            $('.tableStud tbody tr').addClass("highlightTr");                
            $('.tableStud tbody tr').click(function () {
                var selected = $(this).hasClass("highlightTr");
                $('.tableStud tbody tr').removeClass("highlightTr");
                if (!selected)
                    $(this).addClass("highlightTr");
            });
        });            
    });
});
$('.searchStud').on('keyup', function(e){
    search.keypress($('.searchStud').val());
});

var studLoaded = 0
var loadStud = function(){ 
    if(studLoaded == 0){
        $(".preloader").fadeIn();          
        stud.getList(function(err){
            if(err) return swal("Failed!",err.message,"error");
            renderStudentTable(stud.pages.current[stud.currPage[0]], function(){
                if(stud.pages.current.length!=0){
                    viewStud(stud.pages.current[stud.currPage[0]][0].id);
                }
                $('.tableStud tbody tr:first').addClass("highlightTr");                
                $('.tableStud tbody tr').click(function () {
                    var selected = $(this).hasClass("highlightTr");
                    $('.tableStud tbody tr').removeClass("highlightTr");
                    if (!selected)
                        $(this).addClass("highlightTr");
                });
                $(".preloader").fadeOut();                  
                studLoaded = 1;
            });
        });
    }
};

function clrSearchStudent ()
{
    $('#searchStudent').val("");
}

function loadCourses(){
    $('.enrolledCrsTbl1').show();
    $('#lessonForGradeTbl').hide();
    $('.h4selCrsforLes1').hide();
    stud.getCourseEnrolled(function(err, data){
        if(err){
            swal("Failed!", err.message, "error");
            console.log(err);
        }else{
            $('#enrolledCrsTblStud').html("");
            var pad = "000";
            if(data.length!=0){
                $('.noGradeTr').hide();
                $('.noCrsTr').hide();
                data.forEach(e => {
                    var html = "<tr><td id='"+ e.courseID +"'> CRS-" + e.carType.toUpperCase() + (pad.substring(0, pad.length-(e.courseID+"").length) + e.courseID) + "</td>";
                    html += "<td>" + e.days + "</td>";
                    html += "<td>" + (e.special ? "Yes" : "No") + "</td>";
                    html += "<td>" + (e.enrollStatus == 1 || e.enrollStatus == 0 ? (Date.parse(e.dateEnrolled).toString("MMM dd, yyyy")) : (e.enrollStatus == 2 ? "---" : "date")) + "</td>";
                    html += "<td>" + (e.enrollStatus == 1 ? "Ongoing" : (e.enrollStatus == 2 ? "Pending" : "Finished")) + "</td>";
                    html += "</tr>"; 
                    $('#enrolledCrsTblStud').append(html);
                });
            }else{
                $('.noGradeTr').hide();
                $('.noCrsTr').show();
            }
            $('#enrolledCrsTblStud tr').click(function () {
                var selected = $(this).hasClass("highlightTr");
                $('#enrolledCrsTblStud tr').removeClass("highlightTr");
                if (!selected){
                    $(this).addClass("highlightTr");
                    courseID = $(this).closest('tr').find('td:eq(0)').attr("id");
                    var selectedCourse = $(this).closest('tr').find('td:eq(0)').text();
                    $('.h4selCrsforLes').html(selectedCourse);
                    $(".preloader").fadeIn(); 
                    viewGradesStud(courseID);
                    $(".preloader").fadeOut(); 
                    }
            });
        }
    });
}

function resetSettingsStud (){
    $("#editStudAccFN").prop("disabled", true);
    $("#editStudAccMN").prop("disabled", true);
    $("#editStudAccSN").prop("disabled", true);
    $("#editStudAccBday").prop("disabled", true);
    $("#editStudAccBplace").prop("disabled", true);
    $("#editStudAccAdd").prop("disabled", true);
    $("#editStudAccOcc").prop("disabled", true);
    $("#editStudAccCont").prop("disabled", true);
    $("#editStudAccEmail").prop("disabled", true);
    $("#editStudAccGuard").prop("disabled", true);
    $("#editStudAccGuardCont").prop("disabled", true);
    $("#editStudAccUN").prop("disabled", true);
    $("#editStudAccPW").prop("disabled", true);
    $("#editStudAccCPW").prop("disabled", true);
    $("#editStudAccCivStatus").prop("disabled", true);
    $("#editEnrSexS1").prop("disabled", true);
    $("#editEnrSexS2").prop("disabled", true);
    $('.btnDeactStudAcc').show();
    $('.btnUpdateStudAcc').show();
    $('.btnCancUpdStud').hide();
    $('.btnResetUpdStud').hide();
    $('.btnSaveUpdStud').hide();
}

function enableFieldsStud (){
    $("#editStudAccFN").removeAttr("disabled");
    $("#editStudAccMN").removeAttr("disabled");
    $("#editStudAccSN").removeAttr("disabled");
    $("#editStudAccBday").removeAttr("disabled");
    $("#editStudAccBplace").removeAttr("disabled");
    $("#editStudAccAdd").removeAttr("disabled");
    $("#editStudAccOcc").removeAttr("disabled");
    $("#editStudAccCont").removeAttr("disabled");
    $("#editStudAccEmail").removeAttr("disabled");
    $("#editStudAccGuard").removeAttr("disabled");
    $("#editStudAccGuardCont").removeAttr("disabled");
    $("#editStudAccUN").removeAttr("disabled");
    $("#editStudAccPW").removeAttr("disabled");
    $("#editStudAccCPW").removeAttr("disabled");
    $("#editStudAccCivStatus").removeAttr("disabled");
    $("#editEnrSexS1").removeAttr("disabled");
    $("#editEnrSexS2").removeAttr("disabled");
}

function updateStud(){
    enableFieldsStud();
    $('.btnDeactStudAcc').hide();
    $('.btnUpdateStudAcc').hide();
    $('.btnCancUpdStud').show();
    $('.btnResetUpdStud').show();
    $('.btnSaveUpdStud').show();
}

function resetUpdStud(){
    //reset fields here
}

function cancUpdStud(){
    swal({
        title: "Cancel and discard changes?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: true
    },
    function(isConfirm){
        if (isConfirm) {
            swal("Cancelled", "", "error");
            resetSettingsStud();
            resetUpdStud();
        }
    });
}

function saveUpdStud(){
    var a, b, c, d, e, f, g, h, i ,j;  //for checking lang to
    var fn = $("#editStudAccFN").val();
    var mn = $("#editStudAccMN").val();
    var sn = $("#editStudAccSN").val();
    var bday = $("#editStudAccBday").val();
    var bplace = $("#editStudAccBplace").val();
    var add = $("#editStudAccAdd").val();
    var sex = $('input[name="editStudAccSex"]:checked').val();
    var cont = $("#editStudAccCont").val();
    var guard = $("#editStudAccGuard").val();
    var guardCont = $("#editStudAccGuardCont").val();
    var un = "asd";//$("#editStudAccUN").val();
    var pw = "123";//$("#editStudAccPW").val();
    var cpw = "123";//$("#editStudAccCPW").val();
    var civ = $('select[name="editStudAccCivStatus"]').val();
    var email = $('#editStudAccEmail').val();

    a = fn.replace(/\s+/g, '');
    b = sn.replace(/\s+/g, '');
    c = bplace.replace(/\s+/g, '');
    d = add.replace(/\s+/g, '');
    e = cont.replace(/\s+/g, '');
    f = guard.replace(/\s+/g, '');
    g = guardCont.replace(/\s+/g, '');
    h = un.replace(/\s+/g, '');
    i = pw.replace(/\s+/g, '');
    j = cpw.replace(/\s+/g, '');

    if (a=="" || sn=="" || c=="" || d=="" 
        || e=="" || f=="" || g=="" || civ=="civ0"){
            swal("Oops!", "Please fill out all required fields.", "error");
        }
    else{
        if (h=="" && i=="" && j==""){
            swal({
                title: "Warning!",
                text: "Are you sure you want to save these changes?",
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
                    swal("Success!", "Student account is updated successfully!", "success");
                    resetSettingsStud();
                    //DB: Update student account function
                }
            });
        }
        else{
            if (i!="" && j!=""){
                if (pw==cpw){
                    swal({
                        title: "Warning!",
                        text: "Are you sure you want to save these changes?",
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
                            stud.getLocalData(function(profile){
                                var data = {
                                    userAcc: profile.userAcc,
                                    fullname: fn + "_" + mn + "_" + sn,
                                    address: add,
                                    birthdate: bday,
                                    birthplace: bplace,
                                    telno: cont, 
                                    civilStatus: civ,
                                    sex: sex,
                                    email: email,
                                };
                                stud.edit(data, function(err){
                                    if(err){
                                        swal("Failed!", err.message, "error");
                                        return console.error(err);
                                    }else{
                                        swal("Success!", "Student account is updated successfully!", "success");
                                        resetSettingsStud();
                                        //DB: Update student account function
                                    }
                                });
                            });
                        }
                    });
                }
                else{
                    swal("Oops!", "Passwords do not match!", "error");
                }
            }
            else if (i=="" && j==""){
                swal({
                    title: "Warning!",
                    text: "Are you sure you want to save these changes?",
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
                        stud.getLocalData(function(profile){
                            var data = {
                                userAcc: profile.userAcc,
                                fullname: fn + "_" + mn + "_" + sn,
                                address: add,
                                birthdate: bday,
                                birthplace: bplace,
                                telno: cont, 
                                civilStatus: civ,
                                sex: sex,
                                email: email,
                            };
                            stud.edit(data, function(err){
                                if(err){
                                    swal("Failed!", err.message, "error");
                                    return console.error(err);
                                }else{
                                    swal("Success!", "Student account is updated successfully!", "success");
                                    resetSettingsStud();
                                    //DB: Update student account function
                                }
                            });
                        });
                    }
                });
            }
            else{
                swal("Oops!", "Please fill out all required fields.", "error");
            }
        }
    }
}

function deactStud(){
    swal({
        title: "Warning!",
        text: "Are you sure you want to deactivate this account?",
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
            stud.delete(function(err){
                if(err){
                    swal("Failed!", err.message, "error");
                }else{
                    swal("Success!", "Student account is now deativated.", "success");
                    resetSettingsStud();
                    //DB: Deactivate/delete student account function
                }
            });
        }
    });
}

function addPaymentModal(){
    //Value of assessment fee must come from the db. (part of transaction)
    $('.addPayDate').val("");
    $('.addPayTxt').val("");
    $('.addPayBal').val("");
    $('#addPaymentModal').modal('show');
}

var studentTable = { // <--- set nang property nung table, para alam natin yung current page, offset, limit and storage narin ng loaded pages.
    offset: 0,
    limit: 15,
    currentPage: 0,
    pages:{}
} // <--- pero dahil wala pang pagination nevermind muna tong part na to.

//SD: OKAY ella! this is my sample get method to server. line by line ko i eexplain for you! ^_^
var getStudent = function(_type, offset, limit){ // <--- Nag declare ako ng variable na may lamang function. with parameters, _type = number, offset = number(starting id), and limit = number(number of result) 
    type = ["all","current","past"]; //<--- nag declare ako ng local variable na laman is array ng type of student we need.
    return new Promise(function(grant, reject){ // <--- nag declare ako ng promise. ibig sabihin itong buong getStudent() is a Promise Object.
        $.get('api/v1/stud?filter='+ type[_type] +'&limit=' + limit + '&offset=' + offset, function(response){ // <--- Eto yung GET Ajax, and structure nya is $.get(apiAddress, callback);
            //studentTable.pages[studentTable.currentPage] = response.data; // <--- for pagination. add data to currentPage
            grant(response.data); // <--- pag nagresponse ng data yung GET request natin galing sa server, tatawawagin natin yung grant(dataToPass) ng Promise.
        }); // closing ng $.get()
    }); // closing ng Promise Object.
} // closing ng getStudent()


//SD: Ella eto naman yung function for rendering the student table.
var renderStudentTable = function(data, cb){ // <--- nag declare ng var na may laman ng function. with parameter expecting to be an array[]
    var html = ""; // <--- initialized a blank string para kung walang ma process walang i didisplay.
    var render = function(){ // <--- nagdeclare ako ng local var na may laman na function. ang purpose is tatawagin to pag tapus na yung forEach() sa baba. 
        $('#studentTable').html(html); // <--- hahanapin yung element sa html na may id na studentTable and papalitan yung html nun nung laman nung html string.       
        cb();
    }
    if(data == undefined || data.length == 0){
        $('.hrStud').show();
        $('.tableStud').hide();
        $('.noStudTr').show();
        $('.hasStudDetails').hide();
        $('.noStudDetTr').show();
        return render();
    }else{
        var loopCounter = data.length; // <--- declare ng counter. di kasi gumagana yung break; sa forEach() and Asynchronous kasi siya.
        $('.hrStud').hide();
        $('.tableStud').show();
        $('.noStudTr').hide();
        $('.hasStudDetails').show();
        $('.noStudDetTr').hide();
        data.forEach((element,index) => { // <--- expecting na array yung data, gagamitin natin yung forEach() which is asynchronous function. ilalagay sa element variable yung bawat element nung data and i perform yung action below it.       
            html += "<tr onclick='viewStud("+ element.id +")'>";
            html += "<td>" + /* element.id */ (index+1) + "</td>";
            html += "<td>" + element.fullname.replace(/_/g, " ") + "</td>";
            // html += "<td>" + element.id + "</td>";
            //html += "<td>" + element.accStatus + "</td>"; // <-- pa edit nalang nito kung pano yung may warning/sucess
            html += "</tr>"; // <--- common sense na siguro yung start nito till here. hahaha
            loopCounter--; // <--- reduce counter value.
            if(loopCounter == 0) render(); // <--- ichecheck kung zero na ba. kasi kung oo tawagin na yung render variable na may laman na function.        
        });// <--- ending nung forEach();
    }  
}
var rst_done = 0; // <--- to prevent spamming sana, pero nevermind muna to.
var refreshStudentTable = function () { // <--- I suggest applying pagination. Self explain kung ano ginagawa nito.
    if(rst_done == 0){
        rst_done = 1;
        getStudent(1, studentTable.offset, studentTable.limit).then(renderStudentTable).then(function(){ // <--- need talaga ng pagination para naman makuha natin yung data per page.
            rst_done = 0;
        });
    }else{
        console.log("Pressing to fast...");
        // lagyan sana dito ng sleep till you can press refresh again.
    }
}

//SD: Okay this one is tricky, kasi may dalawang types of editing, either per field ba or buong data.
var usd_done = 0;
var updateStudentData = function(_id, _field = "", data){
    var id = _id; // <--- fetch data to update and declare here, 
    var field = _field; // <--- same goes here, pero optional to. pag wala tong laman ibig sabihin lahat ng data ng specific student maaupdate.
    var _data = { // <--- variable na ipapasa sa server. in JSON format
        // declare data here, sample: fullname: ella, // seperate data using (,)
    }
    
    //SD: VALIDATION! even thou may validation procedure ako sa server-side, still filter data here.
    
    return new Promise((grant, reject)=>{
        $.ajax({
            url: 'api/v1/stud/' + id + field,
            type: "PUT", // <--- use METHOD 'PUT' kung update gagawin mo.
            data: _data, // <--- pass the _data
            success: onsuccess, // <--- pag okay ang lahat at tanggap ni server yung nagbago :(
            error: onerror  // <--- pag ayaw tanggapin ni server na nagbago na siya.
        });
        var onsuccess = (data)=>{ // <--- simplified version ng pag declare ng function, tutal ES6 na halos lagay ng JS sa mga browser.
            if(data.success == false){
                reject(data.detail); // <--- send rejection, kasi ayaw ni server.
            }else{
                grant(data.detail); // <--- pag okay ang lahat.
            }
        }
        var onerror = (err)=>{
            console.error("Error");
            reject(err); // <--- send rejection
        }
    });
}
//SD: Delete naman, simple lang ito. I guess iiwan ko tong uncommented para i aanaylze mo. ^_^
var deleteStudentData = function(id){
    return new Promise((grant, reject)=>{
        $.ajax({
            type: "DELETE",
            url: "api/v1/stud/" + id,
            success: onsuccess,
            error: onerror
        });
        var onsuccess = function(response){
            if(response.success == false) {
                reject(response.detail);
            }else{
                grant(response.detail);
            }   
        }
        var onerror = function(err){
            console.log(err);
            reject(err);
        }
    });
}

function viewGradesStud(){
    $('.enrolledCrsTbl1').hide();
    $('#lessonForGradeTbl').show();
    $('.h4selCrsforLes1').show();
    stud.getGradesStud(function(err, data){
        if(err){
            swal("Failed!", err.message, "error");
            console.log(err);
        }else{
            $('#studGradesInst').html("");
            var x = 1;
            var dataLen = data.length;
            if(data.length!=0){
                $('.noGradeTr').hide();
                $('.noCrsTr').hide();
                data.forEach(e => {
                    dataID = e.id;
                    var html = "<tr id='"+ e.id +"'>";
                    html += "<td id='"+ e.id +"'>" + x + "</td>";
                    html += "<td id='"+ e.lessonID +"'>" + e.title + "</td>";
                    html += "<td id='"+ e.schedID +"'>" + (Date.parse(e.date).toString("MMM dd, yyyy")) + "</td>";
                    html += "<td>" + (Date.parse(e.time).toString("HH:mm")) + "</td>";
                    html += "<td id='"+ e.instID +"' data-name='"+ e.fullname +"' >" + e.fullname.replace(/_/g, ' ') + "</td>";
                    html += "<td>" + e.grade + "</td>";
                    html += "<td>" + e.comment + "</td>";
                    html += "</tr>";
                    x++;
                    $('#studGradesInst').append(html);
                });
            }else{
                $('.noCrsTr').hide();
                $('.noGradeTr').show();
            }
        }
    });
}

function loadEvalStud(){
    inst.getStudEval(function (err, data){
        if(err){
            swal("Failed!", err.message, "error");
            console.log(err);
        }else{
            $('#evalStudAdmin').html("");
            var x = 1;
            var pad = "0000";
            var eval;
            if(data.length!=0){
                $('.noEvalDiv').hide();
                data.forEach((e,i)=>{
                    var html = "<div class='sl-item'><div class='sl-left'> <img src='assets/images/user4.png' alt='Student' id='studEvalPic' class='img-circle /> </div><div class='sl-right'>";
                    html += "<div><a href='#' class='link' id='instEvalName'>" + e.fullname.replace(/_/g, ' ') + "</a> <span class='sl-date'>" + (Date.parse(e.dateEvaluated ).toString("MMM dd, yyyy")) + "</span>";
                    html += "<br><small class='crsEval'>CRS-" + e.carType.toUpperCase() + (pad.substring(0, pad.length-(e.courseID+"").length) + e.courseID) + "</small><div class='separator2'></div>";
                    html += "<p style='color: #455a64;'>Overall Grade: <span class='instOverallGrade'>" + e.grade + " (" + (e.grade == 5 ? '100%' : (e.grade == 4 ? '80%' : (e.grade == 3 ? '60%' : (e.grade == 2 ? '40%' : '20%')))) + ")" + "</span><br>";
                    html += "Evaluation: <span style='color: #455a64;'>" + (e.grade <= 24 ? 'NEEDS TO EXTEND' : ((e.grade <= 34 && e.grade >= 25) ? 'NEEDS PRACTICE' : 'PASSED'))+"</span><br><br>";
                    html += "\"" + e.comment + "\"</p>";
                    html += "</div></div></div><hr>";
                    x++;
                    $('#evalStudAdmin').append(html);
                });
            }else{
                $('.noEvalDiv').show();
            }
        }
    });
}

var viewStud = function(id){
    var today = new Date();
    var payName, payDate, payType, payAssess, payBalance, payTotalBal;
    stud.selected = id;
        stud.getLocalData(function(profile){   
            stud.selectedID = profile.studID;
            studID = profile.studID;
            profile.data = typeof profile.data == "string" ? JSON.parse(profile.data) : profile.data;
            $('.studNum').html(profile.studID);
            $('.studName').html(profile.fullname.replace(/_/g, " "));
            $('.studAddress').html(profile.address);
            $('.studPhone').html(profile.telno);
            $('.studEmail').html(profile.email);
            $('.studPic').attr('src',profile.data.avatar || "assets/images/user-medium.png");
            // $('.enrolledCrs').html('none');
    
            stud.getCourseEnrolled(function(err, course){
                if(err) return console.error(err);
                courseModule.selected = course.courseID;
                courseModule.getLocalData(function(courseData){
                    $('.enrolledCrs').html(courseData.courseID);
                });
            });
    
            payName = (profile.fullname.replace(/_/g, " "));
            payDate = ((Date.parse(today).toString('MM/dd/yyyy')));
    
            stud.getPaymentAccount(profile.studID, function(err, data){
                if(err) return console.error(err);
                $('#tblStudPayment1').html('');
                data.forEach((e,i) => {
                    var html = "<tr>";
                    html += "<td>"+ Date.parse(e.date).toString('MM/dd/yyyy') +"</td>";
                    html += "<td>"+ e.transaction +"</td>";
                    html += "<td>"+ parseFloat(e.price).formatMoney(2) +"</td>";
                    html += "<td>"+ (parseFloat(e.price) - parseFloat(e.balance)).formatMoney(2) +"</td>";
                    html += "<td>"+ parseFloat(e.balance).formatMoney(2) +"</td>";
                    html += "</tr>";
                    $('#tblStudPayment1').append(html);
                });
                $("#tblStudPayment1 tr").on('click', function() {
                    payType = $(this).closest('tr').find('td:eq(1)').text();
                    payAssess = $(this).closest('tr').find('td:eq(2)').text();
                    payBalance = $(this).closest('tr').find('td:eq(4)').text();
                    if(payBalance!="0.00"){
                        $('.addPayName').html(payName);
                        $('.addPayDate').html(payDate);
                        $('.addPayType').html(payType);
                        $('.addPayAssess').html(payAssess);
                        $('.addPayBal').html(payBalance);
                        $('.addPayTotAmount').html(payBalance);
                        
                        $('#addPaymentModal1').modal('show');
                    }
                });
            });
            renderEditInfo();
        });
}

var allStudTblLoad = 0;
var changeStudTable = function(){
    stud.tableType = $('input[name="studCP"]:checked').val();
    var data = stud.pages[(stud.tableType == 0 ? "current" : "past")];
    if(data.length == 0){
        stud.refresh();
    }else{
        renderStudentTable(data[stud.currPage[stud.tableType]], ()=>{})
    }
}

var renderEditInfo = function(){
    stud.getLocalData(function(profile){
        var name = profile.fullname.split("_");
        $('#editStudAccFN').val(name[0]);
        $('#editStudAccMN').val(name[1]);
        $('#editStudAccSN').val(name[2]);
        $('#editStudAccBday').val(Date.parse(profile.birthdate).toString("yyyy-MM-dd"));
        $('#editStudAccBplace').val(profile.birthplace);
        $('#editStudAccAdd').val(profile.address);
        $('#editStudAccCont').val(profile.telno);
        $('#editStudAccEmail').val(profile.email);
        $('#editStudAccCivStatus').val(profile.civilStatus);
        $("input[name='editStudAccSex'][value='" + profile.sex + "']").attr('checked', 'checked');
        $("input[name='AddudAccSex'][value='" + profile.sex + "']").attr('checked', 'checked');
    });
}

/* 
    SD: 
    I use, Promise to make things done. kasi sa server side na ka old style ako using callback.
    for sure makaka kita kapa nang callback dito. pero i suggest using promise nalang.

    summary:

    $.get(apiAddress, callback);

    $.post(apiAddress, data, callback);
    
    $.ajax(config);

    where: 
    apiAddress = server api address to call, e.g: 'api/v1/stud' or 'api/v1/car' 
    data AND dataToPass = process and validated data in JSON form that will send with the request.
    callback = function that will run when certain condition/event trigger.

    config = {
        url: apiAddress,
        type: httpMethod,
        data: dataToPass,
        success: callback,
        error: callback
    }

    $('#elementID').html()              <--- returns html of that target element,
    $('#elementID').html(htmlToApply)   <--- replace html content of the targer element with htmlToApply in String format.
    
    array.forEach(  <--- forEach is a buiilt-in function for array type variables. each element of data is stored on element and run the code inside the {}
        element=>{
            //action here per element
        }
    ) 

    pagtatawagin mo yung isang function na implement with Promise. 
    pwede mo tawagin yung then() after nun, 
    example: 

        deleteStudentData(3).then(function/anotherFunction/callback).catch(function/anotherFunction/callback);

    > mag rurun yung then() after tawagin nung deleteStudentData() yung grant() sa loob nya.    
    > kung sakaling reject() yung tinawag sa loob nung promise. pwede mo i dugtong yung catch()

*/