//Imports
var express = require('express');
var app = express();
var db = require('./model/db');
var router = require('./controller/routes');

//Server Utility Imports
var parser = require('body-parser');
var cookie_parser = require('cookie-parser');
var session = require('express-session');
var promise = require('express-promise');
var systemEvents = require('./model/events');

//Configurations.
require('datejs');
require('dotenv').config();
require('./bin/logger').config();
app.set('view engine', 'ejs'); //this change the view engine to ejs, (mahirap kasi yung default)
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use(cookie_parser());
app.use(session({secret: "Secret Thing", resave: false, saveUninitialized: true}));
app.use(promise()); //this makes promises come true. Still can't use it properly soo disable muna. 
app.use('/assets', express.static(__dirname + '/public')); //this make public folder static/public
app.use('/', router); //this will route everything.

//Establish DB connection then open Server port listener.
db.connect(db.MODE_PRODUCTION, function (err) {
    if (err) {
        console.error('[SERVER] Unable to connect to MySQL. Please check the MySQL connection and restart the server. ' + err);
        process.exit(1);
    } else {
        //Change yung port pag production na.
        var server = app.listen((process.env.SERVER_PORT || 80), function(){
            console.log('[SERVER] Listening in port: ' + server.address().port);
        }).on('error',function(err){
            console.error('[SERVER] Network related error. Port must be in use. ' + err);
            process.exit(1);
        });
        systemEvents();
    }
});