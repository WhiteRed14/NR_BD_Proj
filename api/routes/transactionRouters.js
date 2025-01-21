//import
const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const TransactinController = require("../controllers/transactionController");

//Pobranie wszystkich tranzakcji
router.get("/", TransactinController.transaction_get_all);

//Dodanie nowej tranzakcji
router.post("/", checkAuth, TransactinController.transaction_add_new);

//Pobranie trakzakcji po id
router.get("/:transactionId", TransactinController.transaction_get_by_id);

//Aktualizacja tranzakcji
router.put("/:transactionId", TransactinController.transaction_update);

//Usunięcie tranzakcji
router.delete("/:transactionId", TransactinController.transaction_delete);

module.exports = router;