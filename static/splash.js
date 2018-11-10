

window.onload = function() {
    var el_file_input = document.getElementById('file-input');
    var el_file_preview = document.getElementById('file-preview');

    var el_page = document.getElementById('page');

    var btn_get_started = document.getElementById('btn-get-started');
    
    var box_submit = document.getElementById('submit-box');


    btn_get_started.addEventListener('click', (event) => {
        box_submit.scrollIntoView({behavior: 'smooth'});
    })
    el_file_input.addEventListener('change', (event) => {
        el_file_preview.src = URL.createObjectURL(el_file_input.files[0]);
        el_page.classList.remove('empty');
        el_page.classList.add('submitted');
    });
};