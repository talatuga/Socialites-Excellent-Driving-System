/* 
  db.js, Main file for DB connectivity, 
  Public functions and variables: MODE_PRODUCTION, MODE_TEST, connect(), and get()
  dbstate: 
    pool <- laman nito lahat nung connection sockets sa DB server. May 20 connection akong nilagay.
    mode <- kung anong mode nung DB natin kung production ba or testing.
*/

var mysql = require('mysql');

var dbstate = {
  pool: null,
  mode: null,
}

var production_db = "", test_db = "";

exports.MODE_PRODUCTION = 'mode_production';
exports.MODE_TEST = 'mode_test';

exports.connect = function (mode,done){
  /* dbstate.pool = mysql.createPool({
    connection: 20,
    host: '127.0.0.1',
    user: 'root',
    password: '',
    insecureAuth: true,
    database: mode === exports.MODE_PRODUCTION ? production_db : test_db
  });

  dbstate.mode = mode;

  dbstate.pool.getConnection(function(err, con){
    if(err) return done(err);
    con.release();
    done(null);
  });  */ return done(null);
}

exports.get = function() {
  return dbstate.pool;
}