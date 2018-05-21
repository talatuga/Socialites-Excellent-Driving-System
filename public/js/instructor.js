$(function () {
    $("#btnNewInstructor").on("click", function () { //opens add instructor modal
        resetNewInstr();
        $('#newInstructorModal').modal('show');
    });
    $("#btnViewInstructor").on("click", function () { //opens view instructor page upon clicking view details
        $('.view-instructor').hide();
        $('.view-viewInstructor').show();
        resetSettingsInst();        
    });
    $(".backInst").on("click", function () { //when back button is clicked (right side of instructor information)
        $('.view-viewInstructor').hide();
        $('.view-instructor').show();
    });

    $(".btnDelInstAcc").on("click", function () { //opens confirmation modal upon clicking delete account. UNDONE.
        $('#confirmDeleteInstructor').modal('show');
    });

    $(".btnUpdateInstAcc").on("click", function () { //opens confirmation modal upon clicking update account. UNDONE.
        $('#confirmDeleteInstructor').modal('show');
    });
});

var loadInst = function(){
    $(".preloader").fadeIn();  
    inst.getInstList(function (err, done) {
        if (err) return console.log(err);
        renderInstTablePage(inst.pages[inst.currPage]);
        viewInstProfile(inst.pages[inst.currPage][0].instID);
        $(".preloader").fadeOut();          
    });    
}

function resetNewInstr() //resets fields on add instructor modal
{
    $("#newInstFirstname").val("");
    $("#newInstMidname").val("");
    $("#newInstSurname").val("");
    $("#newInstBday").val("");
    $("#newInstAddress").val("");
    $("#newInstPhone").val("");
    $("#newInstEmail").val("");
    $('select[name="newInstEduc"]').val(0);
    document.getElementById("g1NI").checked = true;
    document.getElementById("g2NI").checked = false;

    $(".defMod2Inst").removeClass("activeDefModInst");
    $(".defMod1Inst").addClass("activeDefModInst");

    $("#btnPrevAddInst").hide();
    $("#btnDoneAddInst").hide();
    $("#btnNextAddInst").show();

    $(".divMod2Inst").hide();
    $(".divMod1Inst").show();
}

function nextInst ()
{
    var fn = $("#newInstFirstname").val();
    var mn = $("#newInstMidname").val();
    var sn = $("#newInstSurname").val();
    var bday = $("#newInstBday").val();
    var add = $("#newInstAddress").val();
    var phone = $("#newInstPhone").val();
    var email = $("#newInstEmail").val();
    var educ = $('select[name="newInstEduc"]').val();
    var gender = $('input[name="newInstGender"]:checked').val();

    fn = fn.replace(/\s+/g, '');
    sn = sn.replace(/\s+/g, '');
    bday = bday.replace(/\s+/g, '');
    add = add.replace(/\s+/g, '');
    phone = phone.replace(/\s+/g, '');
    email = email.replace(/\s+/g, '');

    if (fn=="" || sn=="" || add=="" 
        || phone=="" || email=="" || bday=="") {
            swal("Oops!", "Please fill out all required fields.", "error");
        }
        else {
            var email = $("#newInstEmail").val();
            $("#newInstUsername").val(email);
            
            //SD: need more validation here please. i can't do it all.

            inst.registrationDetail["info"] = {
                fullname: fn + "_" + mn + "_" + sn,
                address: add,
                telno: phone,
                email: email,
                bdate: bday,
                education: educ, 
                sex: gender,
            };

            $(".defMod1Inst").removeClass("activeDefModInst");
            $(".defMod2Inst").addClass("activeDefModInst");

            $("#btnNextAddInst").hide();
            $("#btnPrevAddInst").show();
            $("#btnDoneAddInst").show();

            $(".divMod1Inst").hide();
            $(".divMod2Inst").show();
        }
}

