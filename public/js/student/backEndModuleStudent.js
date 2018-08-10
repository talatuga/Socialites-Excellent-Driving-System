var studCrsLes = {
    selected: 0,
    offset: 0,
    limit: 20,
    currPage: 0,
    pages: [],
    renderStudEnrCrsTbl: function(data){
        var html = "";
        for(var x=0; x < data.length; x++){
            if(data[x].status != 0){
                html += "<tr><td>" + data[x].courseID + "</td>";
                html += "<td>" +data[x].courseID.days + "</td>";
                html += "<td>" + (data[x].special == 1 ? "Yes" : "No") + "</td>";
                html += "<td>" + data[x].dateEnrolled + "</td>";
                html += "<td>" + data[x].dateEnrolled + "</td></tr>";
                html += "</html>";
            }
        }
        $('#enrolledCrsTbl').html(html);
    },
    getStudEnrCrsTbl: function(cb){
        $.get('api/v1/course?offset=' + this.offset + '&limit=' + this.limit, function(response){
            if(response.success){
                var data = response.data;
                addPage(data);
            }else{
                console.log("Error: getting data from server.");
            }
        }).fail(request=>{
            console.log(request.status + ": " + request.statusText);
        });
        var addPage = (page)=>{
            this.pages[this.currPage] = page;
            this.renderStudEnrCrsTbl(page);
            this.offset = page[page.length-1].id;
            cb();
        }
    },
}