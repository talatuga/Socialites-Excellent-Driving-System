function resetConfNewInstr () //resets fields on confirm add instructor
{
    $("#confPass").val("");
}

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
}

$("#btnNewInstructor").on("click", function() { //opens add instructor modal
    $('#newInstructor').modal('show');
});

$("#btnConfAddInstr").on("click", function() { //conditions upon clicking add instructor button
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
            $('#confirmAddInstructor').modal('toggle'); //will open confirmation modal when all conditions are met
        }
});

$("#btnConfConfAI").on("click", function() { //conditions on password input upin confirmation
    var pass = $("#confPass").val();
    if (pass == "" || pass.length == 0 || pass == null) {
            swal("Oops!", "Please fill out all required fields.", "error");
        }
    // else if {
        // swal("Oops!", "Incorrect password.", "error");
    //     alert ('Conditions and validations here.'); //DB: Conditions and validations here.
    // }
    else{
        swal("Success!", "Instructor has been added to database!", "success");
        $('#confirmAddInstructor').modal("hide");
        $('#newInstructor').modal("hide");
    }
});

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
