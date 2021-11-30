// server.js
const express    = require('express')
const bodyparser = require( 'body-parser' )
const app        = express()
const port = 3000
const playlistsRoutes = require('./routes/playlists');
const contactRoutes = require('./routes/contact');
const mongoose = require('mongoose');
const Contact = require('./models/contact')
const Playlists = require('./models/playlists')

var userData = new Map();

var userAppData = new Map();

var appdata = []

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://user:userpassword@cluster0.lmzh7.mongodb.net/decibel?retryWrites=true&w=majority")

//app.use("/playlists", playlistsRoutes);
//app.use("/contact", contactRoutes);

//getting contact page
app.get('/', function(req, res) {
  res.render('index');
})

app.get("/index", function(req, res) {
  res.render("index");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/contact", function(req, res) {
  res.render("contact");
});

app.get("/playlists", function(req, res) {
  res.render("playlists");
});

app.get("/submit", function(req, res) {
  res.render("submit")
});

app.post( '/contact/contact', function( req, res ) {
  //console.log(`contact/contact post request:`);
  //let dataString = ''

  // req.on( 'data', function( data ) {
  //     dataString += data 
  // })

  // req.on( 'end', function() {
  //   const json = JSON.parse( dataString )
  //   appdata.push(json)
  //   console.log(appdata)
  //   // response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
  //   res.setHeader('content-type', 'text/plain');
  //   res.end(JSON.stringify(appdata))
  // })

  Contact.create(req.body.contact, function (err, contact) {
    console.log(req.body.contact)
    if (err) {
      console.error(err);
  } else {
      res.redirect('/contact');
  }
  })

})

app.post( '/submit/submit', bodyparser.json(), function( req, res ) {
  
  Playlists.create(req.body.playlists, function (err, playlists) {
    console.log(req.body.playlists)
    if (err) {
        console.error(err);
    } else {
        res.redirect('/submit');
    }
  })

})



// listen for requests :)
const listener = app.listen(process.env.PORT || port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
