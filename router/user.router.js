const { Router } = require("express");
const {
  me,
  updateMe,
  getUserExpenses,
  getUserIncome,
} = require("../controller/user.controller");

const router = Router();

router.get("/", me);
router.put("/update-user", updateMe);
router.get("/get-user-expenses", getUserExpenses);
router.get("/get-user-income", getUserIncome);
module.exports = router;
