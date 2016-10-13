var request = require("request");

request("http://www.example.com", function(err, response, body) {
  if (err) {
    throw err;
  }

  console.log("HTML requested:", body);

});