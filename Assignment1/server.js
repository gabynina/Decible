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

// connect to the database
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

//getting home page
app.get('/', function(req, res) {
  res.render('index');
})

//getting index page
app.get("/index", function(req, res) {
  res.render("index");
});

//getting about page
app.get("/about", function(req, res) {
  res.render("about");
});

//getting contact page
app.get("/contact", function(req, res) {
  res.render("contact");
});

//getting playlist page
app.get("/playlists", function(req, res) {
  res.render("playlists");
});

//getting submit a song page
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
  //adding users to database
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
  //adding contacts to database
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
  //adding songs to playlists to database
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



