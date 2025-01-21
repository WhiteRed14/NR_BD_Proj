//import
const mongoose = require("mongoose");
const Transaction = require("../models/transaction");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//Pobieranie
exports.transaction_get_all = (req, res, next) => {
    Transaction.find().populate("user game")
    .then(transaction => {
        res.status(200).json({
            message: "Lista wszystkich transakcji",
            lista: transaction
        });
    })
    .catch(err => res.status(500).json({ message: err}));
};

//Dodawanie
exports.transaction_add_new = (req, res, next) => {
    const transaction = new Transaction({
        _id: new mongoose.Types.ObjectId(),
        user: jwt.verify(req.body.token, process.env.JWT_KEY).userId,
        game: req.body.game,
        date: req.body.date || Date.now()
    });

    transaction.save()
    .then((result) => {
        User.updateOne({ _id: transaction.user }, { $push: { library: transaction.game } })
        .then(() => {
            res.status(200).json({ 
                message: "Dodano grę o id: " + transaction.game + " do biblioteki użytkownika o ID " + transaction.user,
                dane: result 
            })
        })
    })
    .catch(err => res.status(500).json({ message: err}));
};

//Pobieranie po ID 
exports.transaction_get_by_id = (req, res, next) => {
    const id = req.params.transactionId;
    Transaction.findById(id).populate("user games")
    .then(transaction => {
        if(transaction){
            res.status(200).json(transaction);
        }
        else {
            res.status(404).json({ message: "Nie ma takiej tranzakcji"});
        }
    })
    .catch(err => res.status(500).json({ message: err}));
};

//Aktualizowanie
exports.transaction_update = (req, res, next) => {
    const id = req.params.transactionId;
    Transaction.updateOne({ _id: id}, {$set: req.body})
    .then(() => {
        res.status(200).json({ message: "Zaktualizowano tranzakcje z ID:" + id});
    })
    .catch(err => res.status(500).json({ message: err}));
};

//Usuwanie
exports.transaction_delete = (req, res, next) => {
    const id = req.params.transactionId;
    Transaction.findOneAndDelete(id)
    .then(result => {
        res.status(200).json({wiadomość: "Usunięcie tranzakcji" + id})
    })
};