// import
const http = require("http");
const app = require("./app");

//Definiowanie portu

const port = process.env.PORT || 3000;

//Tworzenie serwera 
const server = http.createServer(app);

//Uruchmienie servera
server.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});