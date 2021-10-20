// server.js
// need to change most of this data

const express    = require('express'),
      bodyparser = require( 'body-parser' ),
      app        = express(),
      port = 3000
      //mime = require( 'mime' )


var userData = new Map();

var userAppData = new Map();

var appdata

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// get json when appropriate
app.use( express.json() )

// use express.urlencoded to get data sent by defaut form actions
// or GET requests
app.use( express.urlencoded({ extended:true }) )

// serve up static files in the directory public
app.use( express.static('public') )

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/contact.html");
});

app.get("/contact", (request, response) => {
  response.sendFile(__dirname + "/contact.html");
});

//editted below already
app.post( '/submit-message', bodyparser.json(), function( request, response ) {
  console.log(`submit-message post request: ${request}`);
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    const json = JSON.parse( dataString )
    appdata.push(json)
    console.log(appdata)
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appdata))
  })
})


// listen for requests :)
const listener = app.listen(process.env.PORT || port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});