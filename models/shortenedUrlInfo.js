const mongoose = require('mongoose');

const shortenedUrlInfoSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: Number 
});

const ShortenedUrlInfo = mongoose.model('Url', shortenedUrlInfoSchema);

module.exports = ShortenedUrlInfo;