/* 
    authentication.js: This authenticates all requests passed on admin and api routes for security purposes.
*/
var account = require('../model/userAccModel');
var errorHandler = require('./errorHandler');

var users = {};

exports.auth = function(req, res, next){
    var id = req.sessionID;
    checkUser(id, function(user){
        if(user){
            res.locals.authenticated = 1;
            next();
        }else{
            res.locals.authenticated = 0;
            next();
        }
    });
}

exports.login = function(req, res, next){
    var id = req.sessionID;
    checkUser(id, function(user){
        if(user == null){
            if(req.method == "POST"){
                //sign up process, db querying and callback to here.
                var user = req.body.user;
                var pass = req.body.pass;
                account.login({username: user, password: pass},function(err, result){
                    if(err) return next(new Error(err));
                    if(result){
                        users[id] = {accID: result.id, accType: result.accType};
                        req.session.accID = id;
                        res.locals.authenticated = 1;
                        next();
                    }else{
                        res.locals.authenticated = 0;
                        res.status(200).send({success: false, detail: "Username/Password Incorrect!"});
                    }
                });
            }else{
                next();
            }
        }else{
            next();
        }
    });
}

exports.logout = function(req, res){
    delete users[req.sessionID];
    res.redirect('/admin');
}

var checkUser = function(param, cb){
    return cb(users[param] == undefined ? null : users[param]);
    /* if(users[param]){
        cb(users[param]);
    }else{
        cb(null);
    } */
}

exports.getUser = function(id){
    return users[id] == undefined ? null : users[id];
}

exports.checkAJAX = function(req, res, next){
    if(req.xhr == true){
        next();
    }else{
        res.status(403);
        errorHandler.error403(req, res);
    }
}

exports.lastHandler = function(req, res, next){
    if(req.xhr == true){
        if(res.locals.authenticated == 1){
            res.status(200).send({success: true, accID: req.session.accID});
        }else{
            if(!res.headersSent){
                res.status(200).send({success: false});
            }
        }
    }else{
        next();
    }
}