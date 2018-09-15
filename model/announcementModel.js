var db = require('./db');
var ModelModule = require('./model');
var table = "announcement";

var Announcement = {};
Announcement = Object.create(ModelModule);
Announcement.table = "announcement";
Announcement.db = db;

//Business Logic Below:
Announcement.addAnnouncement = function (data, cb){
    Announcement.create(data,cb);
}

Announcement.getAnnouncementList = function(data, cb){
    var sql = "SELECT * FROM announcement WHERE status = 1 OR status = 2 ORDER BY dateFrom";
    db.get().query(sql, function(err, result){
        if(err) return cb(err);
        if(result.length == 0) return cb(null, []);
        if(err) return cb(err);
        cb(null, result);
    });
}

Announcement.getAnnouncementListWeb = function(data, cb){
    var sql = "SELECT * FROM announcement WHERE status = 1 ORDER BY dateFrom DESC";
    db.get().query(sql, function(err, result){
        if(err) return cb(err);
        if(result.length == 0) return cb(null, []);
        if(err) return cb(err);
        cb(null, result);
    });
}

Announcement.viewAnnouncement = function(annID, cb){
    var sql = "SELECT * FROM announcement WHERE id = ?";
    db.get().query(sql, [annID], function(err, result){
        if(err) return cb(err);
        if(result.length == 0) return cb(null, []);
        if(err) return cb(err);
        cb(null, result);
    });
}

module.exports = Announcement;