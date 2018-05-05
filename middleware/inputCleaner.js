/* 
    inputCleaner.js, dito ko balak ilagay yung mag comcompile ng data galing sa request,
    para mas madaling magamit ng system.
*/

//From name itself, it validates data. and It is in promise object.
exports.dataValidator = function(data){
    return new Promise(function(granted, reject){
        var items = Object.keys(data);
        var arrData = [];
        items.forEach(x=>{
            var test = data[x];
            
            arrData.push(test);
        });    
    });
}