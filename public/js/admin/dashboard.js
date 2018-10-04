var pie1A, pie1B, pie1C, pie1D, pie1E;
var pie2A, pie2B, pie2C, pie2D, pie2E;
var chart1A, chart1B, chart1C, chart1D, chart1E;
var chart2A, chart2B, chart2C, chart2D, chart2E;

function loadDash(){
    loadDash1();
    loadPies();
    loadCharts();
}

function loadDash1(){
    scheduler.getSchedToday(function(err, sched){
        if(err) return console.error(err);
        var x = sched.length;
        $('.schedTodayDash').html(x);
    });

    preRegAssess.getList(err=>{
        if(err) return console.error(err);
        renderEnrollTbl(preRegAssess.pages[preRegAssess.currPage]);
        var c = preRegAssess.pages[preRegAssess.currPage].length;
        $('.enrTodayDash').html(c);
    });
}

function loadPies(){
    //pie chart //current students (with ongoing courses)
    var ctx = document.getElementById("pieChart1");
    ctx.height = 180;
    var curStudChart = new Chart( ctx, {
        type: 'pie',
        data: {
            datasets: [ {
                data: [ 15, 25, 20, 10, 15 ],
                backgroundColor: [
                        "#1F0000",
                        "#3E0000",
                        "#5D0000",
                        "#935555",
                        "#C9AAAA"
                    ],
                hoverBackgroundColor: [
                        "#1F0000",
                        "#3E0000",
                        "#5D0000",
                        "#935555",
                        "#C9AAAA"
                    ]
                } ],
            labels: [
                "Main (Quezon)",
                "Market (Taguig)",
                "Cartimar (Pasay)",
                "Shopwise (Cubao)",
                "Fortunata (Q. Ave)"
            ]
        },
        options: {
            responsive: true,
            animation: {
                duration: 1000,
                easing: 'linear'
            }
        }
    } );

    //pie chart //licensing assitance
    var ctx = document.getElementById("pieChart2");
    ctx.height = 180;
    var licChart = new Chart( ctx, {
        type: 'pie',
        data: {
            datasets: [ {
                data: [ 45, 25, 20, 10 ],
                backgroundColor: [
                        "#534700",
                        "#A78E00",
                        "#FBD500",
                        "#FCE355",
                    ],
                hoverBackgroundColor: [
                        "#534700",
                        "#A78E00",
                        "#FBD500",
                        "#FCE355",
                    ]
                } ],
            labels: [
                "Student Driver's Permit", "Non-Professional", "Professional","International",
            ]
        },
        options: {
            responsive: true,
                animation: {
                    duration: 2000,
                    easing: 'linear'
                }
        }
    } );
}

