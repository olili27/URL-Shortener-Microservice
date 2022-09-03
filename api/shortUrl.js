var express = require('express');
const { get } = require('mongoose');
var shortid = require('shortid');
var validUrl = require('valid-url');
const urlModel =  require('../schema/urlSchema');

const router = express.Router();

router.post('/shorturl', async function(req, res) {

    let { body: { url } } = req;
    let url1;

    if(url.endsWith('/')) {
      url1 = url.substring(0, url.length - 1);
    } else {
      url1 = url;
    }

    let shortUrl = shortid.generate();

    if(validUrl.isUri(url1)) {
      console.log(url1);
      let getUrl = await urlModel.findOne({originalUrl:url1});

      if(getUrl) {
        res.status(200).json({
          original_url: getUrl.originalUrl, 
          short_url: getUrl.shortUrl
        });
      } else {
        getUrl =  new urlModel({
          originalUrl: url1,
          shortUrl: shortUrl
        })

        await getUrl.save();

        res.status(201).json({
          original_url: getUrl.originalUrl, 
          short_url: getUrl.shortUrl
        });
    
      }

    } 
    else {
      res.status(400).json({error: "invalid url"});
      console.log(url1);
    }

    
  });
  router.get('/shorturl/:shorturl', async function(req, res) {
    let short_url = req.params.shorturl;

    let getOriginalUrl = await urlModel.findOne({shortUrl: short_url});

    if(getOriginalUrl) {

      res.status(200).redirect(getOriginalUrl.originalUrl);
    } else {
      res.status(404).json({
        error: "Not found"
      })
    }
  })

module.exports = router;