
const https = require('https');
const format = require('date-format');
const db = require('photo-loader');

const MS_IN_DAY = 86400000;
let startDate = (new Date('2000')).getTime();

const loader = {
  getPhotos : function () {
    let interval = setInterval(() => {

    }, 1000);
  },
  getPhoto : function () {

  }
};
module.exports = loader;