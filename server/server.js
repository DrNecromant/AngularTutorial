var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var ObjectID = require('mongodb').ObjectID;

// =================
// App and midleware
// =================

var app = express();

app.use([
  express.static(path.join(__dirname, '..')),
  bodyParser.urlencoded({extended: true}),
  bodyParser.json()
]);

// ========
// Database
// ========

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
  db.collection('sections', function(error, sections) {
		db.sections = sections;
	});
});

// =====
// Notes
// =====

app.get("/notes", function(req, res) {
	db.notes.find(req.query).toArray(function(err, items) {
		res.send(items);
	});
});

app.post("/notes", function(req, res) {
  db.notes.insert(req.body).then(function() {
    res.end();
  });
});

app.delete("/notes", function(req, res) {
	var id = new ObjectID(req.query.id);
	db.notes.remove({_id: id}, function(err) {
		if (err) console.log(err);
		else res.end();
	});
});

// ========
// Sections
// ========

app.get("/sections", function(req, res) {
	db.sections.find(req.query).toArray(function(err, items) {
		res.send(items);
	});
});

app.post("/sections", function(req, res) {
	if (req.body.length == 0) {
    res.end();
  }
	db.sections.insert(req.body).then(function() {
    res.end();
  });
});

app.listen(8080);
