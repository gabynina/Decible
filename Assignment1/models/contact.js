const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    //in the database, there will be name, email, subject, and message
    name: String,
    email: String,
    subject: String,
    message: String
})

//it will be under "Contact" folder
module.exports = mongoose.model("Contact", contactSchema);