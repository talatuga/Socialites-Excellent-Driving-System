$(function() { // nag rurun to pag fully loaded nayung page, 
    document.getElementById("btnPast").classList.remove('btnDarkActive');
    document.getElementById("btnAll").classList.remove('btnDarkActive');
    document.getElementById("btnCurrent").classList.add('btnDarkActive');

    $("#btnCurrent").on("click", function() {
        document.getElementById("btnPast").classList.remove('btnDarkActive');
        document.getElementById("btnAll").classList.remove('btnDarkActive');
        document.getElementById("btnCurrent").classList.add('btnDarkActive');
    });
    $("#btnPast").on("click", function() {
        document.getElementById("btnCurrent").classList.remove('btnDarkActive');
        document.getElementById("btnAll").classList.remove('btnDarkActive');
        document.getElementById("btnPast").classList.add('btnDarkActive');
    });
    $("#btnAll").on("click", function() {
        document.getElementById("btnCurrent").classList.remove('btnDarkActive');
        document.getElementById("btnPast").classList.remove('btnDarkActive');
        document.getElementById("btnAll").classList.add('btnDarkActive');
    });

    getStudent(1, studentTable.offset, studentTable.limit).then(renderStudentTable); // <--- tawagin yung getStudent() then after yung renderStudentTable().    
});

var studentTable = { // <--- set nang property nung table, para alam natin yung current page, offset, limit and storage narin ng loaded pages.
    offset: 0,
    limit: 10,
    currentPage: 0,
    pages:{}
} // <--- pero dahil wala pang pagination nevermind muna tong part na to.

//SD: OKAY ella! this is my sample get method to server. line by line ko i eexplain for you! ^_^
var getStudent = function(_type, offset, limit){ // <--- Nag declase ako ng variable na may lamang function. with parameters, _type = number, offset = number(starting id), and limit = number(number of result) 
    type = ["all","current","past"]; //<--- nag declare ako ng local variable na laman is array ng type of student we need.
    return new Promise(function(grant, reject){ // <--- nag declare ako ng promise. ibig sabihin itong buong getStudent() is a Promise Object.
        $.get('api/v1/stud?filter='+ type[_type] +'&limit=' + limit + '&offset=' + offset, function(response){ // <--- Eto yung GET Ajax, and structure nya is $.get(apiAddress, callback);
            //studentTable.pages[studentTable.currentPage] = response.data; // <--- for pagination. add data to currentPage
            grant(response.data); // <--- pag nagresponse ng data yung GET request natin galing sa server, tatawawagin natin yung grant(dataToPass) ng Promise.
        }); // closing ng $.get()
    }); // closing ng Promise Object.
} // closing ng getStudent()


//SD: Ella eto naman yung function for rendering the student table.
var renderStudentTable = function(data){ // <--- nag declare ng var na may laman ng function. with parameter expecting to be an array[]
    var html = ""; // <--- initialized a blank string para kung walang ma process walang i didisplay.
    var render = function(){ // <--- nagdeclare ako ng local var na may laman na function. ang purpose is tatawagin to pag tapus na yung forEach() sa baba. 
        $('#studentTable').html(html); // <--- hahanapin yung element sa html na may id na studentTable and papalitan yung html nun nung laman nung html string.       
    }

    var loopCounter = data.length; // <--- declare ng counter. di kasi gumagana yung break; sa forEach() and Asynchronous kasi siya.
    data.forEach(element => { // <--- expecting na array yung data, gagamitin natin yung forEach() which is asynchronous function. ilalagay sa element variable yung bawat element nung data and i perform yung action below it.       
        html += "<tr>";
        html += "<td>" + element.id + "</td>";
        html += "<td>" + element.fullname + "</td>";
        html += "<td>" + element.accStatus + "</td>"; // <-- pa edit nalang nito kung pano yung may warning/sucess
        html += "</tr>"; // <--- common sense na siguro yung start nito till here. hahaha
        loopCounter--; // <--- reduce counter value.
        if(loopCounter == 0) render(); // <--- ichecheck kung zero na ba. kasi kung oo tawagin na yung render variable na may laman na function.        
    });// <--- ending nung forEach();
}
var rst_done = 0; // <--- to prevent spamming sana, pero nevermind muna to.
var refreshStudentTable = function () { // <--- I suggest applying pagination. Self explain kung ano ginagawa nito.
    if(rst_done == 0){
        rst_done = 1;
        getStudent(1, studentTable.offset, studentTable.limit).then(renderStudentTable).then(function(){ // <--- need talaga ng pagination para naman makuha natin yung data per page.
            rst_done = 0;
        });
    }else{
        console.log("Pressing to fast...");
        // lagyan sana dito ng sleep till you can press refresh again.
    }
}

