const mongoose = require("mongoose")

//schemat transakcji
const transactionSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    game: {type: mongoose.Schema.Types.ObjectId, ref: "Game"},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Transaction", transactionSchema)