const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const validator = require("validator");

const signUp = async (req, res) => {
  let { name, email, password } = req.body;

  try {
    if (!validator.isEmail(email)) {
      throw new Error("need correct credentials");
    }
    if (!validator.isStrongPassword(password)) {
      throw new Error("need Strong Password ");
    }
    password = password.trim();
    const HashPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: HashPassword });
    await user.save();
    res.status(200).send("Welcome New User 😊" + name);
  } catch (error) {
    res.status(400).send("Error ! " + error.message);
  }
};

const logIn = async (req, res) => {
  let { email, password } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({ email: email });
    const token = user.getJWT();
    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      res.cookie("token", token);
      res.status(200).send("Login Successfull for  "+user.name);
    } else {
      res.status(400).send("Invalid credentials ! ");
    }
  } catch (error) {
    res.status(400).send("Error " + error.message);
  }
};

module.exports = { signUp, logIn };
