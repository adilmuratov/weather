const Router = require("express");
const router = new Router();
const authController = require("../controller/auth.controller");
const authChecker = require("../middleware/middleware");

router.post("/register", authController.registerUser);
router.post("/login", authChecker.requireGuest, authController.loginUser);
router.post("/logout", authChecker.requireAuth, authController.logoutUser);

module.exports = router;