function doneInst() {
    var un = $("#newInstUsername").val();
    var pw = $("#newInstPassword").val();
    var cpw = $("#newInstConfPassword").val();
    if (un == "" || un.length == 0 || un == null
        || pw == "" || pw.length == 0 || pw == null
        || cpw == "" || cpw.length == 0 || cpw == null) {
        swal("Oops!", "Please fill out all required fields.", "error");
    }
    else {
        if (pw == cpw) {
            swal({
                title: "Warning!",
                text: "Are you sure you want to create this instructor account?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes",
                cancelButtonText: "Cancel",
                closeOnConfirm: false,
                closeOnCancel: false
            },
                function (isConfirm) {
                    if (isConfirm) {
                        inst.registrationDetail["credential"] = {
                            username: un,
                            password: pw,
                            usertype: 2,
                        },
                        inst.register(function(err, done){
                            if(err){
                                console.error(err);
                                swal("Failed!", err.message, "error");                                
                                return 
                            }
                            swal("Success!", "Instructor account has been created!", "success");
                            $("#newInstructorModal").modal('hide');
                        });
                        //DB: Adding of new instructor here
                    }
                    else {
                        swal("Cancelled", "", "error");
                    }
                });
        }
        else {
            swal("Oops!", "Passwords do not match.", "error");
        }
    }
}

function prevInst() {
    $(".defMod2Inst").removeClass("activeDefModInst");
    $(".defMod1Inst").addClass("activeDefModInst");

    $("#btnPrevAddInst").hide();
    $("#btnDoneAddInst").hide();
    $("#btnNextAddInst").show();

    $(".divMod2Inst").hide();
    $(".divMod1Inst").show();
}

function resetSettingsInst (){
    $("#editInstAccFN").prop("disabled", true);
    $("#editInstAccMN").prop("disabled", true);
    $("#editInstAccLN").prop("disabled", true);
    $("#editInstAccBday").prop("disabled", true);
    $("#editInstAccAdd").prop("disabled", true);
    $("#editInstAccPhone").prop("disabled", true);
    $("#editInstAccEmail").prop("disabled", true);
    $("#editInstAccUN").prop("disabled", true);
    $("#editInstAccPW").prop("disabled", true);
    $("#editInstAccEduc").prop("disabled", true);
    $("#editInstAccSex").prop("disabled", true);
    $('.btnDelInstAcc').show();
    $('.btnUpdateInstAcc').show();
    $('.btnCancUpdInst').hide();
    $('.btnResetUpdInst').hide();
    $('.btnSaveUpdInst').hide();
}

function enableFields (){
    $("#editInstAccFN").removeAttr("disabled");
    $("#editInstAccMN").removeAttr("disabled");
    $("#editInstAccLN").removeAttr("disabled");
    $("#editInstAccBday").removeAttr("disabled");
    $("#editInstAccAdd").removeAttr("disabled");
    $("#editInstAccPhone").removeAttr("disabled");
    $("#editInstAccEmail").removeAttr("disabled");
    $("#editInstAccUN").removeAttr("disabled");
    $("#editInstAccPW").removeAttr("disabled");
    $("#editInstAccEduc").removeAttr("disabled");
    $("#editInstAccSex").removeAttr("disabled");
}

function updateInst (){
    enableFields();
    $('.btnDelInstAcc').hide();
    $('.btnUpdateInstAcc').hide();
    $('.btnCancUpdInst').show();
    $('.btnResetUpdInst').show();
    $('.btnSaveUpdInst').show();
}
function resetUpdInst(){
    //reset fields here
}

function cancUpdInst(){
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
            resetSettingsInst();
            resetUpdInst();
        }
        else {
            // swal("Cancelled", "", "error");
        }
    });
}

