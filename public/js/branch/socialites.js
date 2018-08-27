/**
 * Socialites WEB main module for server communications.
 * created by: CPRT of TLTG
 */
var app = {}; 
app.start = function(){

};

/* 
*   student module,
*/
var stud = {
    selected: 0,
    selectedID: 0,
    offset: [0,0],
    limit: 10,
    currPage: [0,0],
    tableType: 0,
    pages: {
        current: [],
        past: [],
    },
    getList: function(cb){
        var self = this;
        var url = 'api/v1/stud?offset='+this.offset[this.tableType]+'&limit='+this.limit + '&filter=' + 1 + "&branch=" + $('body').data('branch');
        var processPage = function(data){ 
            if(data.length == 0) return cb(null);
            self.pages[(self.tableType == 0 ? "current" : "past")][self.currPage[self.tableType]] = data;
            self.offset[self.tableType] = data[data.length-1].id;                                    
            cb(null);
        };
        var onfail = function(detail){
            cb(new Error(detail));
        };
        return $.get(url, function(res){
            if(res.success){
                processPage(res.data);
            }else{
                onfail(res.detail);
            }
        }).fail(function(xhr){
            onfail("Error: " + xhr.status + "\n" + xhr.statusText);
        });
    },
    add: function(data, cb){
        var onfail = function(detail){
            cb(new Error(detail));
        };
        return $.post('api/v1/stud', {data: JSON.stringify(data)}, function(res){
            if(res.success){
                cb(null);
            }else{
                onfail(res.detail);
            }
        }).fail(function(xhr){
            onfail("Error: " + xhr.status + "\n" + xhr.statusText);
        });
    },
    edit: function(data, cb){
        var onfail = function(detail){
            cb(new Error(detail));
        };
        return $.ajax({
            type: "PUT",
            url: "api/v1/stud/" + this.selected,
            data: {data: JSON.stringify(data)},
            success: function(res){
                if(res.success){
                    cb(null);
                }else{
                    onfail(res.detail);
                }
            },
        }).fail(function(xhr){
            onfail("Error: " + xhr.status + "\n" + xhr.statusText);
        });
    },
    delete: function(cb){
        var onfail = function(detail){
            cb(new Error(detail));
        };
        return $.ajax({
            type: "DELETE",
            url: "api/v1/stud/" + this.selectedID,
            success: function(res){
                if(res.success){
                    cb(null);
                }else{
                    onfail(res.detail);
                }
            },
        }).fail(function(xhr){
            onfail("Error: " + xhr.status + "\n" + xhr.statusText);
        });
    },
    getLocalData: function(cb){
        this.pages[(this.tableType == 0 ? "current" : "past")][this.currPage[this.tableType]].forEach(x=>{
            if(this.selected == x.id){
                return cb(x);
            }
        });
    },
    refresh: function(){
        this.offset[this.tableType] = 0;
        this.currPage[this.tableType] = 0;
        this.getList(()=>{
            renderStudentTable(stud.pages[(stud.tableType == 0 ? "current" : "past")][stud.currPage[stud.tableType]], ()=>{});
        });
    },
    getPaymentAccount: function(id,cb){
        $.get('/api/v1/stud/payment/' +id, function(res){
            if(!res.success) return cb(res.detail);
            cb(null, res.data);
        });
    },
}