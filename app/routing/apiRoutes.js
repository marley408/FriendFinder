//* LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on possible friends.

var friends = require("../data/friends"); 


//* ROUTING

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });



  //* API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out survey... this data is then sent to the server...
  // Then the server saves the data to the friendsList array)

  app.post("/api/friends", function(req, res) { 
    //This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
    // req.body is available since we're using the body-parser middleware
    //add new friend data
    var userInput = req.body //user input object
    console.log(userInput)

    var userScores = userInput.scores

    //compute friend match
    var matchName = ""
    var matchImg = ""
    var totalDifference = 10000 

    //loop thru all friends in list
    for (var i = 0; i < friends.length; i++){
      //loop thru each friends scores and calc difference from users responses 
      var diff = 0
      for (var j = 0; j < userScores.length; j++){
        diff += Math.abs(friends[i].scores[j] - userScores[j])
      }
      if (diff < totalDifference){
        totalDifference = diff 
        matchName = friends[i].name
        matchImg = friends[i].photo 
      }
    }

    //add new friend
    friends.push(userInput)
    console.log(matchName, matchImg)


    // Send appropriate response
		res.json({status: 'OK', matchName: matchName, matchImg: matchImg});
    


  });

  
};