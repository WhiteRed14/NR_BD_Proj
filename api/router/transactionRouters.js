const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Transaction = require("../models/transaction");

//Pobieranie

router.get("/", (req, res, next) => {
    Transaction.find().populate("user games")
    .then(transaction => {
        res.status(200).json({
            message: "Lista wszystkich transakcji",
            lista: transaction
        });
    })
    .catch(err => res.status(500).json({ message: err}));
});

//Dodawanie

router.post("/", (req, res, next) => {
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
});

//Pobieranie po ID 
router.get("/:transactionId", (req, res, next) => {
    const id = req.body.transactionId;
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
});


//Aktualizowanie
router.put("/:transactionrId", (req, res, next) => {
    const id = req.body.transactionId;
    Transaction.updateOne({ _id: id}, {$set: req.body})
    .then(() => {
        res.status(200).json({ message: "Zaktualizowano transakcje z ID:" + id});
    })
    .catch(err => res.status(500).json({ message: err}));
});

//Usuwanie
router.delete("/:transactionId", (req, res, next) => {
    const id = req.body.transactionId;
    Transaction.deleteOne({ _id: id})
    .then(() => {
        res.status(200).json({ message: "Usunieto transakcje z ID:" + id});
    })
    .catch(err => res.status(500).json({ message: err}));
});

module.exports = router;