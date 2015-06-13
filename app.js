'use strict';

var express = require('express');
var app = express();
var request = require('request');

app.use(express.static(__dirname + '/', { extensions: ['html'] }));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.send('index.html');
});

// sending every url that doesn't exist
app.get('*', function(req, res){
  res.status(404).send('oops. page not found');
});


app.listen(process.env.PORT || 3000, function(){
  console.log('Express server listening on port %d in %s mode', this.address().port, app.settings.env);
});
