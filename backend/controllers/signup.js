import { UserModel } from "../models/usrModel/usermodel.js";
import validator from "validator";
import bcrypt from "bcrypt";

async function registerUser(req, res) {
  const { email, name, password } = req.body;

  if (validator.isEmpty(name, { ignore_whitespace: true })) {
    return res
      .status(400)
      .json({ message: "Please provide your name", status: "failed" });
  }
  if (validator.isEmail(email) === false) {
    return res
      .status(400)
      .json({ message: "Please provide a vlid email", status: "failed" });
  }

  if (
    validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    }) === false
  ) {
    res
      .status(400)
      .json({ message: "Please provide a strong password", status: "failed" });
  }
  const saltRounds = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, saltRounds);

  //syntax uses an alternative way to create user the .save method check documentation
  try {
    const user = new UserModel({
      name: name,
      email: email,
      password: hashPassword,
    });
    await user.save();
    res
      .status(201)
      .json({ message: "Account registered successfully", status: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "failed" });
  }
}

export { registerUser };
