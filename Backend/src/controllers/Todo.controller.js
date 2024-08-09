import { asyncHandler } from "../Utils/AsyncHandler.utils.js";
import {ApiError} from "../Utils/apierror.utils.js";
import {Todo} from "../models/todo.model.js";
import {ApiResponce } from "../utils/ApiResponse.utils.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {User} from "../models/user.model.js";

const todocontroller = asyncHandler(async (req, res) => {
    const { content, description, deadline } = req.body;
    const userId = req.user._id;
  
    if (!content || !deadline) {
      throw new ApiError(400, "Content and deadline are required");
    }
  
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
  
    // Create a new Todo item
    const todo = new Todo({
      content,
      description,
      deadline,
      user: userId
    });
  
    // Save the Todo item to the database
    await todo.save();
  
    return res
    .status(201)
    .json(
      new ApiResponce(
        201,
       todo, "Todo item created successfully"));
});

  
  export { todocontroller };
