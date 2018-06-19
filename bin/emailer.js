var mailer = require('nodemailer');

var Mailer = function(account){
    this.email = account.email;
    this.transporter = mailer.createTransport({
        service: account.service,
        auth:{
            user: account.email,
            pass: account.password,
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