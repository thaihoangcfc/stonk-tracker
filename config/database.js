require('dotenv').config();
const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

exports.connect = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to database successfully.")
    })
    .catch((error) => {
        console.log("Database connection failed. Exiting now...");
        console.error(error);
        process.exit(1);
    })
}