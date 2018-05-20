var instData = [];
var currentInstPage = {
    offset: 0,
    limit: 10,
}

$("#btnNewInstructor").on("click", function() { //opens add instructor modal
    resetNewInstr();
    $('#newInstructorModal').modal('show');
});

function resetNewInstr () //resets fields on add instructor modal
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

$("#btnViewInstructor").on("click", function() { //opens view instructor page upon clicking view details
    $('.view-instructor').hide();
    $('.view-viewInstructor').show();
    resetSettingsInst();
});

$(".backInst").on("click", function() { //when back button is clicked (right side of instructor information)
    $('.view-viewInstructor').hide();
    $('.view-instructor').show();
});

function nextInst ()
{
    var fn = $("#newInstFirstname").val();
    var sn = $("#newInstSurname").val();
    var bday = $("#newInstBday").val();
    var add = $("#newInstAddress").val();
    var phone = $("#newInstPhone").val();
    var email = $("#newInstEmail").val();
    var educ = $('select[name="newInstEduc"]').val();

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
            
            $(".defMod1Inst").removeClass("activeDefModInst");
            $(".defMod2Inst").addClass("activeDefModInst");

            $("#btnNextAddInst").hide();
            $("#btnPrevAddInst").show();
            $("#btnDoneAddInst").show();

            $(".divMod1Inst").hide();
            $(".divMod2Inst").show();
        }
}

function doneInst ()
{
    var un = $("#newInstUsername").val();
    var pw = $("#newInstPassword").val();
    var cpw = $("#newInstConfPassword").val();
    if (un == "" || un.length == 0 || un == null
        || pw == "" || pw.length == 0 || pw == null
        || cpw == "" || cpw.length == 0 || cpw == null) {
            swal("Oops!", "Please fill out all required fields.", "error");
        }
        else {
            if (pw == cpw)
            {
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
                function(isConfirm){
                    if (isConfirm) {
                        swal("Success!", "Instructor account has been created!", "success");
                        $("#newInstructorModal").modal('hide');
                        //DB: Adding of new instructor here
                    }
                    else {
                        swal("Cancelled", "", "error");
                    }
                });
            }
            else
            {
                swal("Oops!", "Passwords do not match.", "error");
            }
        }
}

function prevInst ()
{
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
        title: "Discard changes?",
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
    var ln = $("#editInstAccLN").val();
    var bday = $("#editInstAccBday").val();
    var add = $("#editInstAccAdd").val();
    var phone = $("#editInstAccPhone").val();
    var email = $("#editInstAccEmail").val();
    var un = $("#editInstAccUN").val();
    var pw = $("#editInstAccPW").val();
    var educ = $('select[name="editInstAccEduc"]').val();
    var sex = $('select[name="editInstAccSex"]').val();

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
        swal("Success!", "Instructor account is updated successfully!", "success");
        resetSettingsInst();
        //DB: Update instructor account function
    }
}

function resignInst(){
    //gagawin ko pang minimum date yung araw na na-hire sya, ex: May 17 sya na-hire, bawal sya ma-fire ng May 16. Kaya di pa tapos
    var resDate = $('#instResign').val();
    if (resDate=="" || resDate.length==0 ||resDate==null){
        swal("Oops!", "Please enter the resignation date.", "error");
    }else{
        swal("Success!", "Instructor accout has been removed.", "success");
        $('#confResignModal').modal('hide');
        $('.divResigned').show();
        $('.instDateResigned').html(resDate); //babaguhin ko pa format nito to MM-DD-YYYY (ex: May 19, 2018)
        //DB: Delete/Resign function here then go back to instructor list
        //DB: As of now, idagdag mo pa rin sya sa table pero dapat sa dulo sya malalagay tas yung status nya: Resigned
        //DB: Iniisip ko pa kasi kung gagawan ko pa sya ng bagong table, sabi kasi ni sir wag na.
        //DB: Tsaka yung sa view profile ng resigned, dapat iba na laman. Wala na dapat sched, pero may evaluation pa rin.
        //Wala na rin dapat settings. Or activate account? Basta. Wag mo muna intindihin yun.
    }
}