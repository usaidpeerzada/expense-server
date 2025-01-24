const mongoose = require("mongoose");
const options = require("../config/index");

const connect = (url = process.env.DB_URL, opts = {}) => {
  return mongoose.connect(url, { ...opts, useNewUrlParser: true });
};

module.exports = connect;
