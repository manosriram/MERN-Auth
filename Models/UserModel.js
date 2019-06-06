const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  }
});

module.exports = User = mongoose.model("myUser", UserSchema);
