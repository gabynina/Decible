const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

//have these sections in the database
const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    firstname:String,
    lastname:String,
    email:String
}) ;

UserSchema.plugin(passportLocalMongoose);

//in User section of the database
module.exports = mongoose.model("User",UserSchema);