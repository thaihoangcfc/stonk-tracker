var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

require('dotenv').config();

exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("All user information are required");
        }

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ user_id: user._id, email },
                process.env.TOKEN_KEY, { expiresIn: "2h" });

            user.token = token;

            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    }
    catch (error) {
        res.status(500).send("Internal Server Error: " + error);
    }

};

exports.register = async function (req, res) {
    try {
        const { first_name, last_name, email, password } = req.body;

        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All user information are required");
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).send("User already exists. Please login");
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword
        })

        const token = jwt.sign({ user_id: user._id, email },
            process.env.TOKEN_KEY, { expiresIn: "2h" });

        user.token = token;

        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).send("Internal Server Error: " + error);
    }
};

exports.getUserProfiles = async function (req, res) {
    const token = req.headers.authorization.replace("Bearer ","");

    var userId = jwt.decode(token).user_id;
    var user = await User.findOne({_id: userId}).select("-password");

    res.status(200).json(user);
};