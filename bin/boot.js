/* 
*   This is the boot module where everything should glued up to work as system.
*   created by: CPRT
*/
var server = require('./server');
var haven = require('./haven');

var boot = {};

boot.start = function(){
    var initProcess = new haven();
    initProcess.start(function(){
        server.start();
    });
};

boot.stop = function(){

};

module.exports = boot;