
function viewReceipt(){
    $('.invoiceLink').attr('href','api/v1/web/invoice?orno=' + invoiceLink + '&fullname=' + name);
}