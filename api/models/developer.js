const mongoose = require("mongoose")

//schemat developera
const developerSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {type: String, required: true},
    games: [{type: monguse.Schema.Types.ObjectId, ref: "Game"}]
})

module.exports = mongoose.model("Developer", productSchema)