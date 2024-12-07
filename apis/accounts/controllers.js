const accounts = require("../../accounts");

exports.listAccounts = (req, res) => {
  const username = req.params.username;
  const funds = req.params.funds;
  console.log("username", username);
  console.log("funds", funds);
  let result = accounts;
  if (username) {
    result = accounts.filter((account) => account.username == username);
  }
  if (funds) {
    result = result.filter((account) => account.funds.includes(funds));
  }
  res.json(result);
};

exports.accountDetail = (req, res) => {
  const { accountId } = req.params;
  const account = accounts.find((account) => account.id == accountId);
  if (account) {
    res.status(200).json(account);
  } else {
    res.status(404).json();
  }
};
const createNewAccount = (newAccountData) => {
  console.log("Creating new account", newAccountData);
  const newId = accounts.length + 1;
  const newAccount = Object.assign({ id: newId }, newAccountData);
  console.log("My new account is: ", newAccount);
  return newAccount;
};

exports.createAccount = (req, res) => {
  const newAccont = createNewAccount(req.body);
  res.status(201).json(newAccont);
};
const updateAccount = (currenAccount, newData) => {
  const myUpatedAccount = Object.assign(currenAccount, newData);
  return myUpatedAccount;
};
exports.updateAccount = (req, res) => {
  const { accountId } = req.params;
  const account = accounts.find((account) => account.id == accountId);

  if (account) {
    const updatedAccount = updateAccount(account, req.body);
    res.status(200).json(updatedAccount);
  } else {
    res.status(404).json();
  }
};
const deleteAccount = (accountIdToBeDeleted) => {
  const newAccount = accounts.filter(
    (account) => account.id != accountIdToBeDeleted
  );
  console.log("My new accounts are: ", newAccount);
};
exports.deleteAccount = (req, res) => {
  const { accountId } = req.params;
  const account = accounts.find((account) => account.id == accountId);
  if (account) {
    deleteAccount(accountId);
    res.status(204).end();
  } else {
    res.status(404).json();
  }
};
