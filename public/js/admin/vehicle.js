var checkedValues, count, checkedValuesData = [];

$(function () {
    clrSearchVehiA();
    $('#searchVehiA').on('click', function(e){
        search.init(car.pages[car.currPage], ["brand","model","plate","id"], function(data){
            car.renderATable(data);
        });
    });
    $('#searchVehiA').on('keyup', function(e){
        search.keypress($('#searchVehiA').val());
    });
});

var loadVehi = function(){
    $(".preloader").fadeIn(); 
    // $('#carTableA tr:first').addClass("highlightTr");
    car.getATableData(function(){
        $('.tblVehicle tbody tr:first').addClass("highlightTr");                
            $('.tblVehicle tbody tr').click(function () {
                var selected = $(this).hasClass("highlightTr");
                $('.tblVehicle tbody tr').removeClass("highlightTr");
                if (!selected)
                    $(this).addClass("highlightTr");
            });
        viewCarProfile(car.pages[0][0].id);
        $(".preloader").fadeOut(); 
    });
}

function confDelVehicle() {
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
    function (isConfirm) {
        if (isConfirm) {
            //DB: Deleting of vehicle function here
            car.delete(selectedCar, function(err, response){
                if(err) return swal("Fail!", err, "error"); 
                swal("Success!", "Vehicle has been successfully deleted!", "success");                
            });
        }
        else {
            swal("Cancelled", "", "error");
        }
    });
}

function editVehicle (){
    car.pages[car.currPage].forEach(x=>{
        if(x.id == selectedCar){
            $('select[name="addVehiType"]').val(x.transmission);
            $(".addVehiBrand").val(x.brand);
            $(".addVehiModel").val(x.model);
            
            $(".addVehiEngNo").val(x.engineNo);
            $(".addVehiBodyNo").val(x.bodyNo);
            $(".addVehiDisplacement").val(x.displacement);
            $(".addVehiColor").val(x.color);

            $(".addVehiPlate").val(x.plate);
            $('select[name="addVehiCoding"]').val(x.offday);
        
            $('.modalH2AddVehi').html("Edit Vehicle Details");
            $('#btnConfAddVehi').hide();
            $('#btnConfEditVehi').show();
            $('#addNewVehicleModal').modal('show');
        }
    });
}

function openNewVehicle() {
    $(".addVehiEngNo").inputmask({"mask": "999 9999999"});
    $(".addVehiBodyNo").inputmask({"mask": "999 99999 9 9999999"});
    resetNewVehi();
    $('#btnConfEditVehi').hide();
    $('#btnConfAddVehi').show();
    $('.modalH2AddVehi').html("Add New Vehicle");
    $('#addNewVehicleModal').modal('show');
}

function resetNewVehi() {
    $('select[name="addVehiType"]').val(0);
    $(".addVehiBrand").val("");
    $(".addVehiModel").val("");
    $(".addVehiPlate").val("");
    $(".addVehiEngNo").val("");
    $(".addVehiBodyNo").val("");
}

function addVehi() { // I HATE MY LIFE
    var _type = $('select[name="addVehiType"]').val();
    var _brand = $(".addVehiBrand").val();
    var _model = $(".addVehiModel").val();
    var _engine = $(".addVehiEngNo").val();
    var _body = $(".addVehiBodyNo").val();
    var _displacement = $(".addVehiDisplacement").val();
    var _color = $(".addVehiColor").val();
    var _plate = $(".addVehiPlate").val();
    var _coding = $('select[name="addVehiCoding"]').val();
    var price = $(".addVehiPrice").val();

    if (_brand == "" || _brand == null
        || _model == "" || _model == null
        || _plate == "" || _plate == null
        || _type == 0 || _coding == 0) {

        swal("Oops!", "Please fill out all required fields.", "error");
    }
    else {
        var _data = {
            model: _model,
            brand: _brand,
            engine: _engine,
            body: _body,
            displacement: _displacement,
            color: _color,
            transType: _type,
            plate: _plate,
            offday: _coding,
            price: price
        }
        car.addCar(_data, function(err){
            if(err){
                swal("Failed!", err.message, "error");
                console.log(err);
            }else{
                swal("Success!", "New vehicle has been added!", "success");
                $('#addNewVehicleModal').modal('hide');
            }
        });
    }
}

