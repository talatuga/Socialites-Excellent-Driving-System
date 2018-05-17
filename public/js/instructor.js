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
});

$(".backInst").on("click", function() { //when back button is clicked (right side of instructor information)
    $('.view-viewInstructor').hide();
    $('.view-instructor').show();
});

$(".btnDelInstAcc").on("click", function() { //opens confirmation modal upon clicking delete account. UNDONE.
    $('#confirmDeleteInstructor').modal('show');
});

$(".btnUpdateInstAcc").on("click", function() { //opens confirmation modal upon clicking update account. UNDONE.
    $('#confirmDeleteInstructor').modal('show');
});

function nextInst ()
{
    var fn = $("#newInstFirstname").val();
    var ln = $("#newInstSurname").val();
    var bday = $("#newInstBday").val();
    var add = $("#newInstAddress").val();
    var phone = $("#newInstPhone").val();
    var email = $("#newInstEmail").val();
    if (fn == "" || fn.length == 0 || fn == null
        || ln == "" || ln.length == 0 || ln == null
        || bday == "" || bday.length == 0 || bday == null
        || add == "" || add.length == 0 || add == null
        || phone == "" || phone.length == 0 || phone == null
        || email == "" || email.length == 0 || email == null) {
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