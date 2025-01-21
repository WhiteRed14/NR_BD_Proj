//import
const mongoose = require("mongoose")
const Game = require("../models/game")

//Pobranie
exports.games_get_all = (req, res, next) => {
    Game.find().then(games => {
        res.status(200).json({
            wiadomość: "lista wszystkich gier",
            lista: games
        })
    })
    .catch(err => {
        res.status(500).json({
            wiadomość: err
        })
    })
}

//Dodanie
exports.games_add_new = (req, res, next) => {
    const game = new Game({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        additionalData: {
            description: req.body.additionalData.description,
            releaseDate: req.body.additionalData.releaseDate,
            tags: req.body.additionalData.tags,
            images: req.body.additionalData.images
        }
    })
    //zapis
    game.save()
    .then(result => {
        res.status(201).json({
            wiadomość: "utworzenie nowej gry",
            dane: result
        })
    })
    .catch(err => {
        res.status(500).json({
            wiadomość: err
        })
    })
}

//Pobranie po id
exports.games_get_by_id = (req, res, next) => {
    const id = req.params.gameId
    Game.findById(id).then(result => {
        res.status(200).json({
            wiadomość: "Szczegóły gry o id " + id,
            dane: result                
        })
    })
}

//Aktualizacja
exports.games_update = (req, res, next) => {
    const id = req.params.gameId
    Game.findByIdAndUpdate(id, {
        name: req.body.name,
        price: req.body.price,
        additionalData: {
            description: req.body.desc,
            releaseDate: req.body.releaseDate,
            tags: req.body.tags,
            images: req.body.img
        }
    })
    .then( () => {
        res.status(200).json({wiadomość: "Zmiana danych gry o id " + id})
    })
}

//Usunięcie
exports.games_delete = (req, res, next) => {
    const id = req.params.gameId
    Game.findOneAndDelete(id)
    .then(result => {
        res.status(200).json({wiadomość: "Usunięcie gry o id " + id})
    })
}