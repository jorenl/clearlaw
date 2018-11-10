

window.onload = function() {
    var el_file_input = document.getElementById('file-input');
    var el_file_preview = document.getElementById('file-preview');

    var el_page = document.getElementById('page');

    var btn_get_started = document.getElementById('btn-get-started');
    
    var el_btn_upload = document.getElementById('btn-upload');
    var el_upload_form = document.getElementById('upload-form');
    
    var el_box_splash = document.getElementById('splash-box');
    var el_box_submit = document.getElementById('submit-box');

    btn_get_started.addEventListener('click', (event) => {
        el_box_submit.scrollIntoView({behavior: 'smooth'});
    });
    el_file_input.addEventListener('change', (event) => {
        el_file_preview.src = URL.createObjectURL(el_file_input.files[0]);
        el_page.classList.remove('empty');
        el_page.classList.add('submitted');
    });

    el_upload_form.addEventListener('submit', (event) => {
        event.preventDefault();

        var data = new FormData(el_upload_form);
        var request = new XMLHttpRequest();
        request.responseType = 'json';
        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200) {
                console.log(request.response);
                window.location = '/document/'+request.response.documentId;
            }
        };
        
        request.open(el_upload_form.method, el_upload_form.action);
        request.send(data);
    });
};