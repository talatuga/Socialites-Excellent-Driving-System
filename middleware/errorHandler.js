/* 
    errorHandler.js, from its name itself hahaha. 
    Ginawa ko to para mahandle lahat ng error that might happen.
    May default handler naman ng error ang express pero di sa specific ng system natin.
*/

var logger = require('../bin/logger');
var renderer = require('./viewRenderer');

exports.error500 = function(err, req, res, next){
    console.error("[SERVER] " + err + " Check error.log for information.");
    logger.errLogger(err.stack);
    if(req.xhr == true){
        return res.status(500).send({success: false, error: 500, detail: "Internal Server Error. Sorry for the inconvience. We'll fix it soon."});
    }else{
        res.status(500);
        res.locals.data = {title: "Error: 500", detail: "Internal Server Error. We track these errors automatically, but if the problem persists feel free to contact us. In the meantime, try refreshing."};
        return renderer.error(req, res);
    }
}

exports.error404 = function(req, res) {
    if(req.xhr == true){
        return res.status(404).send({});
    }else{
        res.status(404);
        res.locals.data = {success: false, title: "Error: 404", detail: "Sorry but we couldn't find this page, This page you are looking for does not exist"};
        return renderer.error(req, res);
    }
}

exports.error401 = function(req, res, next){
    if(res.locals.authenticated == 0){
        if(req.xhr == true){
            res.status(401).send({detail: "Unauthorized Access"});
        }else{
            res.status(401);
            res.locals.data = {success: false, title: "Error: 401", detail: "Unauthorized Access."};
            return renderer.error(req, res);
        }
    }else{
        next();
    }
}

exports.error403 = function(req, res, next){
    if(req.xhr == true){
        return res.status(403).send({});
    }else{
        res.status(403);
        res.locals.data = {success: false, title: "Error: 403", detail: "Forbidden."};
        return renderer.error(req, res);
    }
}
//SD:  I suggest doing a View for these errors, para di mukhang plain and halatang error. :D
//RE: Noted po! Di ko muna tanggalin tong comment since di ko pa nagagawa. Let's discuss this further on sat, Apr 28, 2018 :)