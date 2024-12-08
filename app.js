const express = require("express");
const app = express();
const port = 2000;
// const accounts = require("./accounts");
const accountsRouter = require("./apis/accounts/routes");
app.use(express.json());
app.use("/api/accounts", accountsRouter);
const connectDb = require("./database");
connectDb();
app.listen(port, () => {
  console.log(`The application is running on  ${port}`);
});
