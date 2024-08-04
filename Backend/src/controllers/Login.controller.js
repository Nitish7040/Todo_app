import { asyncHandler } from "../Utils/AsyncHandler.utils.js";
import {ApiError} from "../Utils/apierror.utils.js";
import {User} from "../models/user.model.js";
import { ApiResponce} from "../Utils/ApiResponse.utils.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { logoutUser } from "./Logout.controller.js";

// Generate accessAndRefreshToken
const generateAccessAndRefreshToken = async (userId)=>{
    try {
        const user = await User.findById(userId);
       const accessToken = user.generateAccessToken();
       const refreshToken = user.generateRefreshToken();
  
      user.refreshToken = refreshToken
     await user.save({validateBeforeSave : false})
    
        return{accessToken , refreshToken};
  
  
    } catch (error) {
      throw new ApiError(500,"something went wrong while generating refresh and access token")
    }
  }



// Login controllers

const loginUser = asyncHandler (async (req , res) => {

    const {email , username , password} = req.body
       if (!username && !email) { 
        // {!email for mail and !username for username}
        throw new ApiError(400, "username and email is required")
       }
    
    // User.findOne({username}) 
    const user = await User.findOne({
      $or : [{username} , {email}]
    }) 
    
    
        if (!user) {
          throw new ApiError(404,"user doesnot exits")
        }
    
    
      const isPasswordValid = await user.isPasswordCorrect(password)
    
          if (!isPasswordValid) {
            throw new ApiError(401, "invalid user crenditials")
          }
    
        
        const {accessToken , refreshToken} = await generateAccessAndRefreshToken(user._id);
    
          
        const loggedInUser = await User.findById(user._id).
        select("-password -refreshToken");
    
    
        //send cookie-------------
    
        const options ={
          httpOnly : true ,
          secure : true ,
        }
        return res
        .status(200)
        .cookie("accessToken" ,accessToken , options)
        .cookie("refreshToken" , refreshToken , options)
        .json(
          new ApiResponce(
            200,
            {
              user : loggedInUser , accessToken, refreshToken ,
            },
            "User logged In Sucessfully"
          )
        )
    
    });


    export {loginUser};