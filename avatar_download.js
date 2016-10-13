var fs = require('fs');
var request = require('request');
var dotenv = require('dotenv').config();
var repoOwner = process.argv[2];
var repoName  = process.argv[3];

debugger;

var username = "PolMacCarthaigh";
var password = "c35a063ac4fb40d8badd868bc033e75048885f5e";

function getRepoContributors(repoOwner, repoName, callback) {
  request({
    url: "https://" + username + ":" + password + "@api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
  }, function(err, request, body) {
    callback(err, JSON.parse(body));
  });
}

function downloadImageByURL(url, fileName) {
  var file = fs.createWriteStream(fileName);
  request(url).pipe(file);
};

getRepoContributors(repoOwner, repoName, function (err, contributorsList) {
  contributorsList.forEach(function(contributor) {
    downloadImageByURL(contributor.avatar_url, "./avatar_images/" + contributor.login + ".jpg")
  })
});
