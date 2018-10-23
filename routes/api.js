const express = require('express');
const router = express.Router();
const https = require('https');
const config = require('../config/config');


/* GET home page. */
router.get('/photo', function(req, res, next) {
  let nasaURL = config.nasaUrl;
  if (req.query.date) {
    nasaURL += `&date=${req.query.date}`;
  }
  getDayPhoto(nasaURL, res);
});

module.exports = router;

function getDayPhoto (url, response) {
  https.get(url, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      response.send(JSON.parse(data));
    });

  }).on("error", (err) => {
    response.error(err);
  });
}