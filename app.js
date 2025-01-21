require('dotenv').config();
// import

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

//Połączenie z bazą
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@gamestorecluster.p673c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=GameStoreCluster`)
.then(() => console.log("Połączono z bazą"))
.catch(err => console.log("Błąd połączenia z bazą", err));

//Middleware
app.use(morgan("dev")); // Logger zapytań
app.use(bodyParser.json()); // Obsługa JSON w req.body

//Importowanie routów
const userRoutes = require("./api/routes/userRouters");
const gameRoutes = require("./api/routes/gameRouters");
const developerRoutes = require("./api/routes/developerRouters");
const transactionRoutes = require("./api/routes/transactionRouters");

//Stosowanie routów
app.use("/users", userRoutes);
app.use("/games", gameRoutes);
app.use("/developers", developerRoutes);
app.use("/transactions", transactionRoutes);

//błąd routu
app.use((req, res, next) => {
    res.status(404).json({wiadomość: "Not Found"})
})

module.exports = app;