var fs = require('fs');
var http = require('http')
  , url = require('url')
  , qs = require('querystring')
  , github = require('octonode')
  , ghme;

module.exports = function(req, res) {
  var clientID, clientSecret;

  if (process.env.NODE_ENV === 'production') {
    clientID = process.env.GH_CLIENT_ID;
    clientSecret = process.env.GH_CLIENT_SECRET;
  } else {
      clientID = fs.readFileSync('./client_id.txt', 'utf8');
      clientSecret = fs.readFileSync('./client_secret.txt', 'utf8');
  }

  // Build the authorization config and url
  uri = url.parse(req.url);
  var auth_url = github.auth.config({
    id: clientID,
    secret: clientSecret
  }).login(['user', 'repo', 'gist']);

  // Store info to verify against CSRF
  var state = auth_url.match(/&state=([0-9a-z]{32})/i);

  // Redirect to github login
    if (uri.pathname=='/login') {
      var client = github.client();
      res.writeHead(302, {'Content-Type': 'text/plain', 'Location': auth_url})
      res.end('Redirecting to ' + auth_url);
    }
    // Callback url from github login
    else if (uri.pathname=='/auth/github/callback') {
      var values = qs.parse(uri.query);

      // Check against CSRF attacks
      if (!state || state[1] != values.state) {
        res.writeHead(403, {'Content-Type': 'text/plain'});
        res.end('');
      } else {
        github.auth.login(values.code, function (err, token) {
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end(token);
        });
      }
    } else {
      res.writeHead(200, {'Content-Type': 'text/plain'})
      res.end('');
    }

    ghme = client.me();
    ghme.info(function(err, data, headers) {
      console.log("error: " + err);
      console.log("data: " + data);
      console.log("headers:" + headers);
    });
};
