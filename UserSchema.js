const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String, unique: true
  },
  password: {
    type: String,
  },
  role: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Role',
    required: true
  },
 
});

const user = mongoose.model("User", userSchema);

module.exports = user;
