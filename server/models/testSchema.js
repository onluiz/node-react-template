let mongoose = require('mongoose');

let testSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Test', testSchema);