//import
const mongoose = require("mongoose")
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Pobieranie
exports.user_get_all = (req, res, next) => {
    User.find().populate("library")
    .then(users => {
        res.status(200).json({
            message: "Lista wszystkich użytkowników",
            lista: users 
        });
    })
    .catch(err => res.status(500).json({ message: err}));
};

//Rejestracja
exports.user_register = (req, res, next) => {
    User.findOne({ login: req.body.login })
    .then(existingUser =>{
        if(existingUser) {
            return res.status(409).json({ message : "Login już istnieje"});
        }
        return bcrypt.hash(req.body.password, 10);
    })
    .then(hashedPassword => {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            login: req.body.login,
            password: hashedPassword,
            library: []
        });
        return user.save();
    })
    .then(saveUser => {
        res.status(201).json({
            message: "Zarejsetrowane nowego użytkownika",
            dane: saveUser
        });
    })
    .catch(err => {
        console.error("Błąd rejestracji:", err);
        res.status(500).json({ message: err})
    });
};

//Logowanie
exports.user_log_in = (req, res, next) => {
    let loggedInUser;
    User.findOne({ login: req.body.login})
    .then(user => {
        if(!user) {
            return res.status(401).json({ message: "Nieprawidłowe dane logowania"});
        }
        loggedInUser = user;
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(isMatch => {
        if(!isMatch) {
            return res.status(401).json({ message: "Nieprawidłowe dane logowania"});
        }
        const token = jwt.sign(
            { userId: loggedInUser._id },
            process.env.JWT_KEY, 
            { expiresIn: '1h'}
        );
        res.status(200).json({ message: "Zalogowano pomyślnie", token});
    })
    .catch(err => {
        console.error("Błąd logowania", err);
        res.status(500).json({ message: err });
    });
};

//Pobieranie po ID 
exports.user_get_by_id = (req, res, next) => {
    const id = req.params.userId;
    User.findById(id).populate("library")
    .then(user => {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Użytkownik nie znaleziony" });
        }
    })
    .catch(err => res.status(500).json({ message: err }));
};

//Aktualizowanie
exports.user_update = (req, res, next) => {
    const id = req.params.userId;
    let updateData = req.body;
    if(req.body.password) {
        bcrypt.hash(req.body.password, 10)
        .then(hashedPassword => {
            updateData.password = hashedPassword;
            return User.updateOne({ _id: id}, {$set: updateData});
        })
        .then(() =>{res.status(200).json({message: "Zaktualizowano użytkownika z ID:" + id})})
        .catch(err => res.status(500).json({ message: err }));
    }
    else {
        User.updateOne({ _id: id }, { $set: updateData })
        .then(() => {res.status(200).json({ message: "Zaktualizowano użytkownika o ID " + id })})
        .catch(err => res.status(500).json({ message: err }));
    }
};

//Usuwanie
exports.user_delete = (req, res, next) => {
    const id = req.params.userId;
    User.deleteOne({ _id: id})
    .then(() => {res.status(200).json({ message: "Usunięto użytkownika z ID:" + id })})
    .catch(err => res.status(500).json({ message: err }));
};