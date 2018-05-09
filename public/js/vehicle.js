$(function ()
{
    $("#editVehiPlate").hide();
    $("#editVehiCoding").hide();
    $("#editVehiInst").hide();
    $("#btnDoneEditVehi").hide();
    $("#vehiPlate").show();
    $("#vehiInst").show();
    $("#vehiCoding").show();
    $("#btnEditVehi").show();
});

function confDelVehicle ()
{
    swal({
        title: "Are you sure you want to delete this vehicle?",
        text: "This vehicle will be removed from the database.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        closeOnConfirm: false,
        closeOnCancel: false
    },
    function(isConfirm){
        if (isConfirm) {
            swal("Deleted!", "Vehicle has been successfully deleted!", "success");
            //DB: Deleting of vehicle function here
        }
        else {
            swal("Cancelled", "", "error");
        }
    });
}

function confEditVehicle ()
{
    $("#vehiPlate").hide();
    $("#vehiInst").hide();
    $("#vehiCoding").hide();
    $("#btnEditVehi").hide();
    $("#btnAddDefVehi").show();
    $("#editVehiPlate").show();
    $("#editVehiCoding").show();
    $("#editVehiInst").show();
    $("#btnDoneEditVehi").show();
    $("#btnCancEditVehi").show();
}

function doneEditVehi ()
{
    swal({
        title: "Are you sure you want to save the changes?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        closeOnConfirm: false,
        closeOnCancel: false
    },
    function(isConfirm){
        if (isConfirm) {
            swal("Updated!", "Vehicle details has been successfully updated!", "success");
            $("#editVehiPlate").hide();
            $("#editVehiCoding").hide();
            $("#editVehiInst").hide();
            $("#btnDoneEditVehi").hide();
            $("#btnCancEditVehi").hide();
            $("#btnAddDefVehi").hide();
            $("#vehiPlate").show();
            $("#vehiInst").show();
            $("#vehiCoding").show();
            $("#btnEditVehi").show();
            //DB: Updating of vehicle function here
        }
        else {
            swal("Cancelled", "", "error");
        }
    });
}

function cancEditVehi ()
{
    $("#editVehiPlate").hide();
        $("#editVehiCoding").hide();
        $("#editVehiInst").hide();
        $("#btnDoneEditVehi").hide();
        $("#btnCancEditVehi").hide();
        $("#btnAddDefVehi").hide();
        $("#vehiPlate").show();
        $("#vehiInst").show();
        $("#vehiCoding").show();
        $("#btnEditVehi").show();
        //DB&SD: Cancel updating of vehicle function here
}

function doneDefVehi ()
{
    //DB&SD: Done vehicle defect function here
}

function cancDefVehi ()
{
    //DB&SD: Cancel vehicle defect function here
}