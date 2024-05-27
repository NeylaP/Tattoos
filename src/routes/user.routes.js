const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/userController");

router.get("/", ctrl.getAll);
router.get("/:email", ctrl.getByEmail);

module.exports = router;