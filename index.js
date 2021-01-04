require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const shortUrl = require('./routes/shorturl');

const databaseUri = process.env.DB_URI.replace(
    '<password>',
    process.env.DB_PASSWORD
).replace(
    '<dbname>',
    process.env.DEFAULT_DB  
);

mongoose.connect(databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to database.'));

app.use(express.urlencoded({ extended: false }));
app.use('/api/shorturl', shortUrl);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening at port ${port}.`);
});