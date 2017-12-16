var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var ObjectID = require('mongodb').ObjectID;

var db = new Db(
  'tutor',
  new Server("localhost", 27017, {safe: true}, {auto_reconnect: true}, {})
);

db.open(function(err) {
  if (err) console.log(err);
	else console.log("Connected to localhost...");
  db.collection('notes', function(error, notes) {
	   db.notes = notes;
	});
});

app.use([
  express.static(path.join(__dirname, '..')),
  bodyParser.urlencoded({extended: true}),
  bodyParser.json()
]);

app.get("/notes", function(req,res) {
	db.notes.find(req.query).toArray(function(err, items) {
		res.send(items);
	});
});

app.post("/notes", function(req,res) {
  db.notes.insert(req.body).then(function() {
    res.end();
  });
});

app.delete("/notes", function(req,res) {
	var id = new ObjectID(req.query.id);
	db.notes.remove({_id: id}, function(err) {
		if (err) {
			console.log(err);
			res.send("Failed");
		} else {
			res.send("Success");
		}
	})
});

app.listen(8080);
