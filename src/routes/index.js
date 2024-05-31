const express = require("express");
const router = express.Router();
const userRoutes = require("./user.routes");
const appointmentRoutes = require("./appointment.routes");

router.use("/users", userRoutes);
router.use("/appointments", appointmentRoutes);


module.exports = router;
