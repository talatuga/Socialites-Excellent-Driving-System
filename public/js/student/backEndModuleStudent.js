var evaluation = {
    selected: -1,
    offset: 0,
    limit: 20,
    currPage: 0,
    pages: [],
    addEval: function(_data, cb){
        var req = $.post('api/v1/grade', {data: JSON.stringify(_data)}, function(response){
            if(response.success == false){
                console.log(response.detail);
                cb(new Error(response.detail));
            }else{
                cb(null);
            }
        }).fail(function(request){
            console.log(request.status + ": " + request.statusText);
            cb(new Error("Error: On submitting evaluation details"));
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
            url: 'api/v1/grade/' + id,
            success: onSuccess,
            error: onFail
        });
    },
    // getData: function(id, cb){
    //     var data = this.pages[this.currPage];
    //     data.forEach(x=>{
    //         if(x.id == id){
    //             var next = function(){
    //                 if(x.driverName){
    //                     return cb(null, x);
    //                 }else{
    //                     car.getInstName(x.driver, function(err, name){
    //                         if(err) return cb(err);
    //                         x.driverName = name;
    //                         cb(null, x);
    //                     });
    //                 }
    //             }
    //             if(x.defect){
    //                 next();
    //             }else{
    //                 this.getDefectData(id, function(err, defects){
    //                     if(err) return cb(err);
    //                     x.defect = defects;
    //                     next();
    //                 });
    //             } 
    //         }
    //     });
    // },
    // getDefectData: function(id, cb){
    //     $.get('api/v1/car/' + id + '/defect', function(response){
    //         if(response.success){
    //             cb(null, response.data);
    //         }else{
    //             cb(new Error("Error: getting data from server."));
    //         }
    //     });
    // },
    // getInstName: function(id,cb){
    //     $.get('api/v1/instructor/'+id+'/fullname', function(response){
    //         if(response.success){
    //             cb(null, response.data);
    //         }else{
    //             cb(new Error("Error: getting data from server."));
    //         }
    //     });
    // },
    // update: function(data, cb){
    //     var id = this.selectedCar;
    //     var onSuccess = function(res){
    //         if(res.success){
    //             cb(null, true);
    //         }else{
    //             onFail(res.detail);
    //         }
    //     };
    //     var onFail = function(err){
    //         cb(new Error("Error: " + err));
    //     };
    //     $.ajax({
    //         type: "PUT",
    //         url: 'api/v1/car/'+ id,
    //         data: {data: JSON.stringify(data)},
    //         success: onSuccess,
    //         error: onFail
    //     });
    // },
    // addDefect: function(data, cb){
    //     $.post('api/v1/car/'+car.selectedCar+'/defect', {data: JSON.stringify(data)}, function(response){
    //         if(response.success){
    //             cb(null, true);
    //         }else{
    //             cb(new Error("Error: can't perform request."));
    //         }
    //     }).fail(function(err){
    //         cb(new Error("Error: can't perform request."));            
    //     });
    // },
    // delDefect: function(id, cb){
    //     var onSuccess = function(response){
    //         if(response.success){
    //             cb(null, true);
    //         }else{
    //             onFail(error);
    //         }
    //     };
    //     var onFail = function(error){
    //         cb(error);
    //     }
    //     $.ajax({
    //         type: "DELETE",
    //         data: {data: id},
    //         url: 'api/v1/car/'+ this.selectedCar + '/defect',
    //         success: onSuccess,
    //         error: onFail
    //     });
    // },
    // refresh: function(){
    //     this.offset = 0;
    //     this.currPage = 0;
    //     this.getATableData(()=>{
    //         viewCarProfile(this.selectedCar);
    //     });
    // }
}