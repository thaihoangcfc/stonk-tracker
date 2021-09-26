const mongoose = require('mongoose');

const holdingSchema = new mongoose.Schema({
    symbol: { type: String, default: null },
    security: { type: String, default: null },
    region: { type: String, default: null },
    quantity: { type: Number, default: null },
    pricePerUnit: { type: Number, default: null },
    fee: { type: Number, default: null },
    value: { type: Number, default: null },
})

module.exports = mongoose.model("transaction", transactionSchema);