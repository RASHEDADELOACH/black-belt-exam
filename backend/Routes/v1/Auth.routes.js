const express = require("express");
const {
  register,
  login,
  autoLogin,
} = require("../../Controllers/Auth.Controllers");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/autoLogin", autoLogin);

module.exports = router;
