const express = require("express");

const accounts = require("../../accounts");

const router = express.Router();

/* ----------------------- */

const {
  listAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  accountDetail,
} = require("./controllers");
router.get("/", listAccounts);
router.post("/", createAccount);
router.get("/:accountId", accountDetail);
router.put("/:accountId", updateAccount);
router.delete("/:accountId", deleteAccount);

module.exports = router;
