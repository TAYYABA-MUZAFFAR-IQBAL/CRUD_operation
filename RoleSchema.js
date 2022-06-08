const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  roleName: { type: String },
  roleTitle: { type: String },
});

const role = mongoose.model("Role", roleSchema);
module.exports = role;
