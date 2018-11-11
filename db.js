// models
var documents = [];


class Document {
    constructor() {
        this.id = documents.length;
        this.status = 0; //0: not ready, 1: ready
        this.imageFiles = [];
        this.textData = [];
        this.analysis = {};

        documents.push(this);
    }
}


module.exports = {
    documents: documents,
    Document: Document
}