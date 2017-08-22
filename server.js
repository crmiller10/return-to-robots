const express = require('express');
const mustache = require('mustache-express');
const mongo = require('mongodb').MongoClient;
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.urlencoded({
  extended: false
}));

app.use(express.static('public'));
app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');

// connect
// select collection
mongo.connect('mongodb://localhost:27017/test', function(err, db) {
   const items = db.collection('robots');

    // List all of the users(robots) from data.js
    app.get('/', function (req, res) {
        // Get data from mongo
        // list info using mustache
        items.find().toArray().then(function (items) {
            res.render('index', {
                users: items, // we can now use 'users' in our mustache template
            });
        });
    });

  app.listen(3000, function() {
    console.log('Successfully started express on port 3000!');
  });
});