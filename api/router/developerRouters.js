const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Developer = require("../models/developer");
const developer = require("../models/developer");
const { json } = require("body-parser");
const { route } = require("./gameRouters");


//Pobieranie

router.get("/", (req, res, next) => {
    Developer.find().populate("games")
    .then(developers => {
        res.status(200).json({
            message: "Lista wszystkich twórców",
            lista: developers
        });
    })
    .catch(err => res.status(500).json({ message: err}));
});

//Dodawanie

router.post("/", (req, res, next) => {
    const developer = new Developer({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        games: req.body.games || []
    });

    developer.save()
    .then(result => {
        res.status(201).json({
            message: "Nowy twórca został dodany",
            dane: result
        });
    })
    .catch(err => res.status(500).json({ message: err}));
});

//Pobieranie po ID 
router.get("/:developerId", (req, res, next) => {
    const id = req.body.developerId;
    Developer.findById(id).populate("games")
    .then(developer => {
        if(developer){
            res.status(200).json(developer);
        }
        else {
            res.status(404).json({ message: "Nie ma takiego twórcy"});
        }
    })
    .catch(err => res.status(500).json({ message: err}));
});
//Aktualizowanie
router.put("/:developerId", (req, res, next) => {
    const id = req.body.developerId;
    Developer.updateOne({ _id: id}, {$set: req.body})
    .then(() => {
        res.status(200).json({ message: "Zaktualizowano twórce z ID:" + id});
    })
    .catch(err => res.status(500).json({ message: err}));
});

//Usuwanie
router.delete("/:developerId", (req, res, next) => {
    const id = req.body.developerId;
    Developer.deleteOne({ _id: id})
    .then(() => {
        res.status(200).json({ message: "Usunieto twórce z ID:" + id});
    })
    .catch(err => res.status(500).json({ message: err}));
});

module.exports = router;