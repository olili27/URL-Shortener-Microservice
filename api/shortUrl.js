var express = require('express');
var shortid = require('shortid');
var validUrl = require('valid-url');

const router = express.Router();

router.post('/shorturl', function(req, res) {

    let { body: { url } } = req;

    if(validUrl.isUri(url)) {
        res.status(400).json({error: "invalid url"});
    }

    let shortUrl = shortid.generate();
    // console.log(req.body.url);
    res.json({ original_url: req.body.url, short_url: shortUrl });
  });

module.exports = router;