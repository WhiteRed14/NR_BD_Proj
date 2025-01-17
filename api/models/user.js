const mongoose = require("mongoose")

//schemat użytkownika
const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    library: [{type: mongoose.Schema.Types.ObjectId, ref: "Game"}]
});

module.exports = mongoose.model("User", userSchema)