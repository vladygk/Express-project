const { Schema, model, Error } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      minlegth:2,
      required: [true,'Username is required']
    },
    email: {
      type: String,
      minlegth:10,
      required: [true,'Email is required']
    },
    password: {
      type: String,
      minlegth:4,
      required: [true,'Password is required']
    },
  }
);

const User = model('User',userSchema);

module.exports = User;