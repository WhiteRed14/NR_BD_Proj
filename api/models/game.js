const mongoose = require("mongoose")

//schemat gry
const gameSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {type: String, required: true},
    price: {type: Number, required: true},
    additionalData: {
        description: {type: String, default: " "},
        releaseDate: {type: Date, required: true},
        tags: {type: [String], default: []},
        images: String
    }
});

module.exports = mongoose.model("Game", gameSchema)