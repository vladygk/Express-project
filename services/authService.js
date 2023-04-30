const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jsonwebtoken");
const {SECRET} = require("../constants"); 
exports.findByUsername = (username) => User.findOne({ username });
exports.findByEmail = (email) => User.findOne({ email });

exports.register = async (username, email, password, repassword) => {
  if ((password != repassword )||password==='' ){
    throw new Error("Invalid password!");
  }

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    throw new Error("User alredy exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ username, email, password: hashedPassword });
  return this.login(username,password);
};

exports.login = async (username, password) => {
  const user = await this.findByUsername(username);
  if (!user) {
    throw new Error("Invalid password or email!");
  }

  const isValidPassword = await bcrypt.compare( password,user.password);

  if (!isValidPassword) {
    throw new Error("Invalid password or username");
  }
  const payload = { _id: user._id, email:user.email, username: user.username };
  const token = await jwt.sign(payload, SECRET);
  return token;
};
