const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const { signup, signin, protect, signout } = require("./utils/auth");
const connect = require("./utils/db");
const userRouter = require("./router/user.router");
const expenseRouter = require("./router/expense.router");
const { me } = require("./controller/user.controller");
// import itemRouter from "./resources/item/item.router";
// import listRouter from "./resources/list/list.rout=
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", me);
app.post("/signup", signup);
app.post("/signin", signin);
app.post("/signout", signout);

app.use("/api/v1", protect);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/expense", expenseRouter);
// app.use("/api/item", itemRouter);
// app.use("/api/list", listRouter);

const start = async () => {
  const PORT = process.env.PORT;
  try {
    await connect();
    app.listen(PORT, () => {
      console.log(`API is running on port ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
