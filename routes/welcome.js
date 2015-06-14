var express = require('express');
var router = express.Router();
var userInfo = require('../middleware/oAuth');

router.get('/auth/github/callback', function(req, res) {
  //userInfo.ghme.info(callback); //json
  res.render('welcome');
});

module.exports = router;
