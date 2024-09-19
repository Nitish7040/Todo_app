import { ApiError } from "../utils/apierror.utils.js";
import { asyncHandler } from "../utils/AsyncHandler.utils.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
      // Get token from cookies or Authorization header
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");
  
      // If token is not found, throw an error
      if (!token) {
        throw new ApiError(401, "Unauthorized request: No token provided");
      }
  
      // Log token for debugging
      console.log("Token received:", token);
  
      // Verify the token
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
      // Log decoded token for debugging
      console.log("Decoded token:", decodedToken);
  
      // Find the user in the database
      const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );
  
      // If no user is found, throw an error
      if (!user) {
        throw new ApiError(401, "Invalid Access Token: User not found");
      }
  
      // Attach user to request object
      req.user = user;
      next();
    } catch (error) {
      console.error("JWT verification error:", error.message);
      throw new ApiError(401, error?.message || "Invalid access token");
    }
  });