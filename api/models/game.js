const mongoose = require("mongoose")

//schemat gry
const gameSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {type: String, required: true},
    developer: {type: mongoose.Schema.Types.ObjectId, ref: "Developer"},
    price: {type: Number, required: true}
});

module.exports = mongoose.model("Game", gameSchema)