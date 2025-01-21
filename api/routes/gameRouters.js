const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");

const GameController = require("../controllers/gamesController");

router.get("/", GameController.games_get_all);

router.post("/", checkAuth, GameController.games_add_new);

router.get("/:gameId", GameController.games_get_by_id);

router.put("/:gameId", GameController.games_update);

router.delete("/:gameId", GameController.games_delete);

module.exports = router;
