var checkedValues, count;

$(function ()
{
    clrSearchVehiA();
});

function confDelVehicle ()
{
    swal({
        title: "Warning!",
        text: "Are you sure you want to remove this vehicle?",
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
            swal("Success!", "Vehicle has been successfully deleted!", "success");
            //DB: Deleting of vehicle function here
        }
        else {
            swal("Cancelled", "", "error");
        }
    });
}

function editVehicle (a)
{
    //DB: Put vehicle details here
    // var plate = $('#vehiPlate').val();
    // $('.addVehiPlate').val(plate);
    $('.modalH2AddVehi').html("Edit Vehicle Details");
    $('#addNewVehicleModal').modal('show');
}

function openNewVehicle ()
{
    resetNewVehi();
    $('.modalH2AddVehi').html("Add New Vehicle");
    $('#addNewVehicleModal').modal('show');
}

function resetNewVehi ()
{
    $('select[name="addVehiType"]').val(0);
    $(".addVehiBrand").val("");
    $(".addVehiModel").val("");
    $(".addVehiPlate").val("");
    $('select[name="addVehiCoding"]').val(0);
}

function addVehi ()
{
    var type = $('select[name="addVehiType"]').val();
    var brand = $(".addVehiBrand").val();
    var model = $(".addVehiModel").val();
    var plate = $(".addVehiPlate").val();
    var coding = $('select[name="addVehiCoding"]').val();

    if (brand == "" || brand == null
        || model == "" || model == null
        || plate == "" || plate == null
        || type == 0 || coding == 0)
    {
        swal("Oops!", "Please fill out all required fields.", "error");
    }
    else 
    {
        swal("Success!", "New vehicle has been added!", "success");
        $('#addNewVehicleModal').modal('hide');
        //DB: Function on add new vehicle here
    }
}

function doneEditVehi (a)
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
            if (a=="a")
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
            }
            else if (a=="m")
            {
                $("#editVehiPlateM").hide();
                $("#editVehiCodingM").hide();
                $("#editVehiInstM").hide();
                $("#btnDoneEditVehiM").hide();
                $("#btnCancEditVehiM").hide();
                $("#btnAddDefVehiM").hide();

                $("#vehiPlateM").show();
                $("#vehiInstM").show();
                $("#vehiCodingM").show();
                $("#btnEditVehiM").show();
            }
            swal("Updated!", "Vehicle details has been successfully updated!", "success");
            //DB: Updating of vehicle function here
        }
        else {
            swal("Cancelled", "", "error");
        }
    });
}

function cancEditVehi (a)
{
    if (a=="a")
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
    }
    else if (a=="m")
    {
        $("#editVehiPlateM").hide();
        $("#editVehiCodingM").hide();
        $("#editVehiInstM").hide();
        $("#btnDoneEditVehiM").hide();
        $("#btnCancEditVehiM").hide();
        $("#btnAddDefVehiM").hide();

        $("#vehiPlateM").show();
        $("#vehiInstM").show();
        $("#vehiCodingM").show();
        $("#btnEditVehiM").show();
    }
    //DB&SD: Cancel updating of vehicleA function here
}

function addDefVehi (a) //resets and opens add defect modal
{
    $(".defMod2").removeClass("activeDefMod");
    $(".defMod3").removeClass("activeDefMod");
    $(".defMod1").addClass("activeDefMod");

    $("#btnNextAddDef").show();
    $("#btnNextAddDef2").hide();
    $("#btnPrevAddDef").hide();
    $("#btnDoneAddDef").hide();
    $("#btnPrevAddDef2").hide();

    $(".divMod2").hide();
    $(".divMod3").hide();
    $(".divMod1").show();

    $('input:checkbox').prop('checked', false);
    count = 0;
    checkedValues = null;
    $('.damageTxtInput').val("");
    $('#p27').val("");
    $('#addNewDefectModal').modal('show');
}

