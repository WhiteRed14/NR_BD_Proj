const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");

const GameController = require("../controllers/gamesController");

router.get("/", GameController.games_get_all);

router.get("/", checkAuth, GameController.games_add_new);

router.get("/", GameController.games_get_by_id);

router.get("/", GameController.games_update);

router.get("/", GameController.games_delete);

module.exports = router;
