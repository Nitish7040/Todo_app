import { asyncHandler } from "../Utils/AsyncHandler.utils.js";
import {ApiError} from "../Utils/apierror.utils.js";
import {User} from "../models/user.model.js";
import { ApiResponce} from "../Utils/ApiResponse.utils.js";
import {uploadOnCloudinary} from "../Utils/cloudinary.utils.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const registerUser = asyncHandler(async(req,res) => {

   const {fullName, email,  username, password} = req.body

   if ([fullName, email , username, password].some((field) => field?.trim() ==="")) {
      
     throw new ApiError(400, "all filed are required")
   }

const existedUser = await User.findOne({
    $or :[{username}, {email}],
})
   if (existedUser) {
    
        throw new ApiError(400, "user with email or username already exits")
   }

   const avatarLocalPath = req.files?.avatar?.[0]?.path;
    // console.log("req.files:", req.files);
 
    if (!avatarLocalPath) {
        throw new ApiError (400,"avatar file is required")
      }
    
    
      const avatar =  await uploadOnCloudinary(avatarLocalPath) ;



      if (!avatar) {
        throw new ApiError (400,"avatar file is not upload on cloudinary")
      }
    

      const user = await User.create({
        fullName,
        avatar : avatar.url,
        email ,
        password,
        username : username.toLowerCase()
      })
    
      const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
      )
    
    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering the user")
    }
    
    
    return res.status(201).json(
        new ApiResponce(200, createdUser , "User register sucessfully !!")
    )

})
 export {registerUser};