function nextDef1 () //Conditions before going to step 2
{
    checkedValues = $('input[name="newDefPart"]:checked').map(function() {
        return this.value;
    }).get();
    count = $('input[name="newDefPart"]:checked').length;
    var txt = $('#p27').val();
    var txt1 = txt.replace(/\s+/g, '');
    if (count==0)
    {
        if (txt1=="" || txt1.length==0 || txt1==null)
        {
            swal("Oops!", "Please select at least one.", "error");
        }
        else
        {
            count=1;
            assignValuesDef2Txt(txt); //if walang chineck pero may nilagay sa textbox
            $(".defMod1").removeClass("activeDefMod");
            $(".defMod3").removeClass("activeDefMod");
            $(".defMod2").addClass("activeDefMod");

            $("#btnNextAddDef").hide();
            $("#btnNextAddDef2").show();
            $("#btnPrevAddDef").show();

            $(".divMod1").hide();
            $(".divMod3").hide();
            $(".divMod2").show();
        }
    }
    else
    {
        assignValuesDef2(checkedValues);
        $(".defMod1").removeClass("activeDefMod");
        $(".defMod3").removeClass("activeDefMod");
        $(".defMod2").addClass("activeDefMod");

        $("#btnNextAddDef").hide();
        $("#btnNextAddDef2").show();
        $("#btnPrevAddDef").show();

        $(".divMod1").hide();
        $(".divMod3").hide();
        $(".divMod2").show();
    }
}

var assignValuesDef2 = function (data) //STEP 2: Kapag hindi lang textfield lang yung may laman or walang laman yung textbox, dito didiretso
{
    var txt = $('#p27').val();
    var txt1 = txt.replace(/\s+/g, '');
    countI = count;
    var html = "";
    var render = function(){ 
        $('.formDefect').html(html);
    }
        data.forEach(element => {
        html += "<div class='row divDamage'>";
        html += "<div class='col-md-6 col-lg-6 col-xs-4 col-sm-4'>";
        html += "<h5 class='damagedPartTxt' id='defPart" + (countI-1) + "'>" + checkedValues[countI-1]; //nagbigay ako ng ID sa kada car part selected
        html +=  "<span class='asterisk'> *</span></h5></div>";
        html += "<div class='col-md-6 col-lg-6 col-xs-8 col-sm-8'>";
        html += "<input type='text' id='defTxt" + (countI-1) + "' class='flat damageTxtInput'></div>"; //nagbigay ako ng ID sa kada textfield per car part
        html += "</div>";
        countI--;
        if(countI == 0) {
            if (txt1=="" || txt1.length==0 || txt1==null)
            {
                render();
            }
            else
            {
                html += "<div class='row divDamage'>";
                html += "<div class='col-md-6 col-lg-6 col-xs-4 col-sm-4'>";
                html += "<h5 class='damagedPartTxt' id='defPart" + (count) + "'>" + txt; //ID for txt
                html +=  "<span class='asterisk'> *</span></h5></div>";
                html += "<div class='col-md-6 col-lg-6 col-xs-8 col-sm-8'>";
                html += "<input type='text' id='defTxt" + (count) + "' class='flat damageTxtInput'></div>";
                html += "</div>";
                count+=1; //add 1 to count for conditions in nextDef2()
                render();
            }
        }
    });
}

var assignValuesDef2Txt = function (data) //STEP 2: Kapag textfield lang yung may laman, dito didiretso
{
    var txt = $('#p27').val();
    countI = count;
    var html = "";
    var render = function(){ 
        $('.formDefect').html(html);
    }
        html += "<div class='row divDamage'>";
        html += "<div class='col-md-6 col-lg-6 col-xs-4 col-sm-4'>";
        html += "<h5 class='damagedPartTxt' id='defPart" + (countI) + "'>" + txt; //nagbigay ako ng ID sa kada car part selected
        html +=  "<span class='asterisk'> *</span></h5></div>";
        html += "<div class='col-md-6 col-lg-6 col-xs-8 col-sm-8'>";
        html += "<input type='text' id='defTxt" + (countI) + "' class='flat damageTxtInput'></div>"; //nagbigay ako ng ID sa kada textfield per car part
        html += "</div>";
        render();
}

