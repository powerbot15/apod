
const https = require('https');
const format = require('date-format');
const db = require('../controllers/db');
const fs = require('fs');
const config = require('../config/config');

const MS_IN_DAY = 86400000;

const loader = {

  startDate : getStartDate(),
  // startDate : (new Date('2018-10-30')).getTime(),

  getPhotos : function () {
      const loadInterval = setInterval(() => {
        if (this.startDate > Date.now()) {
          console.log('Future reached!!!');
          clearInterval(loadInterval);
          saveStartDate(format.asString('yyyy-MM-dd', new Date(this.startDate)));
          return;
        }
        const url = config.nasaUrl + '&date=' + format.asString('yyyy-MM-dd', new Date(this.startDate));
        https.get(url, (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            data = JSON.parse(data);
            if (data.hasOwnProperty('error') || data.code && Number(data.code) === 400) {
              clearInterval(loadInterval);
              return;
            }
            this.savePhoto(data);
          });
          this.startDate += MS_IN_DAY;

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

function getStartDate () {
  const dateBuf = fs.readFileSync('./config/start_date.config');
  return (new Date(dateBuf.toString())).getTime()
}

function saveStartDate (dateStr) {
  fs.writeFileSync('./config/start_date.config', dateStr);
}

module.exports = loader;