function doneEditVehi(a) {
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
        function (isConfirm) {
            if (isConfirm) {
                if (a == "a") {
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
                else if (a == "m") {
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

function cancEditVehi(a) {
    if (a == "a") {
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
    else if (a == "m") {
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

function addDefVehi(a) //resets and opens add defect modal
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

function nextDef1() //Conditions before going to step 2
{
    checkedValues = $('input[name="newDefPart"]:checked').map(function () {
        return this.value;
    }).get();
    count = $('input[name="newDefPart"]:checked').length;
    var txt = $('#p27').val();
    var txt1 = txt.replace(/\s+/g, '');
    if (count == 0) {
        if (txt1 == "" || txt1.length == 0 || txt1 == null) {
            swal("Oops!", "Please select at least one.", "error");
        }
        else {
            count = 1;
            checkedValuesData.push({part: checkedValues[count-1], defect: "", importance: 0});
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
    else {
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
    var render = function () {
        $('.formDefect').html(html);
    }
    data.forEach(element => {
        checkedValuesData.push({part: element, defect: "", importance: 0});
        html += "<div class='row divDamage'>";
        html += "<div class='col-md-6 col-lg-6 col-xs-4 col-sm-4'>";
        html += "<h5 class='damagedPartTxt' id='defPart" + (countI - 1) + "'>" + checkedValues[countI - 1]; //nagbigay ako ng ID sa kada car part selected
        html += "<span class='asterisk'> *</span></h5></div>";
        html += "<div class='col-md-6 col-lg-6 col-xs-8 col-sm-8'>";
        html += "<input type='text' id='defTxt" + (countI - 1) + "' class='flat damageTxtInput'></div>"; //nagbigay ako ng ID sa kada textfield per car part
        html += "</div>";
        countI--;
        if (countI == 0) {
            if (txt1 == "" || txt1.length == 0 || txt1 == null) {
                render();
            }
            else {
                html += "<div class='row divDamage'>";
                html += "<div class='col-md-6 col-lg-6 col-xs-4 col-sm-4'>";
                html += "<h5 class='damagedPartTxt' id='defPart" + (count) + "'>" + txt; //ID for txt
                html += "<span class='asterisk'> *</span></h5></div>";
                html += "<div class='col-md-6 col-lg-6 col-xs-8 col-sm-8'>";
                html += "<input type='text' id='defTxt" + (count) + "' class='flat damageTxtInput'></div>";
                html += "</div>";
                count += 1; //add 1 to count for conditions in nextDef2()
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
    var render = function () {
        $('.formDefect').html(html);
    }
    html += "<div class='row divDamage'>";
    html += "<div class='col-md-6 col-lg-6 col-xs-4 col-sm-4'>";
    html += "<h5 class='damagedPartTxt' id='defPart" + (countI) + "'>" + txt; //nagbigay ako ng ID sa kada car part selected
    html += "<span class='asterisk'> *</span></h5></div>";
    html += "<div class='col-md-6 col-lg-6 col-xs-8 col-sm-8'>";
    html += "<input type='text' id='defTxt" + (countI) + "' class='flat damageTxtInput'></div>"; //nagbigay ako ng ID sa kada textfield per car part
    html += "</div>";
    render();
}

function nextDef2() //Conditions before going to step 3
{
    checkedValues = $('input[name="newDefPart"]:checked').map(function () {
        return this.value;
    }).get();
    var txt1 = $('.damageTxtInput').val();
    txt1 = txt1.replace(/\s+/g, '');
    if (checkedValues.length == 0) {
        if (txt1 == "" || txt1.length == 0 || txt1 == null) {
            swal("Oops!", "Please fill out all required fields.", "error");
        }
        else {
            assignValuesDef3Txt();
            checkedValuesData[0].defect = txt1;
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
    else {
        var i;
        for (i = 0; i < count; i++) {
            txt1 = $('#defTxt' + i).val();
            txt1 = txt1.replace(/\s+/g, '');
            checkedValuesData[i].defect = txt1;            
            if (txt1 == "" || txt1.length == 0 || txt1 == null) {
                swal("Oops!", "Please fill out all required fields.", "error");
                break;
            }
            else {
                if (i == (count - 1)) {
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
    var render = function () {
        $('.formSignif').html(html);
    }
    data.forEach(element => {
        html += "<div class='damageSignifDiv'>";
        html += "<center><h5 class='damagedPartTxt1'>" + checkedValues[countI - 1] + "</h5>"; //di na ko nagbigay ng ID since meron na sa taas
        html += "<input type='radio' class='defRateRD defRate1' name='defRate" + (countI - 1) + "' value='1' checked>";
        html += "<label class='defRateLbl' for='defRate1'>1</label>";
        html += "<input type='radio' class='defRateRD defRate2' name='defRate" + (countI - 1) + "' value='2'>";
        html += "<label class='defRateLbl' for='defRate2'>2</label>";
        html += "<input type='radio' class='defRateRD defRate3' name='defRate" + (countI - 1) + "' value='3'>";
        html += "<label class='defRateLbl' for='defRate3'>3</label>";
        html += "<input type='radio' class='defRateRD defRate4' name='defRate" + (countI - 1) + "' value='4'>";
        html += "<label class='defRateLbl' for='defRate4'>4</label>";
        html += "<input type='radio' class='defRateRD defRate5' name='defRate" + (countI - 1) + "' value='5'>";
        html += "<label class='defRateLbl' for='defRate5'>5</label>";
        html += "</center></div><br>";
        countI--;
        if (countI == 0) {
            if (txt == "" || txt.length == 0 || txt == null) {
                render();
            }
            else {
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
                count += 1;
                render();
            }
        }
    });
}

var assignValuesDef3Txt = function () //STEP 3: Kapag textfield lang yung may laman, dito didiretso
{
    count = $('input[name="newDefPart"]:checked').length;
    var txt = $('#p27').val();
    var html = "";
    var render = function () {
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

function doneDef(){ //All steps done
    var counter = 0;
    checkedValues.forEach(x=>{
        checkedValuesData[counter].importance = $('input[name="defRate'+ counter +'"]:checked').val()
        counter++; 
    });
    queryer.start(car.addDefect, checkedValuesData, function(err, done){
        if(err) return console.error(err);
        else{
            swal("Success!", counter + " defects have been added to vehicle details!", "success");
            $('#addNewDefectModal').modal('hide');
        }
    });
}

function prevDef1() //going back to step1
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

function prevDef2() //going back to step2
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

function cancDefVehi(id) //deleting of defect data on defTable
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
        function (isConfirm) {
            if (isConfirm) {
                car.delDefect(id, function(err, done){
                    if(err) return swal("Failed!", err, "error");
                    swal("Success!", "Defect data has been removed.", "success");
                });
                //DB: Deleting of vehicle defect from defTable function here
            }
            else {
                swal("Cancelled", "", "error");
            }
        });
}

function clrSearchVehiA() {
    $('#searchVehiA').val("");
}

function gotoSched() {
    schedule();
}

var selectedCar = -1;

function viewCarProfile(id){
    selectedCar = id;
    car.selectedCar = id;
    var dayName = ['','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    car.getData(id, function(err, profile){
        if(err) return console.error(err);
        $('#vehiName').html(profile.brand + ", " + profile.model);
        // $('#vehiID').html(profile.id + "-" + profile.transmission);
        $('#vehiPlate').html(profile.plate);
        $('#vehiColor').html(profile.color);
        $('#vehiEngine').html(profile.engineNo);
        $('#vehiBody').html(profile.bodyNo);
        $('#vehiDisp').html(profile.displacement);
        $('#vehiCoding').html(dayName[profile.offday]);
        $('#vehiInst').html(profile.driverName.length != 0 ? profile.driverName.replace(/_/g, ' ') : "");
        var defect = "";
        profile.defect.forEach(x=>{
            if(x.repaired != 0){
                defect += "<tr>";
                defect += "<td>" + x.part + "</td>";
                defect += "<td>" + x.description + "</td>";
                defect += "<td><span class='text-danger'>" + x.importance + "</span></td>";
                defect += "<td><i class='ti-close tiDef1' id='btnCancDefVehi' onclick='cancDefVehi("+ x.id +")' data-toggle='tooltip' data-placement='bottom' title='Cancel/Remove'></i></td>";
                defect += "</tr>";
            }
        });
        $('#carDefect').html(defect);
    });
}

function editVehi(){
    var _type = $('select[name="addVehiType"]').val();
    var _brand = $(".addVehiBrand").val();
    var _model = $(".addVehiModel").val();
    var _plate = $(".addVehiPlate").val();
    var _coding = $('select[name="addVehiCoding"]').val();
    var _engine = $(".addVehiEngNo").val();
    var _body = $(".addVehiBodyNo").val();
    var _displacement = $(".addVehiDisplacement").val();
    var _color = $(".addVehiColor").val();
    var price = $(".addVehiPrice").val();

    if (_brand == "" || _brand == null
        || _model == "" || _model == null
        || _plate == "" || _plate == null
        || _type == 0 || _coding == 0) {
        swal("Oops!", "Please fill out all required fields.", "error");
    }
    else {
        var _data = {
            model: _model,
            brand: _brand,
            engine: _engine,
            body: _body,
            displacement: _displacement,
            color: _color,
            transType: _type,
            plate: _plate,
            offday: _coding,
            price: price
        }
        car.update(_data, function(err, done){
            if(err){
                console.error(err);
                swal("Failed!", err.stack, "error");            
            }else{
                swal("Success!", "Vehicle has been modified!", "success");
                $('#addNewVehicleModal').modal('hide');                
            }
        });
    }
}

function assignVehiToInst(){
    $("#assignVehiToInstModal").modal("show");
}

function saveAssignVehi(){
    
}