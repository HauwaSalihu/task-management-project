import { UserModel } from "../models/usrModel/usermodel.js";
import validator from "validator";
import brcypt from "bcrypt";

async function loginUser(req, res) {
  const { email, password } = req.body;

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

  try {
    const user = await UserModel.findOne({
      email: email.toLowerCase().trim(),
    });

    if (user === null) {
      return res
        .status(400)
        .json({ message: "Email or password incorrect", status: "failed" });
    }

    const isPasswordCorrect = await brcypt.compare(password, user.password);

    if (isPasswordCorrect === false) {
      return res
        .status(400)
        .json({ message: "Email or password incorrect", status: "failed" });
    }
    //to remove password from what is sent back to the frontend
    user.password = undefined;
    res.status(200).json({ user, status: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "failed" });
  }
}

export { loginUser };
