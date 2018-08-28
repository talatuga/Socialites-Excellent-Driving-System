var app = {
    schedule: {
        getToday: function(cb){
            $.ajax({
                type: "GET",
                url: "api/v1/sched",
                data: {
                    month: Date.parse('today').toString('MMMM'),
                    day: Date.parse('today').toString('dd'),
                    instid: 'self',
                },
                success: function(res){
                    if(res.success){
                        cb(null, res.data);
                    }else{
                        cb(new Error(res.detail));
                    }
                },
                error: xhr=>cb(new Error(xhr.status + ": " + xhr.statusText)),
            });
        },
        getTom: function(cb){
            $.ajax({
                type: "GET",
                url: "api/v1/sched",
                data: {
                    month: Date.parse('today').toString('MMMM'),
                    day: Date.parse('tomorrow').toString('dd'),
                    instid: 'self',
                },
                success: function(res){
                    if(res.success){
                        cb(null, res.data);
                    }else{
                        cb(new Error(res.detail));
                    }
                },
                error: xhr=>cb(new Error(xhr.status + ": " + xhr.statusText)),
            });
        },
    },
    getBranchName: function(id, cb){
        $.get('api/v1/branch/'+id+'/name', function(res){
            if(res.success){
                cb(null, res.data);
            }else{
                cb(new Error(res.detail));
            }
        });
    },
    getStudentName: function(id, cb){
        $.get('api/v1/stud/'+id, function(res){
            if(res.success){
                cb(null, res.data[0]);
            }else{
                cb(new Error(res.detail));
            }
        });
    },
}