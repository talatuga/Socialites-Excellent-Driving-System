/* 
  db.js, Main file for DB connectivity, 
  Public functions and variables: MODE_PRODUCTION, MODE_TEST, connect(), and get()
  Private var: 
    dbstate: 
      pool <- laman nito lahat nung connection sockets sa DB server. May 20 connection akong nilagay.
      mode <- kung anong mode nung DB natin kung production ba or testing.
*/

var mysql = require('mysql');

var dbstate = {
  pool: null,
  mode: null,
}

exports.MODE_PRODUCTION = 'mode_production';
exports.MODE_TEST = 'mode_test';

exports.connect = function (mode,done){
  dbstate.pool = mysql.createPool({
    connection: (process.env.DB_POOL_SIZE || 20),
    host: (process.env.DB_HOST || "127.0.0.1"),
    user: (process.env.DB_USER || "root"),
    password: (process.env.DB_PASS || ""),
    insecureAuth: true,
    database: mode === exports.MODE_PRODUCTION ? (process.env.DB_PROD || "sed") : (process.env.DB_TEST || "sed_test")
  });

  dbstate.mode = mode;

  dbstate.pool.getConnection(function(err, con){
    if(err) return done(err);
    con.release();
    done(null);
  }); 
}

exports.get = function() {
  return dbstate.pool;
}