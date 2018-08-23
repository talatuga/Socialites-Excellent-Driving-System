var app = {
    start: function(){
        this.preference.getPreference('',function(){});
        this.paymentAccount.getPayment(function(err, data){
            if(err) throw new Error('Null result');
            $('#accountTable').html('');
            data.forEach((e,i)=>{
                var html = "<tr>";
                html += "<td>"+ Date.parse(e.date).toString('MM/dd/yyyy') +"</td>";
                html += "<td>"+ e.transaction +"</td>";
                html += "<td>"+ parseFloat(e.price).formatMoney(2) +"</td>";
                html += "<td>"+ (parseFloat(e.price) - parseFloat(e.balance)).formatMoney(2) +"</td>";
                html += "<td>"+ parseFloat(e.balance).formatMoney(2) +"</td>";
                html += "<td><button type='button' onclick='viewReceipt()' class='btn100px btn13 btn btn-inverse m-b-10 m-l-5'>View Receipt</button></td>";
                html += "</tr>";
                $('#accountTable').append(html);
            });
        });
    },
    preference: {
        getPreference: function(target,cb){
            $.ajax({
                type: "GET",
                url: "/api/v1/sched/preference",
                success: function(res){
                    if(res.success){
                        $('.prefVehi').html(res.data.car.name);
                        $('.prefVehi').attr('data-id', res.data.car.id);
                        $('.prefDays').attr('data-days', res.data.days);
                        var prefDays = [];
                        var days = JSON.parse(res.data.days);
                        days.forEach((element,i) => {
                            switch(element){
                                case 1 : {
                                    prefDays.push("MON");
                                    break;
                                }
                                case 2 : {
                                    prefDays.push("TUE");
                                    break;
                                }
                                case 3 : {
                                    prefDays.push("WED");
                                    break;
                                }
                                case 4 : {
                                    prefDays.push("THU");
                                    break;
                                }
                                case 5 : {
                                    prefDays.push("FRI");
                                    break;
                                }
                                case 6 : {
                                    prefDays.push("SAT");
                                    break;
                                }
                                case 7 : {
                                    prefDays.push("SUN");
                                    break;
                                }
                            }
                            if(i == days.length-1){
                                $('.prefDays').html(prefDays.join());
                            }
                        });
                    }
                },
            });
        },
    },
    paymentAccount: {
        getPayment: function(cb){
            $.get('/api/v1/stud/payment/sessionID', function(res){
                if(res.success){
                    cb(null, res.data);
                }else{
                    cb(new Error(res.detail));
                }
            });
        },  
    },
}