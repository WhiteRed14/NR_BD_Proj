const express = require("express");
const router = express.Router();
//autoryzacja
const checkAuth = require("../middleware/checkAuth");

//iimportowanie controllers
const DeveloperController = require("../controllers/developerController");

router.get("/", DeveloperController.developer_get_all);

router.post("/", checkAuth, DeveloperController.developer_add_new);

router.get("/", DeveloperController.developer_get_by_id);

router.put("/", DeveloperController.developer_update);

router.delete("/", DeveloperController.developer_delete);

module.exports = router;