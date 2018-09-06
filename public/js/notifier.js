var notifier = {
    init: (cb)=>{
        notifier.getNotif(cb);
    },
    getNotif: (cb)=>{
        var notif = ()=>{
            $.ajax({
                type: "GET",
                url: "api/v1/notif",
                timeout: 15000,
                success: res=>{
                    if(res.success){
                        cb(res.data);
                        notif();
                    }else{
                        cb(res.detail);
                        notif();
                    }
                },
                error: xhr=>{
                    if(xhr.statusText == "timeout"){
                        notif();
                    }
                },
            });
        };
        notif();
    },
};