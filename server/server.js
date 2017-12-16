var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser')

app.use([
  express.static(path.join(__dirname, '..')),
  session({secret: 'angular_tutorial', resave: true, saveUninitialized: true}),
  bodyParser.urlencoded({extended: true}),
  bodyParser.json()
]);

var notes_init = [
  {text: "First note"},
  {text: "Second note"},
  {text: "Third note"}
];

app.get("/notes", function(req, res) {
  if (!req.session.notes) {
    req.session.notes = notes_init;
  }
  res.send(req.session.notes);
});

app.post("/notes", function(req, res) {
    var note = req.body;
    req.session.notes.push(note);
    res.end();
});

app.listen(8080);
