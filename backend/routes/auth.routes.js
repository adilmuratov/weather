const Router = require("express");
const router = new Router();
const authController = require("../controller/auth.controller");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

module.exports = router;