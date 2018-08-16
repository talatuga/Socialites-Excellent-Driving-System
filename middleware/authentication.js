/* 
    authentication.js: This authenticates all requests passed on admin and api routes for security purposes.
*/
var account = require('../model/userAccModel');
var errorHandler = require('./errorHandler');

var users = {};

var checkUser = function(id, cb){
    return cb(users[id] ? users[id] : null);
    /* if(users[param]){
        cb(users[param]);
    }else{
        cb(null);
    } */
}

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
                    if(err) return next(err);
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

exports.studentAuth = function(req, res, next){
    var sessionID = req.sessionID;
    checkUser(sessionID, function(user){
        if(!user){
            req.session.studID = -1;
            next();
        }else{
            if(user.accType == 3){
                req.session.studID = user.studID;
                next();
            }else{
                req.session.studID = -1;
                next();
            }
        }
    });
}

exports.studentLogin = function(req, res, next){
    var user = req.body.email;
    var pass = req.body.pass;
    account.login({username: user, password: pass}, function(err, user){
        if(err) return next(err);
        if(user){
            if(user.accType == 3){
                (require('../model/studentModel')).getStudentInfo(user.id, function(err, info){
                    req.session.studID = info.studid;
                    users[req.sessionID] = {accID: user.id, studID: info.studid, accType: user.accType};
                    next();
                });
            }else{
                req.session.studID = -1;
                next();
            }
        }else{
            next();
        }
    });
}

exports.instAuth = function(req, res, next){
    var sessionID = req.session.sessionID;
    checkUser(sessionID, function(user){
        if(!user){
            req.session.instID = -1;
            next();
        }else{
            if(user.accType == 3){
                req.session.instID = user.instID;
                next();
            }else{
                req.session.instID = -1;
                next();
            }
        }
    });
}

exports.instLogin = function(req, res, next){
    var user = req.body.email;
    var pass = req.body.pass;
    account.login({username: user, password: pass}, function(err, user){
        if(err) return next(err);
        if(user){
            if(user.accType == 2){
                (require('../model/instructorModel')).getInstInfo(user.id, function(err, info){
                    req.session.instID = info.instid;
                    users[req.sessionID] = {accID: user.id, instID: info.instid, accType: user.accType};
                });
            }else{
                req.session.instID = -1;
            }
            next();
        }else{
            next();
        }
    });
}