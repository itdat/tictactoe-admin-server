const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("admin", AdminSchema);
