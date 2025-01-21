const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");

const GameController = require("../controllers/gamesController");

router.get("/", GameController.games_get_all);

router.post("/", checkAuth, GameController.games_add_new);

router.get("/", GameController.games_get_by_id);

router.put("/", GameController.games_update);

router.delete("/", GameController.games_delete);

module.exports = router;
