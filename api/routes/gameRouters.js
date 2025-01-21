//import
const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const GameController = require("../controllers/gamesController");

//Pobranie wszystkich gier
router.get("/", GameController.games_get_all);

//Dodanie nowej gry
router.post("/", checkAuth, GameController.games_add_new);

//Pobranie gry po id
router.get("/:gameId", GameController.games_get_by_id);

//Aktualizacja gry
router.put("/:gameId", GameController.games_update);

//Usunięcie gry
router.delete("/:gameId", GameController.games_delete);

module.exports = router;
