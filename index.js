let mongo = require('mongodb').MongoClient;
let data = require('./data.js');

mongo.connect('mongodb://localhost:27017/test', function(err, db) {
  let robots = db.collection('robots');

  for (let i = 0; i < data.users.length; i++) {
    if (data.users[i].company === null) {
      (data.users[i].company = "Available for Hire");
    }
    robots.insert(data.users[i]);
  }
  db.close();
});