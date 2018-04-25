/* 
    authentication.js: This authenticates all requests passed on admin and api routes for security purposes.
*/

var users = {};

exports.auth = function(req, res, next){
    if(req.url == '/'){
        return next();
    }
    var id = req.sessionID;
    checkUser(id, function(user){
        if(user){
            req.locals.authenticated = 1;
            next();
        }else{
            if(req.method == "POST"){
                return res.send({error: 1, detail: 'Authentication Failed.'});
            }else{
                //res.redirect('/admin');
                res.send('Authentication Failed');
            }
        }
    });
}

exports.login = function(req, res){
    var id = req.sessionID;
    checkUser(id, function(user){
        if(user == null){
            if(req.method == "POST"){
                //sign up process, db querying and callback to here.
                users[id] = {};
                res.render('admin/index',{data: users[id]});
            }else{
                res.render('admin/login');
            }
        }else{
            res.render('admin/index',{data: user});
        }
    });
}

exports.logout = function(req, res){
    delete users[req.sessionID];
    res.redirect('/admin');
}

var checkUser = function(param, cb){
    if(users[param]){
        cb(users[param]);
    }else{
        cb(null);
    }
}