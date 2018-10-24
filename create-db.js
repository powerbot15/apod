const db = require('./controllers/db');

db.createDB()
  .then(
    function (ok) {
      return db.connect();
    },
    function (err) {
      console.log('Create error');
    }
  )
  .then(
    function (ok) {
      return db.createApodColection();
    },
    function (err) {
      console.log('Connect error');
    }
  )
  .then(
    function (ok) {
      return db.disconnect();
    },
    function (err) {
      console.log('Create collection error');
      console.log(err.message);
    }
  )
  .then(
    function (ok) {},
    function (err) {
      console.log('Close db error');
      console.log(err.message);
    }
  );