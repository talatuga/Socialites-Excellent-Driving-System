require('datejs');
var ejs = require('ejs');
var html_pdf = require('html-pdf');

console.log('start');
var html;
ejs.renderFile('../views/student/receipt.ejs', function (err, output) {
    if (err) return console.error(err);
    html = output;
    html_pdf.create(html).toFile('../public/pdf/sample.pdf',function(er, res){
        if (er) return console.error(er);
        console.log(res.filename);
    });
});