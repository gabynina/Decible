// server.js
const express    = require('express')
const bodyparser = require( 'body-parser' )
const app        = express()
const port = 3000
const mongoose = require('mongoose');
const Contact = require('./models/contact')
const Playlists = require('./models/playlists')
const passport              =  require("passport"),
      bodyParser            =  require("body-parser"),
      LocalStrategy         =  require("passport-local"),
      passportLocalMongoose =  require("passport-local-mongoose"),
      User                  =  require("./models/user");

mongoose.connect("mongodb+srv://user:userpassword@cluster0.lmzh7.mongodb.net/decibel?retryWrites=true&w=majority");

app.use(require("express-session")({
  secret:"Any normal Word",//decode or encode session
      resave: false,          
      saveUninitialized:false    
  }));

passport.serializeUser(User.serializeUser());       //session encoding
passport.deserializeUser(User.deserializeUser());   //session decoding
passport.use(new LocalStrategy(User.authenticate()));
app.use(bodyParser.urlencoded(
      { extended:true }
))
app.use(passport.initialize());
app.use(passport.session());

var userData = new Map();

var userAppData = new Map();

var appdata = []

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.set("view engine", "ejs");

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

app.get("/submit",isLoggedIn ,(req,res) =>{
  res.render("submit");
})
//Auth Routes
app.get("/login",(req,res)=>{
  res.render("login");
});
app.post("/login",passport.authenticate("local",{
  successRedirect:"/submit",
  failureRedirect:"/login"
}),function (req, res){
});
app.get("/register",(req,res)=>{
  res.render("register");
});

app.post("/register",(req,res)=>{
    
  User.register(new User({username: req.body.username,phone:req.body.phone,telephone: req.body.telephone}),req.body.password,function(err,user){
      if(err){
          console.log(err);
          res.render("register");
      }
  passport.authenticate("local")(req,res,function(){
      res.redirect("/login");
  })    
  })
})
app.get("/logout",(req,res)=>{
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect("/login");
}


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

//404 page
app.use(function (req, res, next) {
  res.status(404).send("Sorry I can not find this page :( ... please go to /index to get back home :)")
})

// listen for requests :)
const listener = app.listen(process.env.PORT || port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});



