var path = require('path');

var express = require('express');
var multer = require('multer');

var tesseract = require('node-tesseract');

// var bodyparser = require('body-parser');

var app = express();
var upload = multer({ dest: 'uploads/' });


var db = require('./db');

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
        if (req.file) {
            var filename = req.file.destination + req.file.filename;
            console.log('received file '+filename);

            var doc = new db.Document();
            doc.imageFiles.push(filename);

            res.send({
                documentId: doc.id
            });

            tesseract.process(filename, {}, (error, text) => {
                if (error) {
                    console.log('ERROR', error);
                    doc.status = 2;
                } else {
                    doc.textData.push(text);
                    doc.status = 1;
                }
            });
        } else {
            res.sendStatus(404);
        }
    }
);

app.get('/document/:documentid', (req, res) => {
    res.sendFile('document.htm', {root: './'})
});
app.get('/document/:documentId/status', (req, res) => {
    var doc = db.documents[req.params.documentId];
    if (doc) {
        text = null;
        if (doc.status==1) {
            text = doc.textData[0];
        }
        res.send({
            status: doc.status,
            text: text
        });
    } else {
        res.sendStatus(404);
    }
});

app.listen(port, () => {
    console.log('Express app listening on port '+port);
});