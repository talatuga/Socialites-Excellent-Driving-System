var multer = require('multer');
var tokenizer = require('../bin/util/tokenGenerator');

var storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        var file_extension = file.mimetype.split('/')[1];
        if(file_extension == "jpeg" || file_extension == "jpg" || file_extension == "png"){
            cb(null, "public/image_upload");
        }
        else {
            cb(null, "public/other_upload");
        }
    },
    filename: (req, file, cb)=>{
        var prefix = Date.parse("today").toString("yyMMdd");
        var postfix = tokenizer.generateToken(10);
        var file_extension = file.mimetype.split('/')[1];
        cb(null, prefix+postfix+"."+file_extension);
    },
});

var fileLimit = {
    fileSize: 25000000
}

module.exports = multer({storage: storage, limits: fileLimit});