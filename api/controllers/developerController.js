//import
const mongoose = require("mongoose");
const Developer = require("../models/developer");

//Pobieranie
exports.developer_get_all = (req, res, next) => {
    Developer.find().populate("games")
    .then(developers => {
        res.status(200).json({
            message: "Lista wszystkich twórców",
            lista: developers
        });
    })
    .catch(err => res.status(500).json({ message: err}));
};

//Dodawanie
exports.developer_add_new = (req, res, next) => {
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
};

//Pobieranie po ID 
exports.developer_get_by_id = (req, res, next) => {
    const id = req.params.developerId;
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
};

//Aktualizowanie
exports.developer_update = (req, res, next) => {
    const id = req.params.developerId;
    Developer.updateOne({ _id: id}, {$set: req.body})
    .then(() => {
        res.status(200).json({ message: "Zaktualizowano twórce z ID:" + id});
    })
    .catch(err => res.status(500).json({ message: err}));
};

//Usuwanie
exports.developer_delete =  (req, res, next) => {
    const id = req.params.developerId;
    Developer.findOneAndDelete(id)
    .then(result => {
        res.status(200).json({wiadomość: "Usunięcie developera o id " + id})
    })
};