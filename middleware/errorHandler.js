/* 
    errorHandler.js, from its name itself hahaha. 
    Ginawa ko to para mahandle lahat ng error that might happen.
    May default handler naman ng error ang express pero di sa specific ng system natin.
*/

var logger = require('./logger');

exports.error500 = function(err, req, res, next){
    console.error("[SERVER] " + err + " Check error.log for information.");
    logger.errLogger(err.stack);
    if(req.method == "POST"){
        return res.status(500).send({error: 500, detail: "Internal Server Error. Sorry for the inconvience. We'll fix it soon."});
    }else{
        return res.status(500).send("<h1>Internal Server Error. Sorry for the inconvience. We'll fix it soon.</h1>");
    }
}

exports.error404 = function(req, res) {
    if(req.method == "POST"){
        return res.status(404).send({});
    }else{
        return res.status(404).send('<h1>404 Page not found.</h1>');
    }
}

//SD:  I suggest doing a View for these errors, para di mukhang plain and halatang error. :D
//RE: Noted po! Di ko muna tanggalin tong comment since di ko pa nagagawa. Let's discuss this further on sat, Apr 28, 2018 :)