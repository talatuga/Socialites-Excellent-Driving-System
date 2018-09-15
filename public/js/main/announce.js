function viewAnnouncements(){
    announcement.getAnnouncementListWeb(function(err, data){
        if(err){
            swal("Failed!", err.message, "error");
            console.log(err);
        }else{
            $('.newAnnounceDiv').html("");
            var dataLen = data.length;
            if(data.length!=0){
                $('.noAnnounceDiv').hide();
                data.forEach(e => {
                    var html = "<h2 class='headAnnounce'>"+ e.title +"</h2>";
                    html += "<h4>Date Announced: <span class='dateAnnounce'>"+ Date.parse(e.dateFrom).toString('MMM dd, yyyy') +"</span></h4><hr>";
                    html += "<h5 class='msgAnnounce'>"+ e.message +"</h5>";
                    html += "<div class='separator'></div><br><br><br>";
                    $('.newAnnounceDiv').append(html);
                });
            }else {
                $('.newAnnounceDiv').hide();
                $('.noAnnounceDiv').show();
            }
        }
    });
}