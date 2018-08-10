var studentSchedule = {
    url: "/api/v1/sched",
    sched: [],
    removeSched: function(id, cb){
        /* $.ajax({
            type: "PATCH",
            url: this.url + "/" + id,
            success: function(res){
                if(res.success){
                    cb(null);
                }else{
                    console.log(res.detail);
                    cb(new Error(res.detail));
                }
            },
        }).fail(function(xhr){
            var err = new Error(xhr.statusText);
            console.log(err);
            cb(err);
        }); */ cb(null);
    },
    updateSchedule: function(id, date, cb){
        /* $.ajax({
            type: "PUT",
            url: this.url + "/" + id,
            data: {
                start: date.start,
                end: date.end
            },
            success: function(res){
                if(res.success){
                    cb(null);
                }else{
                    console.log(res.detail);
                    cb(new Error(res.detail));
                }
            },
        }).fail(function(xhr){
            var err = new Error(xhr.statusText);
            console.log(err);
            cb(err);
        }); */ cb(null);
    },
    onremove: function(elem,id, title){
        var self = this;
        $(elem).on("remove", function(){
            self.updateSchedule(id, {},function(err){
                if(err){
                    $('#calendarSelectSched').fullCalendar('removeEvents', id);
                    var el = $("<div id='sched_"+ id +"' data-schedid="+ id +" class='fc-event'>").appendTo('#availEvents').text(title);
                    el.draggable({
                        zIndex: 999,
                        revert: true,
                        revertDuration: 0
                    });
                    el.data('event', { title: title, _id: id, stick: true });
                    self.onremove($("#sched_" + id), id, title);
                }
            });
        });
    },
};