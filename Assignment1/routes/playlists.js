let express = require('express');
let router = express.Router();
let Playlists = require('../models/playlists');

router.post("/playlists", function (req, res) {
    
    Playlists.create(req.body.playlists, function (err, playlists) {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/playlists');
        }
    })
    
})

module.exports = router;