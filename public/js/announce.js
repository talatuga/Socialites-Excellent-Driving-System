var annID, today, title, msg, from;
var title1, msg1, from1;
var selTitle, selMsg, selFrom;

$(function (){
});

function viewAnnouncements(){
    announcement.getAnnouncementList(function(err, data){
        if(err){
            swal("Failed!", err.message, "error");
            console.log(err);
        }else{
            $('#announceTbl').html("");
            var x = 1;
            var dataLen = data.length;
            if(data.length!=0){
                $('.noAnnounceDiv').hide();
                data.forEach(e => {
                    var html = "<tr><td>"+ (Date.parse(e.dateFrom).toString('MMM dd, yyyy')) +"</td>";
                    html += "<td>"+ e.title +"</td>";
                    html += "<td class='annMsg'>"+ e.message +"</td>";
                    html += "<td><i class='icon icon-eye tiDef2' onclick='viewAnnounce("+ e.id +")' data-toggle='tooltip' data-placement='bottom' title='View Announcement Details'></i>";
                    html += "<i class='ti-pencil tiDef2' onclick='editAnnounce("+ e.id +")' data-toggle='tooltip' data-placement='bottom' title='Edit Announcement Details'></i>";
                    html += "<i class='ti-close tiDef2' onclick='remAnnounce("+ e.id +")' data-toggle='tooltip' data-placement='bottom' title='Remove/Delete Announcement'></i>";
                    html += "</td></tr>";
                    $('#announceTbl').append(html);
                });
            } else{
                $('.noAnnounceDiv').show();
            }
        }
    });
}

function addAnnounce(){
    resetAddAnnounce();
    $('#addAnnouncementModal').modal("show");
}

function resetAddAnnounce(){
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("newAnnDateFrom").setAttribute("min", today);
    document.getElementById("editAnnDateFrom").setAttribute("min", today);
    $('#newAnnTitle').val("");
    $('#newAnnMsg').val("");
    $('#newAnnDateFrom').val("");
}

function getFieldsData(){
    title = $('#newAnnTitle').val();
    msg = $('#newAnnMsg').val();
    from = $('#newAnnDateFrom').val();

    title1 = title.replace(/ /g, '');
    msg1 = msg.replace(/ /g, '');
}

function getFieldsData2(){
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("editAnnDateFrom").setAttribute("min", today);

    title = $('#editAnnTitle').val();
    msg = $('#editAnnMsg').val();
    from = $('#editAnnDateFrom').val();

    title1 = title.replace(/ /g, '');
    msg1 = msg.replace(/ /g, '');
}

function cancAnn(){
    getFieldsData();
    if (title1 == "" && msg1 == "") $('#addAnnouncementModal').modal("hide");
    else {
        swal({
            title: "Warning!",
            text: "Are you sure you want to cancel? All changes will be discarded.",
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
                $('#addAnnouncementModal').modal("hide");
            }
        });
    }
}

function cancEditAnn(){
    getFieldsData();
    swal({
        title: "Warning!",
        text: "Are you sure you want to cancel? All changes will be discarded.",
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
            //SD: Edit function here
            $('#editAnnouncementModal').modal("hide");
        }
    });
}

function addAnn(){
    getFieldsData();
    var dateAnn;

    if (title1 == "" || msg1 == "" || from == "")
        swal ("Oops!", "Please input all required fields.", "error");
    else{
        if (from == today) {dateAnn = 'today', status = 1}
        else {dateAnn = 'on ' + from; status = 0;}
        var _data = {
            title: title,
            message: msg,
            dateFrom: from,
            status: status,
        }
        announcement.addAnnouncement(_data, function(err){
            if(err){
                swal("Failed!", err.message, "error");
                console.log(err);
            }else{
                $('#addAnnouncementModal').modal("hide");
                swal ("Success!", "Announcement is added and will be displayed " + dateAnn + "!", "success");
                viewAnnouncements();
            }
        });
    }
}

function remAnnounce(a){
    annID = a;
    swal({
        title: "Warning!",
        text: "Are you sure you want to remove this announcement?",
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
            var _data = {
                title: title,
                message: msg,
                dateFrom: from,
                status: 0,
            }
            announcement.editAnnouncement(_data, function(err){
                if(err){
                    swal("Failed!", err.message, "error");
                    console.log(err);
                }else{
                    swal ("Success!", "Announcement has been removed!", "success");
                    viewAnnouncements();
                }
            });
        }
    });
}

function editAnnounce(a){
    resetAddAnnounce();
    annID = a;
    announcement.viewAnnouncement(function(err, data){
        if(err){
            swal("Failed!", err.message, "error");
            console.log(err);
        }else{
            data.forEach(e => {
                selTitle = e.title;
                selMsg = e.message;
                selFrom = Date.parse(e.dateFrom).toString('yyyy-MM-dd');
                
                $('#editAnnTitle').val(selTitle);
                $('#editAnnMsg').val(selMsg);
                $('#editAnnDateFrom').val(selFrom);
            });
        }
    });
    $('#editAnnouncementModal').modal("show");
}

function editAnn(){
    getFieldsData2();

    if (title1 == "" || msg1 == "" || from == "")
        swal ("Oops!", "Please input all required fields.", "error");
    else{
        if (from == today) status = 1;
        else if (from >= today) status = 2;
        else status = 0;
        var _data = {
            title: title,
            message: msg,
            dateFrom: from,
            status: status,
        }
        announcement.editAnnouncement(_data, function(err){
            if(err){
                swal("Failed!", err.message, "error");
                console.log(err);
            }else{
                $('#editAnnouncementModal').modal("hide");
                swal ("Success!", "Announcement details has been updated!", "success");
                viewAnnouncements();
            }
        });
    }
}

function viewAnnounce(a){
    annID = a;
    announcement.viewAnnouncement(function(err, data){
        if(err){
            swal("Failed!", err.message, "error");
            console.log(err);
        }else{
            data.forEach(e => {
                selTitle = e.title;
                selMsg = e.message;
                selFrom = Date.parse(e.dateFrom).toString('MMM dd, yyyy');
                
                $('#viewAnnTitle').val(selTitle);
                $('#viewAnnMsg').val(selMsg);
                $('#viewAnnDateFromTo').val(selFrom);
            });
        }
    });
    $('#viewAnnouncementModal').modal("show");
}

function resetAnn(){
    $('#editAnnTitle').val(selTitle);
    $('#editAnnMsg').val(selMsg);
    $('#editAnnDateFrom').val(selFrom);
}