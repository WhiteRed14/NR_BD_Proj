//import
const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const UserController = require("../controllers/userController");

//Pobieranie wszystkich użytkowników
router.get("/", UserController.user_get_all);

//Rejestracja nowego użytkownika
router.post("/register", UserController.user_register);

//Logowanie użytkownika
router.post("/login", UserController.user_log_in);

//Pobranie użytkownika po ID
router.get("/:userId", UserController.user_get_by_id);

//Aktualizacja użytkowanika 
router.put("/:userId", UserController.user_update);

//Usuwanie użytkownika
router.delete("/:userId", UserController.user_delete);

module.exports = router;