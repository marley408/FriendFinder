//* DEPENDENCIES
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


//* EXPRESS CONFIGURATION
// Tells node that we are creating an "express" server. 
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Serve static assets such as js, css, imgs, etc...
app.use(express.static(path.join(__dirname, 'app/logic')));

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//* ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.

require("./app/routing/apiRoutes")(app); 
require("./app/routing/htmlRoutes")(app);

// If no matching route is found default to home. "wildcards". put in server file instead of hidden here. 
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/home.html"));
});

//* LISTENER
// The below code effectively "starts" our server

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

