const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category_name: String,
    note: String,
    price: Number,
  },
  {
    timestamps: true,
  }
);

const Categories = mongoose.model("categories", CategoriesSchema);

module.exports = Categories;
