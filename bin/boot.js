/* 
*   This is the boot module where everything should glued up to work as system.
*   created by: CPRT
*/
var express = require('express');
var haven = require('./haven');

var boot = {};

boot.start = function(){
    var initProcess = new haven();
    initProcess.start(function(){
        require('../server');
    });
};

boot.stop = function(){

};

module.exports = boot;