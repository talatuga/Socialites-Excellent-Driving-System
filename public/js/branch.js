$(function () {
    clrSearchBranch();
    $('.tblBranches tbody tr:first').addClass("highlightTr");
    $('.tblBranches tbody tr').click(function () {
        var selected = $(this).hasClass("highlightTr");
        $('.tblBranches tbody tr').removeClass("highlightTr");
        if (!selected)
            $(this).addClass("highlightTr");
    });
});

function clrSearchBranch(){
    $('#searchBranch').val("");
}

function resetAddBranch(){
    $('#brName').val("");
    $('#brAddL1').val("");
    $('#brAddL2').val("");
    $('#brCity').val("");
    $('#brProv').val("");
    $('#brZip').val("");
    $('#brTel1').val("");
    $('#brTel2').val("");    
}

function addBranch(){
    resetAddBranch();
    $('.h6AddBranch').html("ADD NEW BRANCH");
    $('#btnConfResetBranch').hide();
    $('#btnConfEditBranch').hide();
    $('#btnCancAddBranch').show();
    $('#btnConfAddBranch').show();
    $('#addBranchModal').modal('show');
}

function editBranch(){
    resetAddBranch();
    $('.h6AddBranch').html("UPDATE BRANCH");
    $('#btnConfAddBranch').hide();
    $('#btnCancAddBranch').show();
    $('#btnConfResetBranch').show();
    $('#btnConfEditBranch').show();
    $('#addBranchModal').modal('show');
    //DB: Place data for every fields here
}

function confAddBranch(){
    var isCheckBr = fieldCheck();
    if (isCheckBr=="0")             
        swal("Oops!", "Please fill out all required fields.", "error");
    else{
        swal({
            title: "Warning!",
            text: "Are you sure you want to create this branch?",
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
                swal("Success!", "New branch has been added!", "success");
                $('#addBranchModal').modal('hide');
                //DB: Adding of branch here
            }
        });
    }
}

function confEditBranch(){
    var isCheckBr = fieldCheck();
    if (isCheckBr=="0")             
        swal("Oops!", "Please fill out all required fields.", "error");
    else{
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
                swal("Success!", "Changes has been saved!", "success");
                $('#addBranchModal').modal('hide');
                //DB: Updating of branch here
            }
        });
    }
}

function confResetBranch(){
    //Reset fields here
}

function confCancAddBranch(){
    swal({
        title: "Warning!",
        text: "Are you sure you want to discard the changes?",
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
            $('#addBranchModal').modal('hide');
            swal("Cancelled!", "", "error");
            //DB: Cancel changes here
        }
    });
}

function remBranch(){
    swal({
        title: "Warning!",
        text: "Are you sure you want to remove this branch?",
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
            $('#addBranchModal').modal('hide');
            swal("Success!", "Branch is successfully removed!", "success");
            //DB: Remove branch function here
        }
    });
}

function fieldCheck(){
    var a, b, c, d, e, f, g, h;
    var name = $('#brName').val();
    var al1 = $('#brAddL1').val();
    var al2 = $('#brAddL2').val();
    var city = $('#brCity').val();
    var prov = $('#brProv').val();
    var zip = $('#brZip').val();
    var tel1 = $('#brTel1').val();
    var tel2 = $('#brTel2').val();

    a = name.replace(/\s+/g, '');
    b = al1.replace(/\s+/g, '');
    c = al2.replace(/\s+/g, '');
    d = city.replace(/\s+/g, '');
    e = prov.replace(/\s+/g, '');
    f = zip.replace(/\s+/g, '');
    g = tel1.replace(/\s+/g, '');
    h = tel2.replace(/\s+/g, '');

    if (a=="" || d=="" || e=="" || f=="") return "0";
    else{
        if (b=="" && c=="") return "0";
        else if (g=="" && h=="") return "0";
        else return "1";
    }
}