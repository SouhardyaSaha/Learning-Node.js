let mongoose = require('mongoose');

//article schema
let articeSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

let Article = module.exports = mongoose.model('Article', articeSchema);