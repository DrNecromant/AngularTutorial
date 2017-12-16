var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '..')));  // define static dir

app.get("/notes", function(req,res) {
   var notes = [
       {text: "First note"},
       {text: "Second note"},
       {text: "Third note"}
   ]
   res.send(notes);
});

app.listen(8080);
