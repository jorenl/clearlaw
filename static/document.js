var documentId = window.location.href.match(/\/document\/([0-9]+)/)[1];

function tryStatus() {
    console.log('fetch...');
    fetch('/document/'+documentId+'/status', (res) => {
        console.log(res);
    });
}

window.onload = function() {
    setInterval(()=>{ tryStatus();}, 1000);
}
