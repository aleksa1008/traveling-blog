const mongoose = require("mongoose");

const destinationsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  picture: String,
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  destinations: [destinationsSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
