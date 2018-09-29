var transferModalLoaded = 0;
function transferReq(){
    if(transferModalLoaded == 1) return $('#transferBranchModal').modal("show");
    var branchID = $('body').data('branch');
    app.others.getBranchName(branchID, function(err,branch){
        if(err) return console.error(err);
        $('#txtBranchFrom').val("SED-"+branch);
    });
    app.others.getBranchList(function(err, branch){
        if(err) return console.error(err);
        if(branch.length == 0) return;
        var html = "";
        branch.forEach((element,index) => {
            if(element.id == branchID) return;
            html += "<option value='"+ element.id +"'>"+ element.name +"</option>";
        });
        transferModalLoaded = 1;
        $(".selTransferBranch").html(html);
        $(".selTransferBranch").val($(".selTransferBranch option:first").val());
        $('#transferBranchModal').modal("show");
    })
    $('#txtTransferDate').val("");
    $('#txtTransferDate').attr("min", Date.parse("today").addDays(2).toString("yyyy-MM-dd"));
}

var transferListLoaded = 0;
function transferList(cb){
    if(transferListLoaded == 1) return cb();
    app.account.transfer.transferList(function(err, list){
        if(err) return console.error(err);
        transferListLoaded = 1;
        if(list.length != 0) $('.noTransTr').hide();
        $('#transferRec').html('');
        list.forEach((e,i)=>{
            var task1 = new Promise((resolve, reject)=>{
                app.others.getBranchName(e.from_branchID, function(err, name){
                    if(err) return reject(err);
                    resolve(name);
                });
            });
            var task2 = new Promise((resolve, reject)=>{
                app.others.getBranchName(e.to_branchID, function(err, name){
                    if(err) return reject(err);
                    resolve(name);
                });
            });
            Promise.all([task1, task2]).then(result=>{
                var html = "<tr>";
                html += "<td>"+ Date.parse(e.request_date).toString('MMM dd, yyyy') +"</td>";
                html += "<td>"+ result[0] +"</td>";
                html += "<td>"+ result[1] +"</td>";
                html += "<td>"+ Date.parse(e.effectiveDate).toString('MMM dd, yyyy') +"</td>";
                html += "<td>"+ (e.status == 1 ? ("<span onclick='cancelTransfer("+ e.id +")'>Pending</span>") : e.status == 2 ? "Approved" : e.status == 3 ? "Rejected" : e.status == 5 ? "Cancelled" : "Done") +"</td>";
                html += "</tr>";
                $('#transferRec').append(html);
            });
            if(i==list.length-1) cb();
        });
    });
}

function cancelTransfer(id){
    swal({
        title: "Warning!",
        text: "Are you sure you want to cancel this transfer request?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        closeOnConfirm: false,
        closeOnCancel: true
    },function(conf){
        if(conf){
            app.account.transfer.cancelRequest(id, function(err, detail){
                if(err){
                    swal('Failed!', err.message, 'error');
                }else{
                    swal('Success!', detail, 'success');
                    transferListLoaded = 0;
                    transferList(()=>{});
                }
            });
        }
    });
}

function submitTransReq(){
    swal({
        title: "Warning!",
        text: "Are you sure you want to submit this transfer request?",
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
            //DB: Submit transfer request
            var date = $('#txtTransferDate').val();
            var targetBranch = $(".selTransferBranch").val();
            
            if(date == ""){
                swal("Failed!", "Select Date.", "error");
            }else{
                app.account.transfer.submitRequest(targetBranch, date, function(err, detail){
                    if(err){
                        swal("Failed!", err.message, "error");
                    }else{
                        swal("Success!", detail, "success");
                        transferListLoaded = 0;
                        transferList(()=>{});
                    }
                    $('#transferBranchModal').modal('hide');
                });
            }
        }
    });
}