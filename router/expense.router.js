const { Router } = require("express");
const { saveExpense, saveIncome } = require("../controller/expense.controller");

const router = Router();

router.post("/add-expense", saveExpense);
router.post("/add-income", saveIncome);

module.exports = router;
