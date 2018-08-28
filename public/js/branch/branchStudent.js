$(function() {
    document.getElementById("studCP1").checked = true;
    document.getElementById("studCP2").checked = false;
    //getStudent(1, studentTable.offset, studentTable.limit).then(renderStudentTable); // <--- tawagin yung getStudent() then after yung renderStudentTable().    
});

$("#btnViewStudentBranch").on("click", function() { //opens view student page upon clicking view details
    resetSettingsStud();
    $('.viewDiv').hide();
    $('.view-viewStudentBranch').show();
});

$(".backStud").on("click", function() { //closes view instructor page then goes back to previous page
    $('.viewDiv').hide();
    $('.view-branchStudent').show();
});

$('.searchStud').on('click', function(e){
    console.log("Searching Students...");
    search.init(stud.pages[stud.tableType==0?"current":"past"][stud.currPage[stud.tableType==0?"0":"1"]], ["fullname","email","studID"], function(data){
        renderStudentTable(data,function(){
            $('tableStud').addClass("highlightTr");                
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
                $('tableStud').addClass("highlightTr");                
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
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function(isConfirm){
        if (isConfirm) {
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
    limit: 10,
    currentPage: 0,
    pages:{}
} // <--- pero dahil wala pang pagination nevermind muna tong part na to.

//SD: OKAY ella! this is my sample get method to server. line by line ko i eexplain for you! ^_^
var getStudent = function(_type, offset, limit){ // <--- Nag declase ako ng variable na may lamang function. with parameters, _type = number, offset = number(starting id), and limit = number(number of result) 
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
        $('#studentTableBranch').html(html); // <--- hahanapin yung element sa html na may id na studentTable and papalitan yung html nun nung laman nung html string.       
        cb();
    }
    if(data == undefined || data.length == 0) return render();
    var loopCounter = data.length; // <--- declare ng counter. di kasi gumagana yung break; sa forEach() and Asynchronous kasi siya.
    data.forEach(element => { // <--- expecting na array yung data, gagamitin natin yung forEach() which is asynchronous function. ilalagay sa element variable yung bawat element nung data and i perform yung action below it.       
        html += "<tr onclick='viewStud("+ element.id +")'>";
        html += "<td>" + element.id + "</td>";
        html += "<td>" + element.fullname.replace(/_/g, " ") + "</td>";
        //html += "<td>" + element.accStatus + "</td>"; // <-- pa edit nalang nito kung pano yung may warning/sucess
        html += "</tr>"; // <--- common sense na siguro yung start nito till here. hahaha
        loopCounter--; // <--- reduce counter value.
        if(loopCounter == 0) render(); // <--- ichecheck kung zero na ba. kasi kung oo tawagin na yung render variable na may laman na function.        
    });// <--- ending nung forEach();
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

var viewStud = function(id){
    stud.selected = id;
    stud.getLocalData(function(profile){
        stud.selectedID = profile.studID;
        $('.studNum').html(profile.studID);
        $('.studName').html(profile.fullname.replace(/_/g, " "));
        $('.studAddress').html(profile.address);
        $('.studPhone').html(profile.telno);
        $('.studEmail').html(profile.email);
        $('.enrolledCrs').html("");
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