var Holding = require('../models/holding');

exports.addHolding = async function (req, res) {
    try {
        const { userId, symbol, security, region, quantity, pricePerUnit, fee, value } = req.body;

        if (!(userId && symbol && security && quantity && region && pricePerUnit && value)) {
            res.status(400).send("Holding must include all required information");
        }

        const holding = await Holding.create({ userId: userId, symbol: symbol, security: security, region: region, quantity: quantity, pricePerUnit: pricePerUnit, fee: fee, value: value });

        return res.status(200).send(holding);
    }
    catch (error) {
        return res.status(500).send("Internal Server Error: " + error);
    }
};

exports.removeHolding = async function (req, res) {
    await Holding.findByIdAndDelete(req.params.id).then((holding) => {
        if (!holding) {
            return res.status(404).send();
        }
        return res.status(200).send("Deleted.");
    })
    .catch((error) => {
        res.status(500).send("Internal Server Error: " + error);
    });
};

exports.updateHolding = async function (req, res) {
    await Holding.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((holding) => {
        if (!holding) {
            return res.status(404).send();
        }
        return res.status(200).send(holding);
    })
    .catch((error) => {
        res.status(500).send("Internal Server Error: " + error);
    });
}

exports.getHolding = async function (req, res) {
    const userId = req.body.userId;

    await Holding.find({}).select({ userId: userId }).then((holding) => {
        return res.status(200).send(holding);
    })
    .catch((error) => {
        res.status(500).send("Internal Server Error: " + error);
    });
}

