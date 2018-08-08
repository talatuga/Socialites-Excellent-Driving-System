function dtpMaint(){ //when maintenance button is clicked
    $('.viewDiv').hide();
    $('.view-dtpMaintenance').show();
}

$('.back').on('click', function(){ 
    $('.viewDiv').hide();
    $('.view-dtp').show();
});

function dtpAddProgram(){ //when add new program is clicked. assign program number here
    $('#newDtpDur').val("");
    $('#newDtpPrice').val("");
    $('#newDtpDesc').val("");
    $('#addDTPmodal').modal("show");
}

function addNewProgram(){ //when add btn is clicked (add new program dtp modal)
    var x = $('#newDtpDur').val();
    var y = $('#newDtpPrice').val();
    var z = $('#newDtpDesc').val();

    if ((x==0 || x.replace(/0/g, ' ')=="" || x=="" || x.length==0) || (y==0 || y.replace(/0/g, ' ')=="" || y=="" || y.length==0) || (z.replace(/ /g, '')=="")){
        swal("Oops!", "Please fill out all required fields!" ,"error");
    }else{
        //DB: Add new program function here
        swal("Success!", "New program has been succesfully added!" ,"success");
        $('#addDTPmodal').modal("hide");
    }
}

function editDtpMain(){ //when edit btn is clicked in table
    $('#newDtpDur').val("");
    $('#newDtpPrice').val("");
    $('#newDtpDesc').val("");
    $('#editDTPmodal').modal("show");
}

function saveEditLic(){ //when save btn is clicked (edit program modal)
    var x = $('#newDtpDur').val();
    var y = $('#newDtpPrice').val();
    var z = $('#newDtpDesc').val();

    if ((x==0 || x.replace(/0/g, ' ')=="" || x=="" || x.length==0) || (y==0 || y.replace(/0/g, ' ')=="" || y=="" || y.length==0) || (z.replace(/ /g, '')=="")){
        swal("Oops!", "Please fill out all required fields!" ,"error");
    }else{
        //DB: Edit program function here
        swal("Success!", "Changes have been saved!" ,"success");
        $('#editDTPmodal').modal("hide");
    }
}

function delDtpMain(){ //when delete button is clicked in license maintenance table
    swal({
        title: "Are you sure?",
        text: "Delete this program?",
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
            //DB: Delete program function here
            swal("Success!", "Successfully deleted the program from the database!" ,"success");
        }
    });
}