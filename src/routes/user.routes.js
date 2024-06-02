const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/userController");
const auth = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");

router.get("/profile", auth, ctrl.getUserProfile);
router.put("/profile", auth, ctrl.updateUserProfile);

router.get("/", auth, authorize("Super Admin"), (req, res, next) => {
    // Si el parámetro de consulta 'email' está presente, dirigir la solicitud al metodo getByEmail
    if (req.query.email) {
      return ctrl.getByEmail(req, res, next);
    }
    // Si no hay parámetro 'email', dirigir la solicitud al metodo getAll
    return ctrl.getAll(req, res, next);
  });

router.put("/:id/:role", auth, authorize("Super Admin"), ctrl.update);
router.delete("/:id", auth, authorize("Super Admin"), ctrl.delete);
module.exports = router;