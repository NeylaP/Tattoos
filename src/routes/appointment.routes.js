const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/appointmentController");


router.get("/", ctrl.getMyAppointments);

router.get("/:id", ctrl.getById);

module.exports = router;