import data from "../data/data.js";
import User from "../models/user.js";

export const createSeed = async (req, res, next) => {
  try {
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
