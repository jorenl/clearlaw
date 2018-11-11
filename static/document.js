var documentId = window.location.href.match(/\/document\/([0-9]+)/)[1];


function createCharts() {
    var sources = [];
    var data = {
        Intrest: [],
        Duration: [],
        Total_Payment: [],
        PredScore: []
    }

    loans.forEach( (loandata) => {
        data["Intrest"].push(loandata.interest);
        data["Duration"].push(loandata.term);
        data["Total_Payment"].push(loandata.totalAmount);
        data["PredScore"].push(loandata.predScore);
        sources.push(loandata.source)
    });

    Object.keys(data).forEach((key) => {
        var div = document.createElement("div");
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sources,
                datasets: [{
                    data: data[key],
                    backgroundColor: [
                        'rgba( 34, 139,34,1)', 
                        'rgba(218,179,240,1)',
                        'rgba( 44, 11, 62,1)',
                        'rgba(139, 92,165,1)',
                        'rgba(  7,  0, 10,1)'
                    ]
                }]
            },
            options: {
                legend: {
                    display: false,
                },
                 title: {
                    display: true,
                    text: key
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            autoSkip: false
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        div.appendChild(canvas);
        document.getElementById("analysis-box").appendChild(div);
    });
}


window.onload = function() {
    var el_doc_box = document.getElementById('doc-box');

    function tryStatus() {
        console.log('fetch...');
        document.querySelector('.tagline').innerHTML += '.';
        fetch('/document/'+documentId+'/status').then(res => res.json()).then((res) => {
            console.log(res);
            if (res.status==1) {
                el_doc_box.appendChild( document.createTextNode( res.text ));
                createCharts(res.analysis);
                el_doc_box.scrollIntoView({behavior: 'smooth'});
                
            } else {
                window.setTimeout( tryStatus, 1000);
            }
        });
    }

    tryStatus();
}
