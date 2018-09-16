/* 
    logger.js, laman nito yung logging mechanism nung server, 
    for debugging purpose, future development, and monitoring server and request activity.
*/

var fs = require('fs');
var logFolder = process.env.LOG_FOLDER || "log";

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
    var today = new Date();
    if(process.env.LOG_REQUEST === "true"){
        var data = "["+ today.toString('MM-dd-yyyy HH:mm') +"] " + req.sessionID + " " + req.method + " " + req.ip + " " + req.path + "\n";
        fs.appendFile('./log/' + today.toString('MM-dd-yyyy') + '.log', data, function(err){
            if(err){
                next(new Error(err));
                console.log('[SERVER] Logging ' + err.stack);
            }
        });
    }
    next();
}

exports.errLogger = function(err){
    var today = new Date();
    fs.appendFile('./log/error.log', "***" + today.toString() + "***\n" + err + "\n***\n\n", function(err){
        if(err){
            console.log("[SERVER] Logging " + err.stack);        
        }
    });
}

exports.logger = function(message){
    var today = new Date();
    var data = "["+ today.toString('MM-dd-yyyy HH:mm') +"] " + message + "\n";
    fs.appendFile('./log/' + today.toString('MM-dd-yyyy') + '.log', data, function(err){
        if(err){
            console.log('[SERVER] Logging ' + err.stack);
            throw err;
        }
    });
}

exports.config = function(){
    var log = function(err){
        exports.errLogger(err.stack);
    };

    process.on('warning', log);
    process.on('unhandledRejection', log);
}

checkLogFolder(logFolder, function(err){
    if(err){
        console.log(err.stack);
    }
});