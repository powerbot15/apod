const config = require('../config/config');

const MongoClient = require('mongodb').MongoClient;

const url = config.dbUrl;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
let db = {

  db : null,

  createDB : function () {
    return new Promise( function (resolve, reject) {
      MongoClient.connect(url, function(err, db) {
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
    return new Promise (function (resolve, reject) {
        this.db.createCollection("photoObjects", function(err, res) {
          if (err) throw err;
          console.log("Collection created!");
          db.close();
        });
      });
  },

  connect : function () {
    return new Promise (function (resolve, reject) {
      MongoClient.connect(url, function(err, db) {
        if (err) {
          reject(err);
        }
        console.log("Connection established!");
        this.db = db;
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