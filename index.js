const express = require('express');
const app = express();
const mongoose = require('mongoose');
const shortUrl = require('./routes/shorturl');

mongoose.connect('mongodb://localhost/url-shortener');

app.use(express.urlencoded({ extended: false }));
app.use('/api/shorturl', shortUrl);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening at port ${port}.`);
});