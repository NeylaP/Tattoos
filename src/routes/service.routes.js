const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/serviceController");


router.post("/", ctrl.create);
router.get("/", ctrl.getAll);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.delete);
module.exports = router;