//SD: Okay this one is tricky, kasi may dalawang types of editing, either per field ba or buong data.
var usd_done = 0;
var updateStudentData = function(_id, _field = "", data){
    var id = _id; // <--- fetch data to update and declare here, 
    var field = _field; // <--- same goes here, pero optional to. pag wala tong laman ibig sabihin lahat ng data ng specific student maaupdate.
    var _data = { // <--- variable na ipapasa sa server. in JSON format
        // declare data here, sample: fullname: ella, // seperate data using (,)
    }
    
    //SD: VALIDATION! even thou may validation procedure ako sa server-side, still filter data here.
    
    return new Promise((grant, reject)=>{
        $.ajax({
            url: 'api/v1/stud/' + id + field,
            type: "PUT", // <--- use METHOD 'PUT' kung update gagawin mo.
            data: _data, // <--- pass the _data
            success: onsuccess, // <--- pag okay ang lahat at tanggap ni server yung nagbago :(
            error: onerror  // <--- pag ayaw tanggapin ni server na nagbago na siya.
        });
        var onsuccess = (data)=>{ // <--- simplified version ng pag declare ng function, tutal ES6 na halos lagay ng JS sa mga browser.
            if(data.success == false){
                reject(data.detail); // <--- send rejection, kasi ayaw ni server.
            }else{
                grant(data.detail); // <--- pag okay ang lahat.
            }
        }
        var onerror = (err)=>{
            console.error("Error");
            reject(err); // <--- send rejection
        }
    });
}
//SD: Delete naman, simple lang ito. I guess iiwan ko tong uncommented para i aanaylze mo. ^_^
var deleteStudentData = function(id){
    return new Promise((grant, reject)=>{
        $.ajax({
            type: "DELETE",
            url: "api/v1/stud/" + id,
            success: onsuccess,
            error: onerror
        });
        var onsuccess = function(response){
            if(response.success == false) {
                reject(response.detail);
            }else{
                grant(response.detail);
            }   
        }
        var onerror = function(err){
            console.log(err);
            reject(err);
        }
    });
}

/* 
    SD: 
    I use, Promise to make things done. kasi sa server side na ka old style ako using callback.
    for sure makaka kita kapa nang callback dito. pero i suggest using promise nalang.

    summary:

    $.get(apiAddress, callback);

    $.post(apiAddress, data, callback);
    
    $.ajax(config);

    where: 
    apiAddress = server api address to call, e.g: 'api/v1/stud' or 'api/v1/car' 
    data AND dataToPass = process and validated data in JSON form that will send with the request.
    callback = function that will run when certain condition/event trigger.

    config = {
        url: apiAddress,
        type: httpMethod,
        data: dataToPass,
        success: callback,
        error: callback
    }

    $('#elementID').html()              <--- returns html of that target element,
    $('#elementID').html(htmlToApply)   <--- replace html content of the targer element with htmlToApply in String format.
    
    array.forEach(  <--- forEach is a buiilt-in function for array type variables. each element of data is stored on element and run the code inside the {}
        element=>{
            //action here per element
        }
    ) 

    pagtatawagin mo yung isang function na implement with Promise. 
    pwede mo tawagin yung then() after nun, 
    example: 

        deleteStudentData(3).then(function/anotherFunction/callback).catch(function/anotherFunction/callback);

    > mag rurun yung then() after tawagin nung deleteStudentData() yung grant() sa loob nya.    
    > kung sakaling reject() yung tinawag sa loob nung promise. pwede mo i dugtong yung catch()

*/