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
    $('.h6AddBranch').html("ADD NEW BRANCH");
    $('#btnConfEditBranch').hide();
    $('#btnCancAddBranch').show();
    $('#btnConfAddBranch').show();
    
}

function addBranch(){
    resetAddBranch();
    $('#addBranchModal').modal('show');
}