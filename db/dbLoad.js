/**
 * Automation of Loading Database Schema.
 * written by: CPRT
 */
require('dotenv').config();
var mysql = require('mysql');
var fs = require('fs');

var connection = mysql.createConnection({
    host: (process.env.DB_HOST || "127.0.0.1"),
    user: (process.env.DB_USER || "root"),
    password: (process.env.DB_PASS || "")
});

console.log("Connecting to MySQL Server...");
connection.connect(function(err){
    if(err){
        console.error("Error Connection to MySQL... Aborting.");
        process.exit(1);
        return;
    }
    var file = process.argv[2];
    console.log("Reading " + file + "...");
    fs.readFile(file, function(err,data){
        if(err){
            console.error("Error Loading DB query file... Aborting.");
            process.exit(1);
            return;
        }
        var sql = data.toString();
        console.log("Executing " + file + " query...");
        connection.query(sql, function(err, result){
            if(err){
                console.error("Error executing query... Aborting.");
                console.error(err.message);
                process.exit(1);
                return;
            }
        });
    })
});