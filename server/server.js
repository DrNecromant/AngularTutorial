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
var root = path.join(__dirname, '..');

app.use([
  session({
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
  }),
  express.static(root),
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
  db.collection('users', function(error, users) {
			db.users = users;
	});
});

// =============
// Authorization
// =============

app.post("/login", function(req,res) {
  db.users.find({ name: req.body.userName, password: req.body.password })
    .toArray(function(err, items) {
      if (items.length > 0) { req.session.userName = req.body.userName }
      res.send(items.length > 0);
    });
});

app.get("/logout", function(req, res) {
  req.session.userName = null;
  res.end();
});

// =====
// Notes
// =====

app.get("/notes", function(req, res) {
  req.query.userName = req.session.userName || "demo";
	db.notes.find(req.query).toArray(function(err, items) {
		res.send(items);
	});
});

app.post("/notes", function(req, res) {
  req.body.userName = req.session.userName || "demo";
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
  var userName = req.session.userName || "demo";
	db.users.find({ name: userName })
    .toArray(function(err, items) {
		    var user = items[0];
    		res.send(user.sections || []);
	   });
});

app.post("/sections", function(req, res) {
	if (req.body.length == 0) { res.end() }
  var userName = req.session.userName || "demo";
	db.users.update({ name: userName }, { $push: { sections: req.body }}, function() {
		res.end();
	});
});

// =====
// Users
// =====

app.post("/users", function(req, res) {
  db.users.insert(req.body, function() {
    req.session.userName = req.body.name;
    res.end();
  });
});

app.get("/user", function(req, res) {
  res.send({ userName: req.session.userName })
});

// ==========
// Validation
// ==========

app.get("/checkUserUnique", function(req, res) {
	res.send(req.query.user.length > 2);
});

// ==========
// All others
// ==========

app.get("*", function(req, res, next) {
  res.sendFile('index.html', { root : root });
});

// =========
// Start app
// =========

app.listen(8080);
