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
    getGradesStud: function(cb){
        $.ajax({
            type: "GET",
            url: 'api/v1/grade/stud/' + studID,
            data: {gCourse: courseID, ceCourse: courseID},
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
}