function saveUpdInst(){
    var fn = $("#editInstAccFN").val();
    var mn = $("#editInstAccMN").val();
    var sn = $("#editInstAccLN").val();
    var bday = $("#editInstAccBday").val();
    var add = $("#editInstAccAdd").val();
    var phone = $("#editInstAccPhone").val();
    var email = $("#editInstAccEmail").val();
    var educ = $('#editInstAccEduc').val();
    var sex = $('#editInstAccSex').val();
    var un = $("#editInstAccUN").val();
    var pw = $("#editInstAccPW").val();

    fn = fn.replace(/\s+/g, '');
    sn = sn.replace(/\s+/g, '');
    bday = bday.replace(/\s+/g, '');
    add = add.replace(/\s+/g, '');
    phone = phone.replace(/\s+/g, '');
    email = email.replace(/\s+/g, '');
    un = un.replace(/\s+/g, '');
    pw = pw.replace(/\s+/g, '');

    if (fn=="" || sn=="" || add=="" 
        || phone=="" || email=="" || bday==""
        || un=="" || pw==""){
            swal("Oops!", "Please fill out all required fields.", "error");
        }
    else{
        //SD: VALIDATIONS!!!! please pafilter mabuti ng mga data,

        var data = {
            fullname: fn + "_" + mn + "_" + sn,
            address: add,
            telno: phone,
            bdate: bday,
            sex: sex,
            email: email,
            education: educ,
            username: un,
            password: pw, 
        };
        inst.update(data, function(err, done){
            if(err){
                swal("Failed!", err.message, "error");                
            }else{
                swal("Success!", "Instructor account is updated successfully!", "success");
                resetSettingsInst();
            }
        });
        //DB: Update instructor account function
    }
}

function resignInst(){
    //gagawin ko pang minimum date yung araw na na-hire sya, ex: May 17 sya na-hire, bawal sya ma-fire ng May 16. Kaya di pa tapos
    var resDate = $('#instResign').val();
    if (resDate=="" || resDate.length==0 ||resDate==null){
        swal("Oops!", "Please enter the resignation date.", "error");
    }else{
        inst.delete(resDate,function(err, done){
            if(err){
                swal("Failed!", err.message, "error");                
            }else{
                swal("Success!", "Instructor accout has been removed.", "success");
                $('#confResignModal').modal('hide');
                $('.divResigned').show();
                $('.instDateResigned').html(resDate); //babaguhin ko pa format nito to MM-DD-YYYY (ex: May 19, 2018)                
            }
        });
        //DB: Delete/Resign function here then go back to instructor list
        //DB: As of now, idagdag mo pa rin sya sa table pero dapat sa dulo sya malalagay tas yung status nya: Resigned
        //DB: Iniisip ko pa kasi kung gagawan ko pa sya ng bagong table, sabi kasi ni sir wag na.
        //DB: Tsaka yung sa view profile ng resigned, dapat iba na laman. Wala na dapat sched, pero may evaluation pa rin.
        //Wala na rin dapat settings. Or activate account? Basta. Wag mo muna intindihin yun.
    }
}

var renderInstTablePage = function (data) {
    var html = "";
    var counter = 1;
    data.forEach(element => {
        var status = (element.vacant == Date.parse("today").toString('dddd') ? "<span class='badge badge-danger'>Day Off</span>" : element.status == 1 ? "<span class='badge badge-success'>Available</span>" : element.status == 2 ? "<span class='badge badge-warning'>In session</span>" : "<span class='badge badge-danger'>Resigned</span>");
        html += "<tr onclick='viewInstProfile(\""+ element.instID +"\")'>";
        html += "<td>" + counter + "</td>";
        html += "<td>" + (element.fullname.replace(/_/g," ")) + "</td>";
        html += "<td>" + status + "</td>";
        html += "</tr>";
        counter++;
    });
    $('#instructorTable').html(html); 
}

var viewInstProfile = function(id){
    inst.selected = id;
    renderInstEdit();
    inst.getLocalData(function(profile){
        $('.instNum').html(profile.instID);
        $('.instName').html(profile.fullname.replace(/_/g,' '));
        $('.instAddress').html(profile.address);
        $('.instPhone').html(profile.telno);
        $('.instEmail').html(profile.email);
        $('.instDateHired').html(Date.parse(profile.dateRegistered).toString("MMM d, yyyy"));
    });
}

var renderInstEdit = function(){
    inst.getLocalData(function(profile){
        var name = profile.fullname.split("_");
        $('#editInstAccFN').val(name[0]);        
        $('#editInstAccMN').val(name[1]);        
        $('#editInstAccLN').val(name[2]);        
        $('#editInstAccSex').val(profile.sex);        
        $('#editInstAccBday').val(Date.parse(profile.birthdate).toString("yyyy-MM-dd"));        
        $('#editInstAccPhone').val(profile.telno);            
        $('#editInstAccEmail').val(profile.email);            
        $('#editInstAccAdd').val(profile.address);            
        $('#editInstAccEduc').val(profile.educAttain);            
    });
}