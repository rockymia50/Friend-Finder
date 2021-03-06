
//    * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//    * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 

// A GET Route to `/api/friends` which should display the survey page.
var friends = require('../data/friends.js');
var path = require('path');


var totalDifference = 0;

module.exports = function (app) {
        app.get('/api/friends', function (req, res) {
            console.log('returning friend data');
            res.json(friends);
        });

        app.post('/api/friends', function (req, res) {
            console.log('data: ', req.body)
            console.log('friends:', friends)
            var greatMatch = {
                name: "",
                image: "",
                matchDifference: 1000
            };
            var usrData = req.body;
            var usrName = usrData.name;
            var usrImage = usrData.image;
            var usrScores = usrData.scores;

            var totalDifference = 0;

            //loop through the friends data array of objects to get each friends scores
            for (var i = 0; i < friends.length; i++) {
                console.log(friends[i].name);
                totalDifference = 0;

                //loop through that friends score and the users score and calculate the 
                // absolute difference between the two and push that to the total difference variable set above
                for (var j = 0; j <  usrScores[i].length; j++) {
                    // We calculate the difference between the scores and sum them into the totalDifference
                    totalDifference += Math.abs(parseInt(usrScores[j]) - parseInt(friends[i].scores[j]));
                    // If the sum of differences is less then the differences of the current "best match"
                    if (totalDifference <= greatMatch.friendDifference) {

                        // Reset the bestMatch to be the new friend. 
                        greatMatch.name = friends[i].name;
                        greatMatch.photo = friends[i].photo;
                        greatMatch.matchDifference = totalDifference;
                    }
                }
            }

            friends.push(usrData);
            res.json(greatMatch);
        });
}