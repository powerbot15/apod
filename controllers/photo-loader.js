
const https = require('https');
const format = require('date-format');
const db = require('../controllers/db');
const config = require('../config/config');

const MS_IN_DAY = 86400000;
// let startDate = (new Date('2000')).getTime();

const loader = {

  startDate : (new Date('2000')).getTime(),

  getPhotos : function () {
      const url = config.nasaUrl + '&date=' + format.asString('yyyy-MM-dd', new Date(this.startDate));
      https.get(url, (res) => {
        this.savePhoto(res);
        this.startDate += MS_IN_DAY;
        if (this.startDate > Date.now) {
          return;
        }
        this.getPhotos();
      })
        .on('error', (e) => {
          console.error(e);
        });
  },

  savePhoto : function (res) {
    let data = '';
    // A chunk of data has been recieved.
    res.on('data', (chunk) => {
      data += chunk;
    });
    // The whole response has been received. Print out the result.
    res.on('end', () => {
      db.savePhotoToDB(data);
    });
  },

  getPhoto : function () {

  }
};
module.exports = loader;