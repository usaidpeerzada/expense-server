const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "ExpenseSchema" }],
    income: [{ type: mongoose.Schema.Types.ObjectId, ref: "IncomeSchema" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  console.log("sheesh");
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;
    next();
  });
});

UserSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }

      resolve(same);
    });
  });
};
const User = mongoose.model("user", UserSchema);
module.exports = User;
