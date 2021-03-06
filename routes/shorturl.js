const express = require('express');
const router = express.Router();
const dns = require('dns');
const url = require('url');
const validUrl = require('valid-url');

const ShortenedUrlInfo = require('../models/shortenedUrlInfo');

router.get('/:shortened', async (req, res) => {
    const shortenedUrl = await ShortenedUrlInfo.findOne({ shortUrl: req.params.shortened });

    if (!shortenedUrl) res.send({ error: 'No shortened URL found.' })

    res.redirect(shortenedUrl.originalUrl);
});

router.post('/new', async (req, res) => {
    const reqUrl = req.body.url;
    if (validUrl.isUri(reqUrl)) {
        const urlProperties = url.parse(reqUrl);
        dns.lookup(urlProperties.hostname, async (err, addr) => {
            if (err) return res.send({ error: 'Invalid hostname.' });
            // Check if URL is already saved.
            const savedDoc = await ShortenedUrlInfo.findOne({ originalUrl: reqUrl });
            if (!savedDoc) {
                const savedUrlCount = await ShortenedUrlInfo.find().count();
                // Create redirect route
                router.get('/' + savedUrlCount, (req, res) => {
                    res.redirect(reqUrl);
                });
                // Save URL
                const urlDoc = new ShortenedUrlInfo({
                    originalUrl: reqUrl,
                    shortUrl: savedUrlCount
                });
                const result = await urlDoc.save();
                res.send({
                    original_url: reqUrl,
                    short_url: result.shortUrl
                });
            } else {
                res.send({
                    original_url: savedDoc.originalUrl,
                    short_url: savedDoc.shortUrl
                });
            }
        });
    } else {
        res.send({ error: 'Invalid URL.' });
    }
});

module.exports = router;