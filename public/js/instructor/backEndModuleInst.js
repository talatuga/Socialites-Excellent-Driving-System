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
    addGradeLesson: function(_data, cb){
        var req = $.post('api/v1/grade/student/' + studID, {data: JSON.stringify(_data)}, function(response){
            if(response.success == false){
                console.log(response.detail);
                cb(new Error(response.detail));
            }else{
                cb(null);
            }
        }).fail(function(request){
            console.log(request.status + ": " + request.statusText);
            cb(new Error("Error: On submitting grades for lessons"));
        });
    },
    getGradesInst: function(cb){
        var req = $.get('api/v1/grade/student/' + studID, function(response){
            if(response.success == false){
                console.log(response.detail);
                cb(new Error(response.detail));
            }else{
                cb(null, response.data);
            }
        }).fail(function(request){
            console.log(request.status + ": " + request.statusText);
            cb(new Error("Error: On displaying student grades"));
        });
    },
    getGradesInst2: function(cb){
        var req = $.get('api/v1/grade/student2/' + studID, function(response){
            if(response.success == false){
                console.log(response.detail);
                cb(new Error(response.detail));
            }else{
                cb(null, response.data);
            }
        }).fail(function(request){
            console.log(request.status + ": " + request.statusText);
            cb(new Error("Error: On displaying student grades"));
        });
    },
    getGradesSum: function(cb){
        var req = $.get('api/v1/grade/student/' + studID + "/sum", function(response){
            if(response.success == false){
                console.log(response.detail);
                cb(new Error(response.detail));
            }else{
                cb(null, response.data);
            }
        }).fail(function(request){
            console.log(request.status + ": " + request.statusText);
            cb(new Error("Error: On submitting grades for lessons"));
        });
    },
    getLessonEnrolled: function(cb){
        var req = $.get('api/v1/grade/student/' + studID + "/lesson", function(response){
            if(response.success == false){
                console.log(response.detail);
                cb(new Error(response.detail));
            }else{
                cb(null, response.data);
            }
        }).fail(function(request){
            console.log(request.status + ": " + request.statusText);
            cb(new Error("Error: On displaying available lessons"));
        });
    },
    addGradeModal: function(cb){
        var req = $.get('api/v1/grade/student/' + studID + "/sched", function(response){
            if(response.success == false){
                console.log(response.detail);
                cb(new Error(response.detail));
            }else{
                cb(null, response.data);
            }
        }).fail(function(request){
            console.log(request.status + ": " + request.statusText);
            cb(new Error("Error: On display for add grade modal"));
        });
    },
    updateGradeLesson: function(data, cb){
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
            url: 'api/v1/grade/'+ selectedDataID,
            data: {data: JSON.stringify(data)},
            success: onSuccess,
            error: onFail
        });
    },
    getEvalStud: function(cb){
        var req = $.get('api/v1/grade/student/' + studID + '/eval', function(response){
            if(response.success == false){
                console.log(response.detail);
                cb(new Error(response.detail));
            }else{
                cb(null, response.data);
            }
        }).fail(function(request){
            console.log(request.status + ": " + request.statusText);
            cb(new Error("Error: On displaying evaluation"));
        });
    },
    getEvalInstPerc: function(cb){
        $.ajax({
            type: "GET",
            url: 'api/v1/grade/eval/' + instID,
            data: {year: yearnow, month: uptomonth1},
            success: (res)=>{
                if(res.success){
                    cb(null, res.data);
                }else{
                    cb(new Error(res.detail));
                }
            },
            error: xhr=>cb(new Error(xhr.status+": "+xhr.statusText)),
        });
    },
    getEvalInstPercMonth: function(cb){
        $.ajax({
            type: "GET",
            url: 'api/v1/grade/eval/' + instID + '/month',
            data: {year: yearnow, month: monthnow},
            success: (res)=>{
                if(res.success){
                    cb(null, res.data);
                }else{
                    cb(new Error(res.detail));
                }
            },
            error: xhr=>cb(new Error(xhr.status+": "+xhr.statusText)),
        });
    },
    getEvalInst: function(cb){
        $.ajax({
            type: "GET",
            url: 'api/v1/grade/evalInst/' + instID,
            data: {year: yearnow, month: monthnow},
            success: (res)=>{
                if(res.success){
                    cb(null, res.data);
                }else{
                    cb(new Error(res.detail));
                }
            },
            error: xhr=>cb(new Error(xhr.status+": "+xhr.statusText)),
        });
    },
}