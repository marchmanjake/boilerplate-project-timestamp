// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:data?", function (req, res){
  var returnValue = {};
  
  //deal with empty parameter
  if (req.params.data === undefined){
    var currentDate = new Date(Date.now());
    returnValue['unix'] = Date.now();
    returnValue['utc'] = currentDate.toUTCString();
  }

  //check if can be parsed as string
  else if (!isNaN(Date.parse(req.params.data))){
    //try to create date
    try{
      let utcDate = new Date(Date.parse(req.params.data));
      let unixDate = utcDate.getTime();
      returnValue = {unix: unixDate ,utc: utcDate.toUTCString()};
    }
    catch(error){
      returnValue['error'] ="Invalid Date"
    }

  }

  //check if can be parsed as integer
  else if (!isNaN(parseInt(req.params.data))){  
    try{
      let currentDate = new Date(parseInt(req.params.data));
      let unixDate = currentDate.getTime();
      returnValue = {unix: unixDate ,utc: currentDate.toUTCString()}

    }
    catch(error){
      returnValue['error'] ="Invalid Date"
    }
  } 


  //else update return value to fail
    else {
        returnValue['error'] ="Invalid Date"
  }

  //send response once validation occurs. 
  res.json(returnValue);
  
}
);




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
