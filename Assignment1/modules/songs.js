const mongoose = require('mongoose');
const Schema = mongoose.Schema

const songsSchema = new Schema({
    artist: {
        type: String,
        required: [true, "Artist is required"]
    }, 
    songtitle: {
        type: String,
        required: [true, "Song Title is required"]
    }
})

const songsModel = mongoose.model("songs", songsSchema)
module.exports = songsModel