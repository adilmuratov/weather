const Router = require("express");
const router = new Router();
const authController = require("../controller/auth.controller");

router.post("/register", authController.registerUser);
router.get("/login", authController.loginUser);

module.exports = router;