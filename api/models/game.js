const mongoose = require("mongoose")

//schemat gry
const gameSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {type: String, required: true},
    developer: {type: String, required: true},
    price: {type: Number, required: true},
    description: String,
    tags: {type:[String], default: []}
});

module.exports = mongoose.model("Game", gameSchema)