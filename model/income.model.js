const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    note: String,
    expenseType: String,
    price: Number,
  },
  {
    timestamps: true,
  }
);

const Income = mongoose.model("income", IncomeSchema);

module.exports = Income;
