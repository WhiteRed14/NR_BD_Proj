// import
require("dotenv").config();
const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");

//Definiowanie portu

const port = process.env.PORT || 3000;

//Tworzenie serwera 
const server = http.createServer(app);

//Uruchmienie servera
server.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});