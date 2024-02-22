const mongoose = require("mongoose");


const DB = process.env.DB;

const connectionDb = async() => {
    try {
        await mongoose.connect(DB);
        console.log("Connection Successfull!");
    } catch (error) {
        console.error("Connection Failed");
        process.exit(0);
    }
};

module.exports = connectionDb;