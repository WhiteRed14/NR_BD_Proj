const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

const TransactinController = require("../controllers/transactionController");

router.get("/", TransactinController.transaction_get_all);

router.post("/", checkAuth, TransactinController.transaction_add_new);

router.get("/", TransactinController.transaction_get_by_id);

router.put("/", TransactinController.transaction_update);

router.delete("/", TransactinController.transaction_delete);

module.exports = router;