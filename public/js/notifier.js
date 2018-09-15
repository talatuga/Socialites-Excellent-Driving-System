var notifier = {
    request: null,
    init: cb=>{
        notifier.getNotif(cb);
    },
    getNotif: cb=>{
        var notif = ()=>{
            notifier.request = $.ajax({
                type: "GET",
                url: "api/v1/notif",
                timeout: 0,
                success: res=>{
                    if(res.success){
                        cb(res.data);
                        notif();
                    }else{
                        notif();
                    }
                },
                error: xhr=>{
                    if(xhr.statusText == "timeout"){
                        //notif();
                    }
                },
            });
        };
        notif();
    },
    stop: ()=>{
        return notifier.request.abort();
    },
};