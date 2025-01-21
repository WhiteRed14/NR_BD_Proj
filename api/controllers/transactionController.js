//import
const mongoose = require("mongoose");
const Transaction = require("../models/transaction");

//Pobieranie
exports.transaction_get_all = (req, res, next) => {
    Transaction.find().populate("user games")
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
        user: req.body.user,
        games: req.body.games,
        price: req.body.price,
        date: req.body.date || Date.now()
    });

    transaction.save()
    .then(result => {
        res.status(201).json({
            message: "Nowa transakcja została dodana",
            dane: result
        });
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
            res.status(404).json({ message: "Nie ma takiej transakcji"});
        }
    })
    .catch(err => res.status(500).json({ message: err}));
};

//Aktualizowanie
exports.transaction_update = (req, res, next) => {
    const id = req.params.transactionId;
    Transaction.updateOne({ _id: id}, {$set: req.body})
    .then(() => {
        res.status(200).json({ message: "Zaktualizowano transakcje z ID:" + id});
    })
    .catch(err => res.status(500).json({ message: err}));
};

//Usuwanie
exports.transaction_delete = (req, res, next) => {
    const id = req.params.transactionId;
    Transaction.findOneAndDelete(id)
    .then(result => {
        res.status(200).json({wiadomość: "Usunięcie transakcji" + id})
    })
};