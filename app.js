const express = require("express");
const app = express();
const port = 2000;
const accounts = require("./accounts");
app.use(express.json());

const createNewAccount = (newAccountData) => {
  console.log("Creating new account", newAccountData);
  const newId = accounts.length + 1;
  const newAccount = Object.assign({ id: newId }, newAccountData);
  console.log("My new account is: ", newAccount);
  return newAccount;
};

const updateAccount = (currenAccount, newData) => {
  const myUpatedAccount = Object.assign(currenAccount, newData);
  return myUpatedAccount;
};

const deleteAccount = (accountIdToBeDeleted) => {
  const newAccount = accounts.filter(
    (account) => account.id != accountIdToBeDeleted
  );
  console.log("My new accounts are: ", newAccount);
};

/* -------------------------- */

app.get("/accounts", (req, res) => {
  res.json(accounts);
});

app.get("/accounts/:accountId", (req, res) => {
  const { accountId } = req.params;
  const account = accounts.find((account) => account.id == accountId);
  if (account) {
    res.status(200).json(account);
  } else {
    res.status(404).json();
  }
});

app.put("/accounts/:accountId", (req, res) => {
  const { accountId } = req.params;
  const account = accounts.find((account) => account.id == accountId);

  if (account) {
    const updatedAccount = updateAccount(account, req.body);
    res.status(200).json(updatedAccount);
  } else {
    res.status(404).json();
  }
});

app.delete("/accounts/:accountId", (req, res) => {
  const { accountId } = req.params;
  const account = accounts.find((account) => account.id == accountId);
  if (account) {
    deleteAccount(accountId);
    res.status(204).end();
  } else {
    res.status(404).json();
  }
});

app.post("/accounts", (req, res) => {
  const newAccont = createNewAccount(req.body);
  res.status(201).json(newAccont);
});

app.listen(port, () => {
  console.log(`The application is running on  ${port}`);
});
