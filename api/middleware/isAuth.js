export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  try {
    if (!authorization) {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
      throw error;
    }
    const token = authorization.split(" ")[1];
    let decodedToken;
    decodedToken = jwt.verify(token, "secret");
    if (!decodedToken) {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
      throw error;
    }

    req.user = decodedToken;

    next();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
