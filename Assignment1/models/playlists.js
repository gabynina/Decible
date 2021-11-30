const mongoose = require('mongoose');

const playlistsSchema = mongoose.Schema({
    artist: String,
    title: String
})

module.exports = mongoose.model("Playlists", playlistsSchema);