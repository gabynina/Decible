let express = require('express');
let router = express.Router();
let Playlists = require('../models/submit');

router.post("/submit", function (req, res) {
    
    Playlists.create(req.body.submit, function (err, submit) {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/submit');
        }
    })
    
})

module.exports = router;