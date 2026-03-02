const mongoose = require("mongoose");

//model
const messageSchema = mongoose.Schema({
    ticketId: { type: String, required: true },
    sender: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Message', messageSchema);