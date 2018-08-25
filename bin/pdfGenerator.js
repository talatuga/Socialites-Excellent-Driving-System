require('datejs');
var ejs = require('ejs');
var html_pdf = require('html-pdf');
var tokenizer = require('./util/tokenGenerator');

exports.templateFolder = __dirname + "/../views/pdf/";

exports.templates = {
    certificate: exports.templateFolder + 'certificate.ejs',
    receipt: exports.templateFolder +  'receipt.ejs',
    invoice: exports.templateFolder +  'invoice.ejs',
};

exports.saveAsFile = "save";
exports.getBuffer = "buffer";
exports.getStream = "stream";

exports.folderPath = "../public/pdf/";

exports.generateView = function(template, data, cb){
    ejs.renderFile(template, data, function(err, html){
        if(err) return cb(err);
        cb(null, html);
    });
};

exports.generatePDF = function(html, method, cb){
    var pdf = html_pdf.create(html);
    if(method === exports.saveAsFile){
        var filename = Date.parse('today').toString('yyyyMMdd') + tokenizer.generateToken(15) + ".pdf";
        pdf.toFile(exports.folderPath + filename, function(err, res){
            if(err) return cb(err);
            cb(null, res.filename);
        });
    }else if(method === exports.getBuffer){
        pdf.toBuffer(function(err, buffer){
            if(err) return cb(err);
            cb(null, buffer);
        });
    }else if(method === exports.getStream){
        pdf.toStream(function(err, stream){
            if(err) return cb(err);
            cb(null, stream);
        });
    }else{
        cb(new Error("Invalid Method"));
    }
};