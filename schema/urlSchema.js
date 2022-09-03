const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    originalUrl: String,
    shortUrl: String
});

module.exports = mongoose.model('Url', urlSchema);