var studIDcert;
function searchStudCert(){
    studIDcert = $('#studNumCert').val();
    if (studIDcert.replace(/_/g,' ')=="") swal ("Oops!", "Please input the student number first!");
    else{
        cer.searchStudID(function(err, data){
            if(err){
                swal("Failed!", err.message, "error");
                console.log(err);
            }else{
                var pad = "0000";
                if(data.length!=0){
                    var course = "CRS-"+ (data[0].carType.toUpperCase() + pad.substring(0,pad.length - (data[0].courseID+"").length)) + data[0].courseID;
                    $('#studNameCert').val(data[0].fullname.replace(/_/g, ' '));
                    $('#studCrsCert').val(course);
                    cer.getInstCert(function(err, data){
                        if(err){
                            swal("Failed!", err.message, "error");
                            console.log(err);
                        }else{
                            $('#studInstCert').val(data[0].fullname.replace(/_/g, ' '));
                        }
                    });
                }else{
                    swal ("No results found!", "Please make sure that you are searching for a student that is enrolled in this branch with a finished course.");
                    $('#studNumCert').val("");
                }
            }
        });
    }
}

function generateCert(){
    $('#addPaymentCertModal').modal('show');
}