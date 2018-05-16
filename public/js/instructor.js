var instData = [];
var currentInstPage = {
    offset: 0,
    limit: 10,
}

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

$(function(){
    $("#btnNewInstructor").on("click", function() { //opens add instructor modal
        $('#newInstructor').modal('show');
    });
    
    $("#btnConfAddInstr").on("click", function() { //conditions upon clicking add instructor button
        var fn = $("#newInstFirstname").val();
        var mn = $("#newInstMidname").val();
        var ln = $("#newInstSurname").val();
        var bday = $("#newInstBday").val();
        var add = $("#newInstAddress").val();
        var phone = $("#newInstPhone").val();
        var email = $("#newInstEmail").val();
        var sex = $("input[name='newInstGender']:checked").val();
        if (fn == "" || fn.length == 0 || fn == null
            || ln == "" || ln.length == 0 || ln == null
            || bday == "" || bday.length == 0 || bday == null
            || add == "" || add.length == 0 || add == null
            || phone == "" || phone.length == 0 || phone == null
            || email == "" || email.length == 0 || email == null) {
                swal("Oops!", "Please fill out all required fields.", "error");
        }else {
            //$('#confirmAddInstructor').modal('toggle'); //will open confirmation modal when all conditions are met
            swal({
                    title: "Are you sure?",
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    closeOnConfirm: false
                },
                function(){
                    var data = [fn + "_" + mn + "_" + ln, add, phone, bday, sex, email];
                    regInstructor(data, function(response){
                        if(response.error){
                            swal("Failed!", response.detail, "error");                    
                        }else{
                            swal("Success!", "Instructor has been added to database!", "success");
                            $('#newInstructor').modal("hide");        
                        }
                    });
                }
            );
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
        $(".preloader").fadeIn();
        $('.view-instructor').hide();
        //BackEnd: Schedule load here.
        renderInstEdit();
        loadEval('inst');
        $('.view-viewInstructor').show();        
        $(".preloader").fadeOut();            
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

    getInstructorList(currentInstPage.offset, currentInstPage.limit, function(response){
        if(response.error){
            console.log("Failed to fetch data from server. " + response.detail);
        }else{
            renderInstPage(response.data);
        }
    });
});

var regInstructor = function(_data, cb){
    $.post('api/v1/instructor', {data: _data}, cb);
}

var editInstructor = function(id, _data, successCB, failCB){
    $.ajax({
        type: "PUT",
        url: 'api/v1/instructor/' + id,
        data: _data,
        sucess: successCB,
        error: failCB
    });
}

var getInstructorList = function(offset, limit, cb){
    $.get('api/v1/instructor?offset='+ offset +"&limit="+ limit, function(response){
        response.data.forEach(x=>{
            instData.push(x);
        });
        cb(response);
    });
}

var renderInstPage = function(data){
    if(data.length == 0){

    }else{
        var html = "";
        data.forEach(element => {
            html += "<tr onclick='viewInstBriefDetail(\""+ element.id +"\")'>" 
            html += "<td>"+ element.id +"</td>"
            html += "<td>"+ element.fullname.replace(/_/gi, " ") +"</td>"
            html += "<td>"+ element.status +"</td>"
            html += "</tr>"
        });
        $("#instructorTable").html(html);
    }
}

var viewInstBriefDetail = function(id){
    $.get('api/v1/instructor/' + id, function(response){
        if(response.error){
            console.log(response.detail);
        }else{
            var data = response.data
            $('.instNum').html(data.id);
            $('.instName').html(data.fullname.replace(/_/gi, " "));
            $('.instAddress').html(data.address);
            $('.instPhone').html(data.telno);
            $('.instEmail').html(data.email);
        }
    });
}

var renderInstEvaluation = function(data){
    if(data.length == 0){

    }else{
        //SD: rendering nalang kulang.
    }
}

var renderInstEdit = function(){
    var id = $('.instNum').html();
    var render = function(data){
        var name = data.fullname.split('_');
        $('#editInstAccFN').val(name[0]);
        $('#editInstAccMN').val(name[1]);
        $('#editInstAccLN').val(name[2]);
        $('#editInstAccSex').val(data.sex);
        $('#editInstAccBday').val(data.birthdate.split('T')[0]);
        $('#editInstAccAdd').val(data.address);
        $('#editInstAccPhone').val(data.telno.replace(/-/gi,''));
        $('#editInstAccEmail').val(data.email);
    }
    instData.forEach(x=>{
        if(x.id == id){
            render(x);
        }
    });
}

var updateInst = function(){
    var id = $('.instNum').html();

    var name = $('#editInstAccFN').val() + "_" + $('#editInstAccMN').val() + "_" + $('#editInstAccLN').val();
    var sex = $('#editInstAccSex').val();
    var bdate = $('#editInstAccBday').val();
    var add = $('#editInstAccAdd').val();
    var phone = $('#editInstAccPhone').val();
    var _email = $('#editInstAccEmail').val();
    var pass = $('#editInstAccPW').val();

    //SD: First level Validations, may validation sa back-end pero dapat meron din sa front.

    var _data = {
        fullname: name,
        gender: sex,
        birthdate: bdate,
        address: add,
        telno: phone,
        email: _email
    }

    //Confirm Action.
    swal({
        title: "Are you sure?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        closeOnConfirm: false
    }, function(){
        //
        instData.forEach(x=>{
            if(x.id == id){
                if(x.usrAcc == null){
                    createAcc();
                }
            }
        });
        //Call the editInstructor function that contains the server communication.
        editInstructor(id, _data, onSuccess, onError);
    });

    var onSuccess = function(response){
        swal("Done!", response.detail, "success");
    }
    var onError = function(err){
        swal("Failed!", "Something went wrong! Try again later.", "error");
    }
}

var delInst = function(){
    swal({
        title: "Are you sure?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        closeOnConfirm: false
    }, function(){

    });
}