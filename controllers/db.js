const config = require('../config/config');

const MongoClient = require('mongodb').MongoClient;

const url = config.dbServerUrl;

let db = {

  db : null,

  dbo: null,

  createDB : function (dbName) {
    return new Promise( function (resolve, reject) {
      MongoClient.connect(config.dbServerUrl + (dbName || config.dbName), { useNewUrlParser: true }, function(err, db) {
        if (err) {
          reject(err);
        }
        console.log("Database created!");
        db.close();
        resolve();
      });
    });
  },

  createApodColection : function () {
    return new Promise ((resolve, reject) => {
        this.dbo.createCollection("photoObjects", function (err, res) {
          if (err) {
            reject(err);
          }
          console.log("Collection created!");
          resolve(res);
        });
      });
  },

  connect : function (dbName) {
    return new Promise ((resolve, reject) => {
      MongoClient.connect(config.dbServerUrl, { useNewUrlParser: true }, (err, db) => {
        if (err) {
          reject(err);
        }
        console.log("Connection established!");
        this.db = db;
        this.dbo = this.db.db(dbName || config.dbName);
        resolve();
      });
    });
  },

  savePhotoToDB : function (data) {
    console.log(data);
  },

  disconnect : function () {
    this.db.close();
  },

  getPhotoFromDB : function () {

  }

};
module.exports = db;