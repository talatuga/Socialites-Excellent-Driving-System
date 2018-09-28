$(function(){
    clrSearchAccount();
    accountLoaded = 0;
});

var accountLoaded;
var loadAccount = function(){
    if(accountLoaded < 3){
        $(".preloader").fadeIn();          
        acc.getList(function(err){
            if(err) return console.error(err);
            var data = acc.pages[acc.currTbl];
            if(data.length != 0){
                renderAccTbl(data[acc.currPage[acc.currTbl]]);            
                accountLoaded++;
            }else{
                renderAccTbl([]);                            
            }
            $(".preloader").fadeOut();              
        });
    }
}

function updateAcc(id){
    $('#btnConfAddAccount').hide();
    $('#btnCancAddAccount').show();
    $('#btnConfResetAccount').show();
    $('#btnConfEditAccount').show();
    resetAccount();
    acc.selected = id;
    acc.getLocalData(function(profile){
        $('#editUNAcc').val(profile.username);
    });
    $('#updateAccModal').modal('show');
}

function clrSearchAccount(){
    $('#searchAccount').val("");
}

function confResetAccount(){
    //DB: Reset fields here
}

function confEditAccount(){
    var a, b, c;
    var un = $('#editUNAcc').val();
    var pw = $('#editPWAcc').val();
    var cpw = $('#editCPWAcc').val();

    a = un.replace(/\s+/g, '');
    b = pw.replace(/\s+/g, '');
    c = cpw.replace(/\s+/g, '');

    if (a=="" && b=="" && c==""){
        swal("Oops!", "Please fill out all required fields.", "error");
    }
    else{
        if (b!="" && c!=""){
            if (pw==cpw){
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
                        var data = {
                            username: un,
                            password: pw,
                            type: (acc.currTbl + 1)
                        }
                        acc.update(data, function(err){
                            if(err){
                                console.error(err);
                                swal("Failed!", err.message, "error");
                            }else{
                                swal("Success!", "Account is updated successfully!", "success");
                                $('#updateAccModal').modal('hide');       
                                resetAccount();
                                //DB: Update account function here
                            }
                        });
                    }
                });
            }
            else{
                swal("Oops!", "Passwords do not match!", "error");
            }
        }
        else if (b=="" && c==""){
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
                    var data = {
                        username: un,
                        password: pw,
                        type: (acc.currTbl + 1)
                    }
                    console.log(data);
                    acc.update(data, function(err){
                        if(err){
                            console.error(err);
                            swal("Failed!", err.message, "error");
                        }else{
                            swal("Success!", "Account is updated successfully!", "success");
                            $('#updateAccModal').modal('hide');                            
                            //DB: Update account function here
                        }
                    });
                }
            });
        }
        else{
            swal("Oops!", "Please fill out all required fields.", "error");
        }
    }
}

function resetAccount(){
    $('#editUNAcc').val("");
    $('#editPWAcc').val("");
    $('#editCPWAcc').val("");
}

function deactAcc(id){
    acc.selected = id;
    swal({
        title: "Warning!",
        text: "Are you sure you want to deactivate this account?",
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
            acc.delete(function(err){
                if(err){
                    console.error(err);
                    swal("Failed!", err.message, "error");
                }else{
                    swal("Success!", "Account is now deactivated.", "success");
                    resetAccount();
                    //DB: Deactivate account function here
                }
            })
        }
    });
}

var renderAccTbl = function(data){
    var html = "";
    data.forEach(element => {
        html += "<tr>";
        html += "<td>"+ element.accID +"</td>";
        html += "<td>"+ element.username +"</td>";
        html += "<td><button type='button' onclick='deactAcc("+ element.id +")' class='btnCstom1 btn btn-danger m-b-10 m-l-5'>Deactivate</button></td>";
        html += "<td><button type='button' onclick='updateAcc("+ element.id +")' class='btnCstom1 btn btn-success m-b-10 m-l-5'>Update</button></td>";
        html += "</tr>";
    });
    var table = acc.currTbl == 0 ? "adminAccTbl" : acc.currTbl == 1 ? "instAccTbl" : acc.currTbl == 2 ? "studAccTbl" : "";
    $("#"+table).html(html);
}

var selectInstTbl = function(id){
    acc.currTbl = id;
    loadAccount();
}