//import
const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const DeveloperController = require("../controllers/developerController");

//Pobierz wszystkich developerów
router.get("/", DeveloperController.developer_get_all);

//Dodanie nowego developera
router.post("/", checkAuth, DeveloperController.developer_add_new);

//Pobranie developera po id
router.get("/:developerId", DeveloperController.developer_get_by_id);

//Aktualizacja developera
router.put("/:developerId", DeveloperController.developer_update);

//Usunięcie developera
router.delete("/:developerId", DeveloperController.developer_delete);

module.exports = router;