const User = require("../model/user.model");
const ExpenseSchema = require("../model/expense.model");
const IncomeSchema = require("../model/income.model");
const me = (req, res) => {
  return res.status(200).json("Expensetrak APIs");
};

const updateMe = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    res.status(200).json({ data: user });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

async function getUserExpenses(req, res) {
  console.log("is user", req.user);
  try {
    const userExpenses = await ExpenseSchema.find({ userId: req.user._id })
      .lean()
      .exec();
    return res.status(200).send(userExpenses);
  } catch (err) {
    console.log("heheheheh");
    return res.status(401).send(err);
  }
}
async function getUserIncome(req, res) {
  try {
    const userIncome = await IncomeSchema.find({ userId: req.user._id })
      .lean()
      .exec();
    return res.status(200).send(userIncome);
  } catch (err) {
    return res.status(401).send(err);
  }
}
module.exports = { me, updateMe, getUserExpenses, getUserIncome };
