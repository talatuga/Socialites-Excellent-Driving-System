/* 
*   car object module, laman nito lahat nang simple table rendering, data, and server communicating functions,
*/
var car = {
    selectedCar: -1,
    offset: 0,
    limit: 10,
    currPage: 0,
    pages: [],
    renderATable: function(data){
        var html = "";
        var dayToday = Date.parse("today").toString('ddd');
        var dayName = ["","Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
        for(var x=0; x < data.length; x++){
            if(data[x].status != 0){
                html += "<tr class='carTbl' onclick='viewCarProfile("+ data[x].id +")'>";
                html += "<td>" + data[x].id + "</td>";
                html += "<td>" + data[x].brand + "</td>";
                html += "<td>" + data[x].model + "</td>";
                html += "<td>" + (data[x].transmission == "M" ? "Manual" : "Automatic") + "</td>";
                html += "<td>" + (dayName[data[x].offday] == dayToday ? "<span class='text-danger'>Coding</span>" : (data[x].status == 2 ? "<span class='text-warning'>In Use</span>" : "<span class='text-success'>Available</span>")) + "</td>";
                html += "</html>";
            }
        }
        $('#carTableA').html(html);
    },
    getATableData: function(cb){
        $.get('api/v1/car?offset=' + this.offset + '&limit=' + this.limit, function(response){
            if(response.success){
                var data = response.data;
                addPage(data);
            }else{
                console.log("Error: getting data from server.");
            }
        }).fail(request=>{
            console.log(request.status + ": " + request.statusText);
        });
        var addPage = (page)=>{
            this.pages.push(page);
            this.renderATable(page);
            this.offset = page[page.length-1].id;
            cb();
        }
    },
    addCar: function(_data, cb){
        var req = $.post('api/v1/car', {data: JSON.stringify(_data)}, function(response){
            if(response.success == false){
                console.log("Error: On adding new vehicle.");
                cb(new Error("Error: On adding new vehicle."));
            }else{
                cb(null);
            }
        }).fail(function(request){
            console.log(request.status + ": " + request.statusText);
            cb(new Error("Error: On adding new vehicle."));
        });
    },
    getData: function(id, cb){
        var data = this.pages[this.currPage];
        data.forEach(x=>{
            if(x.id == id){
                var next = function(){
                    if(x.driverName){
                        return cb(null, x);
                    }else{
                        car.getInstName(x.driver, function(err, name){
                            if(err) return cb(err);
                            x.driverName = name;
                            cb(null, x);
                        });
                    }
                }
                if(x.defect){
                    next();
                }else{
                    this.getDefectData(id, function(err, defects){
                        if(err) return cb(err);
                        x.defect = defects;
                        next();
                    });
                } 
            }
        });
    },
    getDefectData: function(id, cb){
        $.get('api/v1/car/' + id + '/defect', function(response){
            if(response.success){
                cb(null, response.data);
            }else{
                cb(new Error("Error: getting data from server."));
            }
        });
    },
    getInstName: function(id,cb){
        $.get('api/v1/instructor/'+id+'/fullname', function(response){
            if(response.success){
                cb(null, response.data);
            }else{
                cb(new Error("Error: getting data from server."));
            }
        });
    },
    update: function(data, cb){
        var id = this.selectedCar;
        var onSuccess = function(res){
            if(res.success){
                cb(null, true);
            }else{
                onFail(res.detail);
            }
        };
        var onFail = function(err){
            cb(new Error("Error: " + err));
        };
        $.ajax({
            type: "PUT",
            url: 'api/v1/car/'+ id,
            data: {data: JSON.stringify(data)},
            success: onSuccess,
            error: onFail
        });
    },
    delete: function(id, cb){
        var onSuccess = function(response){
            if(response.success){
                cb(null, true);
            }else{
                onFail(response.detail);
            }
        };
        var onFail = function(err){
            cb(new Error('Error: performing action.'));
        };
        $.ajax({
            type: "DELETE",
            url: 'api/v1/car/' + id,
            success: onSuccess,
            error: onFail
        });
    },
    addDefect: function(data, cb){
        $.post('api/v1/car/'+car.selectedCar+'/defect', {data: JSON.stringify(data)}, function(response){
            if(response.success){
                cb(null, true);
            }else{
                cb(new Error("Error: can't perform request."));
            }
        }).fail(function(err){
            cb(new Error("Error: can't perform request."));            
        });
    },
    delDefect: function(id, cb){
        var onSuccess = function(response){
            if(response.success){
                cb(null, true);
            }else{
                onFail(error);
            }
        };
        var onFail = function(error){
            cb(error);
        }
        $.ajax({
            type: "DELETE",
            data: {data: id},
            url: 'api/v1/car/'+ this.selectedCar + '/defect',
            success: onSuccess,
            error: onFail
        });
    },
    refresh: function(){
        this.offset = 0;
        this.currPage = 0;
        $.get('api/v1/car?offset='+ this.offset + '&limit=' + this.limit, function(res){
            if(res.success){

            }else{
                
            }
        });
    }
}
/* 
*   instructor module, same as car module. Pero para lang kay instructor.
*/
var inst = {
    selected: 0,
    offset: 0,
    limit: 10,
    currPage: 0,
    pages: [],
    registrationDetail: {},
    getInstList: function(cb){
        var self = this;
        var addPage = function(err, data){
            if(err) return cb(new Error("Error: getting data."));
            self.pages.push(data);
            self.offset = data[data.length-1].id;
            cb(null, true);
        };
        $.get('api/v1/instructor?offset=' + this.offset + '&limit=' + this.limit, function(res){
            if(res.success){
                addPage(false, res.data);
            }else{
                addPage(true);
            }
        }).fail(function(err){
            addPage(true);
        });
    },
    register: function(cb){
        var onFail = function(xhr, detail){    
            if(xhr){
                cb(new Error("Error: " + xhr.status + "\n" + xhr.statusText));
            }else{ 
                cb(new Error("Error: " + detail));
            }
        }
        $.post('api/v1/instructor', {data: JSON.stringify(this.registrationDetail)}, function(res){
            if(res.success){
                cb(null, true);
            }else{
                onFail(null, res.detail);
            }
        }).fail(function(xhr){
            onFail(xhr);
        });
    },
    getLocalData: function(cb){
        this.pages[this.currPage].forEach(x=>{
            if(x.instID == this.selected){
                return cb(x);
            }
        });
    },
    delete: function(date, cb){
        var onFail = function(detail){
            var error = new Error(detail);
            cb(error);
        };
        $.ajax({
            type: "DELETE",
            url: "api/v1/instructor/" + this.selected,
            data: {data: JSON.stringify(date)},
            success: function(res){
                if(res.success){
                    cb(null, res.detail);
                }else{
                    onFail(res.detail);
                }
            },
            error: onFail,
        }).fail(function(xhr){
            onFail("Error: " + xhr.status + "\n" + xhr.statusText);
        });
    },
    update: function(data, cb){
        var json = JSON.stringify(data);
        console.log(data);
        var onFail = function(detail){
            var error =  new Error(detail);
            cb(error);
        };
        $.ajax({
            type: "PUT",
            url: 'api/v1/instructor/' + this.selected,
            data: {data: json},
            success: function(res){
                if(res.success){
                    cb(null, res.detail);
                }else{
                    onFail(res.detail);
                }
            }
        }).fail(function(xhr){
            onFail("Error: " + xhr.status + "\n" + xhr.statusText);
        });
    },
}
/* 
*   paul-made module design to query request one at a time, to prevent server congestion.
*/
var queryer = {
    arrData: [],
    nextData: 0,
    err: null,
    actionPerform: (data, callback)=>{},
    done: (error, done)=>{},    
    next: function(){
        var self = this;
        if(this.err) return this.finish();
        if(this.nextData >= this.arrData.length) return this.finish();
        else this.action(this.arrData[this.nextData], function(ok, not){
            if(not) return self.abort(not);
            else {
                self.nextData++;
                self.next();
            }
        });
    },
    action: function(data, cb){
        this.actionPerform(data, function(err, result){
            if(err) cb(null, err);
            cb(true, null);
        });
    },
    start: function(action, data, cb){
        this.actionPerform = action;
        this.arrData = data;
        this.done = cb;
        this.next();
    },
    finish: function(){
        if(this.err) return this.done(this.err);
        this.done(null, true);
    },
    abort: function(reason){
        this.err = reason;
    }
}
/* 
*   refresh module
*/
var refresher = {
    interval: 5,
    intervalPerModule: 2,
    modules: {},
    moduleNames: [],
    addModule: function(moduleName, moduleCall){
        this.modules[moduleName] = function(cb){
            moduleCall(function(err, done){
                if(err) return cb(err);
                cb(null);
            });
        };
        this.moduleNames.push(moduleName);
        return true;
    },
    callModule: function(name, cb){
        this.modules[name](function(err){
            if(err) return cb(err);
            cb(null);
        });
    },
    refreshAll: function(cb){
        var action = function(data, cb){
            data(function(err){
                if(err) return cb(err);
                cb(null);
            });
        };
        queryer.start(action, this.modules, function(err, done){
            if(err) return cb(err);
            cb(null);
        });
    }
}

var uploadPic = {

}