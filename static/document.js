var documentId = window.location.href.match(/\/document\/([0-9]+)/)[1];



window.onload = function() {
    var el_doc_box = document.getElementById('doc-box');

    function tryStatus() {
        console.log('fetch...');
        document.querySelector('.tagline').innerHTML += '.';
        fetch('/document/'+documentId+'/status').then(res => res.json()).then((res) => {
            console.log(res);
            if (res.status==1) {
                el_doc_box.appendChild( document.createTextNode( res.text ));
                el_doc_box.scrollIntoView({behavior: 'smooth'});
            } else {
                window.setTimeout( tryStatus, 1000);
            }
        });
    }


    tryStatus();
}
