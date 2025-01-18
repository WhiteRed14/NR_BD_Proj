const mongoose = require("mongoose")

//schemat transakcji
const transactionSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    games: [{type: mongoose.Schema.Types.ObjectId, ref: "Game"}],
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    price: {type: Number, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Transaction", transactionSchema)