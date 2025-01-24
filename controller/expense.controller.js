const ExpenseSchema = require("../model/expense.model");
const IncomeSchema = require("../model/income.model");
const User = require("../model/user.model");

async function saveExpense(req, res) {
  try {
    console.log("hehrer");
    console.log("><><><>>>>>>>", req.body);
    const { expenseType, category, note, price } = req.body;
    if ((!expenseType, !note, !price)) {
      return res.status(401).send({ message: "All fields are required!" });
    }
    const expense = await ExpenseSchema.create({
      userId: req.user._id,
      expenseType: expenseType,
      note,
      price,
      category,
    });
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $push: { expenses: expense } }
    );
    return res
      .status(200)
      .send({ data: expense, message: "successfully added expense" });
  } catch (err) {
    return res.status(400).send(err);
  }
}

async function deleteExpense(req, res) {
  try {
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $push: { expenses: [] } }
    );
    return res
      .status(200)
      .send({ data: expense, message: "successfully added expense" });
  } catch (err) {
    return res.status(400).send(err);
  }
}

async function saveIncome(req, res) {
  try {
    const { expenseType, note, price } = req.body;
    if ((!expenseType, !note, !price)) {
      return res.status(401).send({ message: "All fields are required!" });
    }
    const income = await IncomeSchema.create({
      userId: req.user._id,
      expenseType: expenseType,
      note,
      price,
    });
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $push: { income: income } }
    );
    return res
      .status(200)
      .send({ data: income, message: "successfully added income" });
  } catch (err) {
    return res.status(400).send(err);
  }
}
async function deleteExpense(req, res) {
  try {
  } catch (err) {
    return res.status(400).send(err);
  }
}
module.exports = { saveExpense, saveIncome, deleteExpense };
