export const isSellerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.isSeller || req.user.isAdmin)) {
    return next();
  }
  return res.status(401).json({
    status: 401,
    error: "You are not authorized to perform this action",
  });
};
