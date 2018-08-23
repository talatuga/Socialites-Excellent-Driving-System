var evaluation = {
    selected: -1,
    offset: 0,
    limit: 20,
    currPage: 0,
    pages: [],
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
            cb(new Error("Error: On submitting grades for lessons"));
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
}