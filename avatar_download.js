var fs = require('fs');
var request = require('request');
var dotenv = require('dotenv').config();
var repoOwner = process.argv[2];
var repoName  = process.argv[3];

var git_username = process.env.git_username
var git_password = process.env.git_password

function getRepoContributors(repoOwner, repoName, callback) {
  request({
    url: "https://" + git_username + ":" + git_password + "@api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
  },

  function(err, request, body) {
    if (err) {

    } else {
      var json_body = JSON.parse(body);
      if (json_body.message){

      } else {
        callback(err, json_body);
      }
    }
  });
}

function downloadImageByURL(url, fileName) {
  var file = fs.createWriteStream(fileName);
  request(url).pipe(file);
};

if (process.argv.length < 4) {

} else {
  getRepoContributors(repoOwner, repoName, function (err, contributorsList) {
    // console.log("inside anon callback, contributorsList=", contributorsList);
    contributorsList.forEach(function(contributor) {
      downloadImageByURL(contributor.avatar_url, "./avatar_images/" + contributor.login + ".jpg")
    })
  });
}