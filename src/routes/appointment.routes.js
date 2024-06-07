const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/appointmentController");
const auth = require("../middlewares/auth");


router.post("/", auth, ctrl.create);
router.get("/", auth, ctrl.getMyAppointments);
router.get("/:id", auth, ctrl.getById);
router.put("/", auth, ctrl.update);
// router.delete("/:id", auth, ctrl.delete);
module.exports = router;