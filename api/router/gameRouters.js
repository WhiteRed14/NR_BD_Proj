const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Game = require("../models/game");

//pobieranie wszystkich gier
router.get("/", (req, res, next) => {
    Game.find()
    .then(games => {
        res.status(200).json({
            message: "Lista wszystkich gier",
            lista: games
        });
    })
    .catch(err => res.status(500).json({ message: err}));
});

//Dodawanie nowej gry

router.post("/", (req, res, next) =>{
    const game = new Game({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        additionalData: req.body.additionalData
    });

    game.save()
    .then(result => {
        res.status(201).json({
            message: "Nowa gra została dodana",
            dane: result
        });
    })
    .catch(err => { res.status(500).json({ nesssage: err})});
});

//Pobieranie gry po ID
router.get("/:gameId", (req, res, next) => {
    const id = req.params.gameId;
    Game.findById(id)
    .then(game => {
        if(game) {
            res.status(200).json(game);
        }
        else {
            res.status(404).json({ message: "Nie ma takiej gry"});
        }
    })
    .catch(err => res.status(500).json({ message: err}));
});

//Aktualizacja gry

router.put("/:gameId", (req, res, next) => {
    const id = req.params.gameId;
    Game.update({ _id: id }, {$set: req.body})
    .then(() => {
        res.status(200).json({ message: "Zaktualizowano gre z ID:" + id});
    })
    .catch(err => res.status(500).json({ message: err}));
});

//Usuniecie gry
router.delete("/:gameId", (req, res, next) =>{
    const id = req.params.gameId;
    Game.delete({ _id: id})
    .then(() => {
        res.status(200).json({message: "Usunięto gre z ID:" + id});
    })
    .catch(err => res.status(500).json({ message: err}));
})

module.exports = router;