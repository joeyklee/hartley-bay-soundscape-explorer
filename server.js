var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var _ = require('underscore');
var path = require("path");

var mongojs = require('mongojs');

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.  
var MONGOCONNECTION = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost:27017/hbsounds';
var db = mongojs(MONGOCONNECTION);


function mongoError(res, err) {
    if (err) console.error('mongo error ->', err);
    return res.status(500).send('internal server error')
};

function findAll(collection, query, res) {
  collection.find(
    query, function(err, docs) {
      if (err) { return mongoError(res, err); };
      // if nothing is found (doc === null) return empty array
      res.send(docs === null ? [] : docs);
    }
  );
};

var hbsounds = db.collection('hbsounds');
// grid data
app.get('/api/hbsounds', function(req, res) {
    // TODO console.log(req.query.sensor_id)
    findAll(hbsounds, {}, res);
});


app.use('/', express.static('views'));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
// app.use('/public', express.static('public'));

app.get('/', function (req, res) {
  // res.send('Hello World!');
  res.render('static/index');
});

app.get('/map', function (req, res) {
  // res.send('Hello World!');
  res.render('static/map');
});

// app.get('/static/page1', function (req, res) {
//   // res.send('Hello World!');
//   res.render('index');
// });

// app.get('/static/page2', function (req, res) {
//   // res.send('Hello World!');
//   res.render('index');
// });



app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
