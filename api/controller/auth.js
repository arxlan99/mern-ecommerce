import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const error = new Error("A user with this email could not be found.");
      error.statusCode = 401;
      throw error;
    }
    const isEqual = await bcrypt.compareSync(req.body.password, user.password);

    if (!isEqual) {
      const error = new Error("Wrong password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      },
      "secret",
      { expiresIn: "5h" }
    );

    const { password: userPassword, ...info } = user._doc;

    res.status(200).json({ ...info, token });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
