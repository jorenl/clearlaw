var path = require('path');

var express = require('express');
var multer = require('multer');
// var bodyparser = require('body-parser');

var app = express();
var upload = multer({ dest: 'uploads/' })

//config

var port = process.env.port || 80;
var application_root = './'

// define static directory
app.use('/static', express.static('static'));

// app.use(bodyparser.json());

app.get('/', (req, res) => {
    res.sendFile('index.htm', {root: './'})
});

app.post('/upload', 
    upload.single('documentImage'),
    (req, res) => {
        console.log('received file'+req.file);
        res.sendStatus(200);
    }
);

app.listen(port, () => {
    console.log('Express app listening on port '+port);
});