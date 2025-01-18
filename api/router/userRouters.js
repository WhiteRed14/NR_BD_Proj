const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//Pobieranie wszystkich użytkowników
router.get("/", (req, res, next) => {
    User.find().populate("library")
    .then(users => {
        res.status(200).json({
            message: "Lista wszystkich użytkowników",
            lista: users
        });
    })
    .catch(err => res.status(500).json({ message: err}));
});

//Rejestracja nowego użytkownika
route.post("/register", (req, res, next) => {
    User.find({ login: req.body.login })
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
            dane: savedUser
        });
    })
    .catch(err => res.status(500).json({ message: err}));
});

//Logowanie użytkownika
router.post("/login", (req,res, next) => {
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
            { userId: user._id }, 
            process.env.JWT_KEY, 
            { expiresIn: '1h'}
        );
        
        res.status(200).json({ message: "Zalogowano pomyślnie", token});
    })
    .catch(err => res.status(500).json({ message: err }));
});

//Pobranie użytkownika po ID
router.get("/:userId", (req, res, next) => {
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
});
