const mongoose = require('mongoose');

//have these sections in the database
const playlistsSchema = mongoose.Schema({
    artist: String,
    title: String
})

//in Playlists section of the database
module.exports = mongoose.model("Playlists", playlistsSchema);