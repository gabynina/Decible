const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    //the database will have username, password, firstname, lastname, and email
    username:String,
    password:String,
    firstname:String,
    lastname:String,
    email:String
}) ;


UserSchema.plugin(passportLocalMongoose);

//it will be under "Users" folder
module.exports = mongoose.model("User",UserSchema);