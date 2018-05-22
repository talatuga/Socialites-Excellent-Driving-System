$(function () {
    clrSearchReq();
    $('.tblReqClass tbody tr:first').addClass("highlightTr");
    $('.tblReqClass tbody tr').click(function () {
        var selected = $(this).hasClass("highlightTr");
        $('.tblReqClass tbody tr').removeClass("highlightTr");
        if (!selected)
            $(this).addClass("highlightTr");
            
    });
});

function clrSearchReq(){
    $('#searchReq').val("");
}