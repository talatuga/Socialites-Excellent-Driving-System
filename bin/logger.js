/* 
    logger.js, laman nito yung logging mechanism nung server, 
    for debugging purpose, future development, and monitoring server and request activity.
*/

var fs = require('fs');
var today = new Date();
var checkLogFolder = function(path, cb){
    fs.mkdir(path, function(err){
        if(err){
            if(err.code == 'EEXIST') cb(null);
            else cb(err);
        }else{
            cb(null);
        }
    });
}

exports.midLogger = function(req, res, next){
    var data = "["+ today.toString('MM-dd-yyyy HH:mm') +"] " + req.sessionID + " " + req.method + " " + req.ip + " " + req.path + "\n";
    fs.appendFile('./log/' + today.toString('MM-dd-yyyy') + '.log', data, function(err){
        if(err){
            next(new Error(err));
            console.log('[SERVER] Logging ' + err.stack);
        }else{
            next();
        }
    });
}

exports.errLogger = function(err){
    fs.appendFile('./log/error.log', "***" + today.toString() + "***\n" + err + "\n***\n\n", function(err){
        if(err){
            console.log("[SERVER] Logging " + err.stack);        
        }
    });
}

exports.logger = function(message){
    var data = "["+ today.toString('MM-dd-yyyy HH:mm') +"] " + message;
    fs.appendFile('./log/' + today.toString('MM-dd-yyyy') + '.log', data, function(err){
        if(err){
            throw err;
            console.log('[SERVER] Logging ' + err.stack);
        }
    });
}

exports.config = function(){
    var log = function(){
        exports.logger(err);
    };

    process.on('warning', log);
    process.on('unhandledRejection', log);
}

checkLogFolder('log', function(err){
    if(err){
        console.log(err.stack);
    }
});