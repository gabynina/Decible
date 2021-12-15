const mongoose = require('mongoose');

//have these sections in the database
const contactSchema = mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
})

//in Contact section of the database
module.exports = mongoose.model("Contact", contactSchema);