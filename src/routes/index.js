const express = require("express");
const router = express.Router();
const userRoutes = require("./user.routes");
const appointmentRoutes = require("./appointment.routes");
const serviceRoutes = require("./service.routes");

router.use("/users", userRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/services", serviceRoutes);


module.exports = router;
