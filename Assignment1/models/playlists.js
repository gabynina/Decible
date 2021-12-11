const mongoose = require('mongoose');

const playlistsSchema = mongoose.Schema({
    //in the database there will be artist and title 
    artist: String,
    title: String
})

//it will be under "Playlists" folder
module.exports = mongoose.model("Playlists", playlistsSchema);