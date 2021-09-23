const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    symbol: { type: String, default: null },
    region: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
})

module.exports = mongoose.model("user", userSchema);