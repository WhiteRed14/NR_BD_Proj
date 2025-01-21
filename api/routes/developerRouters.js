const express = require("express");
const router = express.Router();
//autoryzacja
const checkAuth = require("../middleware/checkAuth");

//iimportowanie controllers
const DeveloperController = require("../controllers/developerControllers");

router.get("/", DeveloperController.developer_get_all);

router.get("/", checkAuth, DeveloperController.developer_add_new);

router.get("/", DeveloperController.developer_get_by_id);

router.get("/", DeveloperController.developer_update);

router.get("/", DeveloperController.developer_delete);

module.exports = router;