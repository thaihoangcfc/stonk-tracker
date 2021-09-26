const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    symbol: { type: String, default: null },
    method: { type: String, default: null },
    security: { type: String, default: null },
    region: { type: String, default: null },
    date: { type: Date, default: null },
    quantity: { type: Number, default: null },
    pricePerUnit: { type: Number, default: null },
    fee: { type: Number, default: null },
})

module.exports = mongoose.model("transaction", transactionSchema);