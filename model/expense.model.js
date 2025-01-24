const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: String,
    note: String,
    price: Number,
  },
  {
    timestamps: true,
  }
);

const Expenses = mongoose.model("expense", ExpenseSchema);

module.exports = Expenses;