function nextDef2 () //Conditions before going to step 3
{
    checkedValues = $('input[name="newDefPart"]:checked').map(function() {
        return this.value;
    }).get();
    var txt1 = $('.damageTxtInput').val();
    txt1 = txt1.replace(/\s+/g, '');
    if (checkedValues.length==0)
    {
        if (txt1=="" || txt1.length==0 || txt1==null)
        {
            swal("Oops!", "Please fill out all required fields.", "error");
        }
        else
        {
            assignValuesDef3Txt();
            $(".defMod1").removeClass("activeDefMod");
            $(".defMod2").removeClass("activeDefMod");
            $(".defMod3").addClass("activeDefMod");
        
            $("#btnNextAddDef2").hide();
            $("#btnPrevAddDef").hide();
            $("#btnDoneAddDef").show();
            $("#btnPrevAddDef2").show();
        
            $(".divMod1").hide();
            $(".divMod2").hide();
            $(".divMod3").show();
        }
    }
    else
    {
        var i;
        for (i=0; i<count; i++)
        {
            txt1 = $('#defTxt'+i).val();
            txt1 = txt1.replace(/\s+/g, '');
            if (txt1=="" || txt1.length==0 || txt1==null)
            {
                swal("Oops!", "Please fill out all required fields.", "error");
                break;
            }
            else
            {
                if (i==(count-1))
                {
                    assignValuesDef3(checkedValues);
                    $(".defMod1").removeClass("activeDefMod");
                    $(".defMod2").removeClass("activeDefMod");
                    $(".defMod3").addClass("activeDefMod");
                
                    $("#btnNextAddDef2").hide();
                    $("#btnPrevAddDef").hide();
                    $("#btnDoneAddDef").show();
                    $("#btnPrevAddDef2").show();
                
                    $(".divMod1").hide();
                    $(".divMod2").hide();
                    $(".divMod3").show();
                }
                else
                continue;
            }
        }
    }
}

var assignValuesDef3 = function (data) //STEP 3: Kapag hindi lang textfield lang yung may laman or walang laman yung textbox, dito didiretso
{
    //checkedValues - laman nito kung ano yung mga value ng checkboxes na selected (see line 190)
    count = $('input[name="newDefPart"]:checked').length;
    var countI = count;
    var txt = $('#p27').val();
    var html = "";
    var render = function(){ 
        $('.formSignif').html(html);
    }
        data.forEach(element => {
        html += "<div class='damageSignifDiv'>";
        html += "<center><h5 class='damagedPartTxt1'>" + checkedValues[countI-1] + "</h5>"; //di na ko nagbigay ng ID since meron na sa taas
        html += "<input type='radio' class='defRateRD defRate1' name='defRate" + (countI-1) + "' value='1' checked>";
        html += "<label class='defRateLbl' for='defRate1'>1</label>";
        html += "<input type='radio' class='defRateRD defRate2' name='defRate" + (countI-1) + "' value='2'>";
        html += "<label class='defRateLbl' for='defRate2'>2</label>";
        html += "<input type='radio' class='defRateRD defRate3' name='defRate" + (countI-1) + "' value='3'>";
        html += "<label class='defRateLbl' for='defRate3'>3</label>";
        html += "<input type='radio' class='defRateRD defRate4' name='defRate" + (countI-1) + "' value='4'>";
        html += "<label class='defRateLbl' for='defRate4'>4</label>";
        html += "<input type='radio' class='defRateRD defRate5' name='defRate" + (countI-1) + "' value='5'>";
        html += "<label class='defRateLbl' for='defRate5'>5</label>";
        html += "</center></div><br>";
        countI--;
        if(countI == 0) 
        {
        if (txt=="" || txt.length==0 || txt==null)
            {
                render();
            }
            else
            {
                html += "<div class='damageSignifDiv'>";
                html += "<center><h5 class='damagedPartTxt1'>" + txt + "</h5>"; //di na ko nagbigay ng ID since meron na sa taas
                html += "<input type='radio' class='defRateRD defRate1' name='defRate" + (count) + "' value='1' checked>";
                html += "<label class='defRateLbl' for='defRate1'>1</label>";
                html += "<input type='radio' class='defRateRD defRate2' name='defRate" + (count) + "' value='2'>";
                html += "<label class='defRateLbl' for='defRate2'>2</label>";
                html += "<input type='radio' class='defRateRD defRate3' name='defRate" + (count) + "' value='3'>";
                html += "<label class='defRateLbl' for='defRate3'>3</label>";
                html += "<input type='radio' class='defRateRD defRate4' name='defRate" + (count) + "' value='4'>";
                html += "<label class='defRateLbl' for='defRate4'>4</label>";
                html += "<input type='radio' class='defRateRD defRate5' name='defRate" + (count) + "' value='5'>";
                html += "<label class='defRateLbl' for='defRate5'>5</label>";
                html += "</center></div><br>";
                count+=1;
                render();
            }
        }
    });
}

