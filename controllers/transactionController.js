var Transaction = require('../models/transaction');

exports.addTransaction = async function (req, res) {
    try {
        const { symbol, method, security, region, date, quantity, pricePerUnit, fee } = req.body;

        if (!(symbol && method && security && date && quantity && region && previousClose && exchange)) {
            res.status(400).send("Stock must include all required information");
        }

        const transaction = await Transaction.create({ symbol: symbol, method: method, security: security, region: region, date: date, quantity: quantity, pricePerUnit: pricePerUnit, fee: fee });

        return res.status(200).send(transaction);
    }
    catch(error) {
        res.status(500).send("Internal Server Error: " + error);
    }
};