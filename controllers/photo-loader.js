
const https = require('https');
const format = require('date-format');
const db = require('../controllers/db');
const config = require('../config/config');

const MS_IN_DAY = 86400000;

const loader = {

  startDate : (new Date('2003-06-11')).getTime(),

  getPhotos : function () {
      const loadInterval = setInterval(() => {
        const url = config.nasaUrl + '&date=' + format.asString('yyyy-MM-dd', new Date(this.startDate));
        https.get(url, (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            data = JSON.parse(data);
            if (data.hasOwnProperty('error')) {
              clearInterval(loadInterval);
              return;
            }
            this.savePhoto(data);
          });
          this.startDate += MS_IN_DAY;
          if (this.startDate > Date.now) {
            clearInterval(loadInterval);
          }
        })
          .on('error', (e) => {
            console.error(e);
          });
      }, 4000);

  },

  savePhoto : function (data) {
    db.connect()
      .then(
        (connectOK) => {
          return db.savePhotoToDB(data)
        },
        (connectErr) => {
          console.log('Connection error');
          console.log(connectErr.message);
        }
      )
      .then(
        (saveOK) => {
          db.disconnect();
        },
        (saveErr) => {
          console.log('Connection error');
          console.log(saveErr.message);
        }
      )
      .then(
        (disconnectOK) => {
          console.log('Saved');
          console.log(data);
        },
        (disconnectErr) => {
          console.log('Disconnect error');
          console.log(disconnectErr.message);
        }
      );
  },

  getPhoto : function () {

  }
};
module.exports = loader;