function loadCharts(){
    //Monthly Enrollees Chart
    var ctx = document.getElementById("yearlyChart");
    // ctx.height = 220;
    var yearlyEnr = new Chart( ctx, {
        type: 'line',
        data: {
            labels: [ "2014", "2015", "2016", "2017", "2018" ],
            type: 'line',
            defaultFontFamily: 'Montserrat',
            datasets: [ {
                data: [ 1000, 990, 1100, 1200, 1500 ],
                label: "Main (Quezon)",
                backgroundColor: 'rgba(0, 194, 146, 0.26)',
                borderColor: '#00C292',
                borderWidth: 3.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: '#008161',
                    },{
                data: [ 1000, 930, 1200, 1000, 1200 ],
                label: "Market (Taguig)",
                backgroundColor: 'rgba(149, 32, 79, 0.253)',
                borderColor: '#95204E',
                borderWidth: 3.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: '#631534',
                    }, {
                data: [ 1100, 1150, 1300, 1250, 1700 ],
                label: "Cartimar (Pasay)",
                backgroundColor: 'rgba(125, 40, 128, 0.205)',
                borderColor: '#7D2880',
                borderWidth: 3.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: '#531A55',
                    }, {
                data: [ 800, 1000, 1200, 1400, 1600 ],
                label: "Shopwise (Cubao)",
                backgroundColor: 'rgba(0, 130, 142, 0.26)',
                borderColor: '#00828E',
                borderWidth: 3.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: '#00393E',
                    }, {
                data: [ 900, 1000, 1100, 1300, 1550 ],
                label: "Fortunata (Q. Ave)",
                backgroundColor: 'rgba(247, 210, 0, 0.144)',
                borderColor: '#F7D100',
                borderWidth: 3.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: '#A48B00',
                    }, ]
        },
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                titleFontSize: 12,
                titleFontColor: '#000',
                bodyFontColor: '#000',
                backgroundColor: '#fff',
                titleFontFamily: 'Montserrat',
                bodyFontFamily: 'Montserrat',
                cornerRadius: 3,
                intersect: false,
            },
            legend: {
                display: false,
                position: 'top',
                labels: {
                    usePointStyle: true,
                    fontFamily: 'Montserrat',
                },
            },
            scales: {
                xAxes: [ {
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Year'
                    }
                        } ],
                yAxes: [ {
                    display: true,
                    gridLines: {
                        display: true,
                        drawBorder: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'No. of Enrollees'
                    }
                        } ]
            },
            title: {
                display: false,
            }
        }
    } );

    //Yearly Enrollees Chart
    var ctx2 = document.getElementById("monthlyChart");
    // ctx2.height = 220;
    var monthlyEnr = new Chart( ctx2, {
        type: 'line',
        data: {
            labels: [ "Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
            type: 'line',
            defaultFontFamily: 'Montserrat',
            datasets: [ {
                data: [ 200, 150, 100, 90, 95, 200, 150, 100, 90, 95, 100, 90 ],
                label: "Main (Quezon)",
                backgroundColor: 'rgba(0, 194, 146, 0.26)',
                borderColor: '#00C292',
                borderWidth: 3.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: '#008161',
                    },{
                data: [ 100, 110, 80, 70, 50, 180, 160, 100, 80, 100, 120, 100 ],
                label: "Market (Taguig)",
                backgroundColor: 'rgba(149, 32, 79, 0.253)',
                borderColor: '#95204E',
                borderWidth: 3.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: '#631534',
                    }, {
                data: [ 200, 190, 180, 120, 140, 210, 180, 130, 120, 150, 170, 190 ],
                label: "Cartimar (Pasay)",
                backgroundColor: 'rgba(125, 40, 128, 0.205)',
                borderColor: '#7D2880',
                borderWidth: 3.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: '#531A55',
                    }, {
                data: [ 130, 130, 150, 60, 75, 140, 160, 120, 110, 120, 140, 150 ],
                label: "Shopwise (Cubao)",
                backgroundColor: 'rgba(0, 130, 142, 0.26)',
                borderColor: '#00828E',
                borderWidth: 3.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: '#00393E',
                    }, {
                data: [ 110, 125, 140, 100, 105, 160, 130, 140, 150, 170, 120, 150 ],
                label: "Fortunata (Q. Ave)",
                backgroundColor: 'rgba(247, 210, 0, 0.144)',
                borderColor: '#F7D100',
                borderWidth: 3.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: '#A48B00',
                    },
                ]
        },
        options: {
            responsive: true,

            tooltips: {
                mode: 'index',
                titleFontSize: 12,
                titleFontColor: '#000',
                bodyFontColor: '#000',
                backgroundColor: '#fff',
                titleFontFamily: 'Montserrat',
                bodyFontFamily: 'Montserrat',
                cornerRadius: 3,
                intersect: false,
            },
            legend: {
                display: false,
                labels: {
                    usePointStyle: true,
                    fontFamily: 'Montserrat',
                },
            },
            scales: {
                xAxes: [ {
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Month'
                    }
                        } ],
                yAxes: [ {
                    display: true,
                    gridLines: {
                        display: true,
                        drawBorder: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'No. of Enrollees'
                    }
                        } ]
            },
        }
    } );
}