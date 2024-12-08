const accounts = require("../../accounts");
const Account = require("../../models/Account");
exports.listAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.accountDetail = async (req, res) => {
  const { accountId } = req.params;
  const account = await Account.findById(accountId);
  if (account) {
    res.status(200).json(account);
  } else {
    res.status(404).json();
  }
};

exports.createAccount = async (req, res) => {
  const account = new Account(req.body);
  const savedAccount = await account.save();
  res.status(201).json(savedAccount);
};

exports.updateAccount = async (req, res) => {
  const { accountId } = req.params;
  const foundAccount = await Account.findById(accountId);
  if (foundAccount) {
    await foundAccount.updateOne(req.body);
    res.status(202).json();
  } else {
    res.status(404).json();
  }
};

exports.deleteAccount = async (req, res) => {
  const { accountId } = req.params;
  const foundAccount = await Account.findById(accountId);
  if (foundAccount) {
    await foundAccount.deleteOne();
    res.status(204).end();
  } else {
    res.status(404).json();
  }
};
