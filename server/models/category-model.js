const {Schema, model} = require("mongoose");

const categorySchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },

    slug:{
        type: String,
        lowercase: true
    }
});

module.exports = model("Category", categorySchema);