var assignValuesDef3Txt = function () //STEP 3: Kapag textfield lang yung may laman, dito didiretso
{
    count = $('input[name="newDefPart"]:checked').length;
    var countI = count;
    var txt = $('#p27').val();
    var html = "";
    var render = function(){ 
        $('.formSignif').html(html);
    }
        html += "<div class='damageSignifDiv'>";
        html += "<center><h5 class='damagedPartTxt1'>" + txt + "</h5>"; //di na ko nagbigay ng ID since meron na sa taas
        html += "<input type='radio' class='defRateRD defRate1' name='defRate" + (count) + "' value='1' checked>";
        html += "<label class='defRateLbl' for='defRate1'>1</label>";
        html += "<input type='radio' class='defRateRD defRate2' name='defRate" + (count) + "' value='2'>";
        html += "<label class='defRateLbl' for='defRate2'>2</label>";
        html += "<input type='radio' class='defRateRD defRate3' name='defRate" + (count) + "' value='3'>";
        html += "<label class='defRateLbl' for='defRate3'>3</label>";
        html += "<input type='radio' class='defRateRD defRate4' name='defRate" + (count) + "' value='4'>";
        html += "<label class='defRateLbl' for='defRate4'>4</label>";
        html += "<input type='radio' class='defRateRD defRate5' name='defRate" + (count) + "' value='5'>";
        html += "<label class='defRateLbl' for='defRate5'>5</label>";
        html += "</center></div><br>";
        render();
}

function doneDef () //All steps done
{
    if (count>1)
    {
        swal("Success!", count + " defects have been added to vehicle details!", "success");
    }
    else
    {
        swal("Success!", "1 defect has been added to vehicle details!", "success");
    }
    $('#addNewDefectModal').modal('hide');
}

function prevDef1 () //going back to step1
{
    $(".defMod2").removeClass("activeDefMod");
    $(".defMod3").removeClass("activeDefMod");
    $(".defMod1").addClass("activeDefMod");

    $("#btnNextAddDef2").hide();
    $("#btnPrevAddDef").hide();
    $("#btnNextAddDef").show();

    $(".divMod2").hide();
    $(".divMod3").hide();
    $(".divMod1").show();
}

function prevDef2 () //going back to step2
{
    $(".defMod1").removeClass("activeDefMod");
    $(".defMod3").removeClass("activeDefMod");
    $(".defMod2").addClass("activeDefMod");
   
    $("#btnDoneAddDef").hide();
    $("#btnPrevAddDef2").hide();
    $("#btnNextAddDef2").show();
    $("#btnPrevAddDef").show();

    $(".divMod1").hide();
    $(".divMod3").hide();
    $(".divMod2").show();
}

function cancDefVehi () //deleting of defect data on defTable
{
    swal({
        title: "Warning!",
        text: "Are you sure you want to remove this data from Defects Table?",
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
            swal("Success!", "Defect data has been removed.", "success");
            //DB: Deleting of vehicle defect from defTable function here
        }
        else {
            swal("Cancelled", "", "error");
        }
    });
}
function clrSearchVehiA ()
{
    $('#searchVehiA').val("");
}

$('.tblVehicle tr').click(function()
{
    var selected = $(this).hasClass("highlightTr");
    $('.tblVehicle tr').removeClass("highlightTr");
    if (!selected)
        $(this).addClass("highlightTr");
});

function gotoSched ()
{
    schedule ();
}