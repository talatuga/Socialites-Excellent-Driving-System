var pdf = require('html-pdf');
pdf.create(html).toFile([filepath, '../public/pdf/sample.pdf'], function(err, res){
  console.log(res.filename);
});

pdf.create(html).toStream(function(err, stream){
  stream.pipe(fs.createWriteStream('./foo.pdf'));
});
 
pdf.create(html).toBuffer(function(err, buffer){
  console.log('This is a buffer:', Buffer.isBuffer(buffer));
});
 
 
// for backwards compatibility
// alias to pdf.create(html[, options]).toBuffer(callback)
// pdf.create(html [, options], function(err, buffer){});