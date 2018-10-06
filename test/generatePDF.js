var pdf = require('../bin/pdfGenerator');

// pdf.generateView(pdf.templates.certificate, {}, function(err, html){
//     if(err) return console.error(err);
//     pdf.generatePDF(html, pdf.saveAsFile, function(err, filename){
//         if(err) return console.error(err);
//         console.log(filename);
//     });
// });

pdf.generateView(pdf.reportTemplates.studPerformanceAll, {}, function(err, html){
    if(err) return console.error(err);
    pdf.generatePDF(html, pdf.saveAsFile, function(err, filename){
        if(err) return console.error(err);
        console.log(filename);
    });
});