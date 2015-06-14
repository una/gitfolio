var express = require('express');
var router = express.Router();
var userInfo = require('../middleware/oAuth');

router.get('/auth/github/callback', function(req, res) {
  console.log(userInfo.ghme);
  res.render('welcome', {name: toString(userInfo.ghme)});
});

module.exports = router;
