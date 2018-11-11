function analyze_document(document) {

    var stats = {
        "interest": 15,
        "term": 5,
        "totalAmount": 30,
        "predScore": 8
    }

    document.analysis = stats;
}

module.exports = {
    analyze_document: analyze_document
}