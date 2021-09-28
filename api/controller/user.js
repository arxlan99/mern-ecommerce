import User from "../models/user.js";

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


