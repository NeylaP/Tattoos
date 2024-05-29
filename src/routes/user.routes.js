const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/userController");

router.get("/", (req, res, next) => {
    // Si el parámetro de consulta 'email' está presente, dirigir la solicitud al metodo getByEmail
    if (req.query.email) {
      return ctrl.getByEmail(req, res, next);
    }
    // Si no hay parámetro 'email', dirigir la solicitud al metodo getAll
    return ctrl.getAll(req, res, next);
  });

router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.delete);
module.exports = router;