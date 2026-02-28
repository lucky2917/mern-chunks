const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    authorName: String,
    title: String,
    upvotes: { type: Number, default: 0 }
})

module.exports = mongoose.model("leaderboard", postSchema);