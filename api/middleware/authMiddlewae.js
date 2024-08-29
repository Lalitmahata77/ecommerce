import User from "../model/user.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsycError from "./catchAsycError.js";
import jwt from "jsonwebtoken"
export const isAuthenticated = catchAsycError(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }
});

export const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user?.isAdmin) {
      next();
    } else {
      res.status(401).send("Not authorized as an admin.");
    }
  };
  
 