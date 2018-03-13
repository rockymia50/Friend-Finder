const path = require('path');
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// Application Port
const PORT = process.env.PORT || 3000;


// Static file rendering

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));


require('./app/routing/apiRoutes.js')(app); 
require('./app/routing/htmlRoutes.js')(app);

// Start Server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
    console.log('  Press CTRL-C to stop\n');
  });