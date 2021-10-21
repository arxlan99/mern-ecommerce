import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createSeed = async (req, res, next) => {
  try {
    await Product.deleteMany({});
    const createdUsers = await User.insertMany(data.users);
    res.json({ createdUsers });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw Error("User has not found");
    }

    res.status(200).send({ user: user });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const putProfileInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      throw Error("User has not found");
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = bcrypt.hash(req.body.password, 8);
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

    const updatedUser = await user.save();

    res.status(200).send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: token,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send({ users: users });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw Error("User has not found");
    }
    if (user.email === "admin@gmail.com" || user.email === "ozkan@gmail.com") {
      throw Error("Admin user can not be deleted");
    }

    const deletedUser = await user.remove();
    res
      .status(200)
      .send({ message: "User has been deleted", user: deletedUser });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const editUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw Error("User has not found");
    }
    if (user.email === "admin@gmail.com" || user.email === "ozkan@gmail.com") {
      throw Error("Admin user can not be changed");
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isSeller = req.body.isSeller || user.isSeller;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    const updatedUser = await user.save();
    res
      .status(200)
      .send({ message: "User has been updated", user: updatedUser });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
