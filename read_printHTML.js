var http = require("http");

var requestOptions = {
  host: "example.com",
  path: "/"
};

http.get(requestOptions, (response) => {    // HTTP Response Callback

  response.setEncoding("utf8");             // Use UTF-8 encoding

  response.on("data", print);

  response.on("end", function(data) {                // On Data Completed
    console.log("Response stream complete.");
  });

});

function print(data) {           // On Data Received
  console.log("in print "+data);
}


function printExampleHTML(callback) {
   callback(print);
}

