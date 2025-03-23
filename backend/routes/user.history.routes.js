const Router = require("express");
const router = new Router();
const userHistoryController = require("../controller/user.history.controller");

router.post("/userhistory", userHistoryController.createActionHistory);
router.get("/userhistory/:id", userHistoryController.getAllUserHistory);
router.delete("/userhistory/:id", userHistoryController.deleteActionHistory);

module.exports = router;