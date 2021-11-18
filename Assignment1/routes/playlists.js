let express = require('express');
let router = express.Router();
let Playlists = require('../models/playlists');

//router.get("/song", function (req, res) {
    //res.render('song')
//})

router.post("/playlists", function (req, res) {

    console.log(req.body);
    console.log(req.body.playlists);
    
    Playlists.create(req.body.playlists, function (err, playlists) {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/playlists');
        }
    })
    
})

module.exports = router;