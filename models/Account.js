const { model, Schema } = require("mongoose");

const accountSchema = new Schema({
  username: String,
  funds: String,
});

module.exports = model("Account", accountSchema);
