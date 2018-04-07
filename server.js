const path = require('path');
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// Application Port
const PORT = process.env.PORT || 3000;


// Static file rendering

app.use(bodyParser.json());

// helper to read complex files
app.use(bodyParser.urlencoded({extended: true}));

//  change the text
app.use(bodyParser.text());

// parse application/json
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// ROUTER 
// Points to the routes to be used 

require('./app/routing/apiRoutes.js')(app); 
require('./app/routing/htmlRoutes.js')(app);

// LISTENER
// to start the server

// Start Server
app.listen(PORT, function() {
  console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  console.log('  Press CTRL-C to stop\n');
  });


