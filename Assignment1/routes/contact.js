let express = require('express');
let router = express.Router();
let Contact = require('../models/contact');

router.post("/contact", function (req, res) {
    
    Contact.create(req.body.contact, function (err, contact) {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/contact');
        }
    })
    
})

module.exports = router;