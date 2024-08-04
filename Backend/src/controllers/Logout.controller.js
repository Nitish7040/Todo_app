import { asyncHandler } from "../Utils/AsyncHandler.utils.js";
import {ApiError} from "../Utils/apierror.utils.js";
import {User} from "../models/user.model.js";
import { ApiResponce} from "../Utils/ApiResponse.utils.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { loginUser } from "./Login.controller.js";




// logout controller

const logoutUser = asyncHandler (async(req ,res) => {
    User.findByIdAndUpdate(
      req.user._id,
      {
        $unset :{
          refreshToken : 1
        }
      },
      {
        new : true
      }
    )
    const options ={
      httpOnly :true ,
      secure : true
    }
  return res 
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(new ApiResponce(200,{},"User Loggrd Out !!"))
})


const refreshAccessToken = asyncHandler(async (req ,res ) => {
const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

 if (!incomingRefreshToken) {
  throw new ApiError(401, "unauthorized request")
 }


try {
 const decodedToken = jwt.verify(
   incomingRefreshToken,
   process.env.REFRESH_TOKEN_SECRET
 )

const user = await User.findById(decodedToken?._id);
  
if (!user) {
 throw new ApiError(401, "Invalid refresh Token")
}


if (incomingRefreshToken!== user?.refreshToken) {
 throw new ApiError(401, "Refreshed token is expired or used")
}


const options={
 httpOnly :true ,
 secure : true,
}

const {accessToken , newrefreshToken} = await generateAccessAndRefreshToken(user._id);

return res
.status(200)
.cookie("accessToken", accessToken , options)
.cookie("refreshToken", newrefreshToken ,options)
.json(
new ApiResponce(
 200,
 {
   accessToken, refreshToken: newrefreshToken 
 },
 "Access token refreshed"

)
)
} catch (error) {
throw new ApiError (401, error?.message || "Invalid refresh token")
}


})

export{logoutUser};