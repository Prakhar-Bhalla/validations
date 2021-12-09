const mongoose = require("mongoose");

require("dotenv").config();

const connect = () => {
    return mongoose.connect(`mongodb+srv://Prakhar2266:${process.env.MONGO_PASSWORD}@cluster0.pvv3v.mongodb.net/validation`)
}

module.exports = connect;