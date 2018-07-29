var Validation = function(){
    var query = [];
    this.common = {
        alpha: new RegExp(/[a-zA-Z]/g),
        numeric: new RegExp(/[0-9]/g),
        alphaNumeric: new RegExp(/[a-zA-Z0-9]/g),
        email: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    };
    this.add = function(data, constraint){
        query.push([data, constraint]);
    };
    this.check = function(){
        return new Promise((approve, reject)=>{
            var failed = [];
            var fail = 0;
            query.forEach((elem, index)=>{
                var data = elem[0];
                var constraint = elem[1];
                var match = data.match(constraint);
                if(match.length != data.length){
                    if(match[0] == data){
                        
                    }else{
                        failed.push(data);
                        fail++;
                    }
                }
                if(query.length == index+1){
                    if(fail > 0){
                        reject(failed);
                    }else{
                        approve();
                    }
                }
            });
        });
    };
    this.clean = function(string, constraint){
        return string.replace(constraint,'');
    };
};
module.exports = Validation;