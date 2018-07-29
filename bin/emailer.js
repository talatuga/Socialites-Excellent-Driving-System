var mailer = require('nodemailer');

var Mailer = function(){
    this.email = process.env.EMAIL_USER;
    this.transporter = mailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

Mailer.prototype.send = function(recipient, content, cb){
    var mail = {
        from: this.email,
        to: recipient,
        subject: content.subject,
        text: content.body,
    };
    this.transporter.sendMail(mail,function(err,info){
        if(err) return cb(err);
        cb(null, info.response);
    });
};

module.exports = Mailer;