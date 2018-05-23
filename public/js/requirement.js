var selectedReqCls;

var loadReq = function () {
    clrSearchReq();
    $('.btnDelReq').hide();
    $('.hideTh').hide();
    $('#btnCancEditReq').hide();
    $('#btnSaveEditReq').hide();
    $('#editSelReqClass').hide();
    $('.selectedReqClass').show();
    $('.tblReqEditable').removeAttr('contentEditable');
    
    $('.tblReqClass tbody tr:first').addClass("highlightTr");
    $('.tblReqClass tbody tr').click(function () {
        var selected = $(this).hasClass("highlightTr");
        $('.tblReqClass tbody tr').removeClass("highlightTr");
        if (!selected)
            $(this).addClass("highlightTr");
    });
}

function clrSearchReq(){
    $('#searchReq').val("");
}

function delClReq(){
    swal({
        title: "Warning!",
        text: "Are you sure you want to remove this requirement classification?",
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
            swal("Success!", "Requirement classification has been removed!", "success");
            //DB: Removing of req classification function here
        }
    });
}

function editClReq(){
    $('.btnDelReq').show();
    $('.hideTh').show();
    $('.tblReqEditable').attr('contentEditable', true);
    $('#btnCancEditReq').show();
    $('#btnSaveEditReq').show();
    $('#editSelReqClass').show();
    $('.selectedReqClass').hide();
    selectedReqCls = $('.selectedReqClass').html();
    $('#editSelReqClass').val(selectedReqCls);
}

function delReq(){
    swal({
        title: "Warning!",
        text: "Are you sure you want to remove this requirement?",
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
            swal("Success!", "Requirement has been removed!", "success");
            //DB: Removing of requirement function here
        }
    });
}

function addReqClass(){
    $('#btnConfAR').hide();
    $('#btnConfARC').show();
    $('.divReq2').hide();
    $('.divReq1').show();
    $('#reqModalTitle2').hide();
    $('#reqModalTitle').show();
    $('#newReqClsName').val("");
    $('#addReqClassModal').modal('show');
}

function addClReq(){
    $('#btnConfAR').show();
    $('#btnConfARC').hide();
    $('.divReq1').hide();
    $('.divReq2').show();
    $('#reqModalTitle').hide();
    $('#reqModalTitle2').show();
    $('#newReqName').val("");
    $('#addReqClassModal').modal('show');
}

function confAddReqCls(){
    var reqCls = $('#newReqClsName').val();
    var a = reqCls.replace(/\s+/g, '');
    if (a=="") swal("Oops!", "Please fill out all requirements!", "error");
    else{
        swal({
            title: "Warning!",
            text: "Are you sure you want to add this requirement classification?",
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
                swal("Success!", "Requirement classification has been added!", "success");
                $('#addReqClassModal').modal('hide');
                //DB: Adding of requirement classification function here
            }
        });
    }
}

function confAddReq(){
    var req = $('#newReqName').val();
    var a = req.replace(/\s+/g, '');
    if (a=="") swal("Oops!", "Please fill out all requirements!", "error");
    else{
        swal({
            title: "Warning!",
            text: "Are you sure you want to add this requirement?",
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
                swal("Success!", "Requirement has been added!", "success");
                $('#addReqClassModal').modal('hide');
                //DB: Adding of requirement function here
            }
        });
    }
}

function cancEditReq(){
    selectedReqCls = $('.selectedReqClass').html();
    swal({
        title: "Cancel?",
        text: "Are you sure you want to discard the changes?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function(isConfirm){
        if (isConfirm) {
            $('#editSelReqClass').val(selectedReqCls);
            $('.btnDelReq').hide();
            $('.hideTh').hide();
            $('.tblReqEditable').removeAttr('contentEditable');
            $('#btnCancEditReq').hide();
            $('#btnSaveEditReq').hide();
            $('#editSelReqClass').hide();
            $('.selectedReqClass').show();
            //DB: Discard changes function here
        }
    });
}

function saveEditReq(){
    var newReq =  $('#editSelReqClass').val();
    var a = newReq.replace(/\s+/g, '');
    if (a=="") swal("Oops!", "Please enter a requirement name.", "error");
    else{
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
                swal("Success!", "Requirement class has been updated!", "success");
                $('.btnDelReq').hide();
                $('.hideTh').hide();
                $('.tblReqEditable').removeAttr('contentEditable');
                $('#btnCancEditReq').hide();
                $('#btnSaveEditReq').hide();
                $('#editSelReqClass').hide();
                $('.selectedReqClass').html(newReq);
                $('.selectedReqClass').show();
                //DB: Updating of requirement class function here
            }
        });
    }
}