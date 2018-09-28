$(function () {
    clrSearchBranch();
    $('#searchBranch').on('click', function(e){
        search.init(office.pages[office.currPage], ["branchID","name"], function(data){
            renderBranchTable(data);
        });
    });
    $('#searchBranch').on('keyup', function(e){
        search.keypress($('#searchBranch').val());
    });
    loadBranch();
});

var branchLoaded = 0;
var loadBranch = function(cb){
    var callback = cb;
    if(branchLoaded == 0){
        $(".preloader").fadeIn();  
        office.getList(function(err, data){
            if(err){
                swal("Failed!",err.message,"error");
            }else{
                branchLoaded = 1;
                renderBranchTable(office.pages[office.currPage]);
                $('.tblBranches tbody tr:first').addClass("highlightTr");
                $('.tblBranches tbody tr').click(function () {
                    var selected = $(this).hasClass("highlightTr");
                    $('.tblBranches tbody tr').removeClass("highlightTr");
                    if (!selected)
                    $(this).addClass("highlightTr");
                });
                viewBranchProfile(office.pages[office.currPage][0].id);
                $(".preloader").fadeOut();                  
                $('.enrBranch').html("");
                office.pages[office.currPage].forEach(x=>{
                    $('.enrBranch').append("<option value='"+ x.id +"'>"+ x.name +"</option>");
                });
                if(callback){
                    console.log("wtf?")
                    callback();
                };
            }
        });        
    }
}

function clrSearchBranch(){
    $('#searchBranch').val("");
}

function resetAddBranch(edit){
    $('#brName').val("");
    $('#brAddL1').val("");
    $('#brAddL2').val("");
    $('#brCity').val("");
    $('#brProv').val("");
    $('#brZip').val("");
    $('#brTel1').val("");
    $('#brTel2').val("");   
    if(edit){
        office.getLocalData(function(profile){
            var telno = profile.telno.split("/");
            var address = profile.address.split("_");
            $('#brName').val(profile.name);
            $('#brAddL1').val(address[0]);
            $('#brAddL2').val(address[1]);
            $('#brCity').val(address[2]);
            $('#brProv').val(address[4]);
            $('#brZip').val(address[3]);
            $('#brTel1').val(telno[0]);
            $('#brTel2').val(telno[1]==undefined?"":telno[1]);  
        });
    } 
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
    resetAddBranch(true);
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
                getBranchFormData(function(ok, data){
                    office.add(data, function(err){
                        if(err){
                            console.error(err);
                            swal("Failed!", err.message, "error");                        
                        }else{
                            swal("Success!", "New branch has been added!", "success");
                            $('#addBranchModal').modal('hide');
                        }
                    });
                });
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
                getBranchFormData(function(ok, data){
                    if(ok){
                        console.log(data);
                        office.update(data, function(err){
                            if(err){
                                console.error(err);
                                swal("Failed!", err.message, "error");
                            }else{
                                swal("Success!", "Changes has been saved!", "success");
                                $('#addBranchModal').modal('hide');
                                //DB: Updating of branch here
                            }
                        });
                    }
                });
            }
        });
    }
}

function confResetBranch(){
    resetAddBranch(true);
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
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function(isConfirm){
        if (isConfirm) {
            $('#addBranchModal').modal('hide');
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
            office.delete(function(err){
                if(err){
                    swal("Failed!", err.message, "error");
                    console.error(err);
                    return                    
                }
                $('#addBranchModal').modal('hide');
                swal("Success!", "Branch is successfully removed!", "success");
            });
            //DB: Remove branch function here
        }
    });
}

function fieldCheck(){
    var a, b, c, d, e, f, g, h;
    var name = $('#brName').val() || "aaa";
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

var renderBranchTable = function(data){
    var html = "";
    data.forEach(element => {
        var telno = element.telno.split("/");
        html += "<tr onclick='viewBranchProfile(\""+ element.id +"\")'>";
        html += "<td>"+ element.branchID +"</td>";
        html += "<td>"+ element.name +"</td>";
        html += "<td>"+ (telno[0] + (telno[1] == undefined ? "" : ("<br>" + telno[1]))) +"</td>";
        html += "<td>"+ (element.purgeFlag == 1 ? "<span class='text-success'>Open</span>" : element.purgeFlag == 2 ? "<span class='text-danger'>Inactive</span>" : "") +"</td>";
        html += "</tr>";
    });
    $('#branchTable').html(html);
}

var viewBranchProfile = function(id){
    office.selected = id;
    office.getLocalData(function(profile){
        var telno = profile.telno.split("/");
        $('.brnchName').html(profile.name);
        $('.brnchId').html(profile.branchID);
        $('.brnchPhone').html(telno[0] + (telno[1] == undefined ? "" : ("<br>" + telno[1])));
        $('.brnchAdd').html(profile.address.replace(/_/g,' '));
        $('.brnchReg').html((profile.admin != undefined ? "<a href='api/v1/profile/"+ profile.admin.id +"'>" + profile.admin.name + "</a>" : ""));
    });
}

var getBranchFormData = function(cb){
    var name = $('#brName').val();
    var al1 = $('#brAddL1').val();
    var al2 = $('#brAddL2').val();
    var city = $('#brCity').val();
    var prov = $('#brProv').val();
    var zip = $('#brZip').val();
    var tel1 = $('#brTel1').val();
    var tel2 = $('#brTel2').val();
    //Additional Validations below here:


    if(fieldCheck() == 1){
        var data = {
            name: name,
            address: al1 + "_" + al2 + "_" + city + "_" +  zip + "_" + prov,
            telno: tel1 + "/" + tel2,
        };
        cb(true,data);
    }else{
        cb(false);
    }
}