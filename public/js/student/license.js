$(function (){
    Number.prototype.formatMoney = function(c, d, t){
        var n = this, 
        c = isNaN(c = Math.abs(c)) ? 2 : c, 
        d = d == undefined ? "." : d, 
        t = t == undefined ? "," : t, 
        s = n < 0 ? "-" : "", 
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
        j = (j = i.length) > 3 ? j % 3 : 0;
       return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };
    var id = $(".selListofLicense option:first").val();
    id = "#selListofLicense" + id;
    var price = $(id).data('price');
    $('#priceLicToApply').val(parseFloat(price).formatMoney(2));

    $(".selListofLicense").change(function() {
        id = $(this).children(":selected").attr("id");
        id = "#" + id;
        price = $(id).data('price');
        $('#priceLicToApply').val(parseFloat(price).formatMoney(2));
    });
});

function applyLicense(){
    $('#licenseApplyModal').modal('show');
}

function doneApplyLicense(){
    swal({
        title: "Are you sure?",
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
            swal("Success!", "This request is now added to list of licenses to be processed!" ,"success");
            $('#licenseApplyModal').modal('hide');
            $('.noRequest').hide();
            $('.hasRequested').show();
        }
    });
}