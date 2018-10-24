
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
      data = JSON.parse(data);
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
            console.log(data);
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
      // db.savePhotoToDB(data)
      //   .then(
      //     (saveOK) => {},
      //     (saveErr) => {console.log(saveErr.message)}
      //   );
    });
  },

  getPhoto : function () {

  }
};
module.exports = loader;