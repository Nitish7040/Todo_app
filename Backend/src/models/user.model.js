import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
         {

            fullName:{
                type:String,
                required:true,
                lowercase: true
            },
            email:{
                type: String,
                required: true,
                unique:true,
                lowercase: true
            },
            username:{
                type:String,
                required:true,
                unique:true,
                lowercase:true
            },
            // avatar:{
            //     type:String,  //cloudinary url
            //     required : true,
            // },
            password:{
                type: String,
                required : [true, 'password is required'],

            }
         },{
            timestamps: true
         }      
)


userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    // check if pass is modified or not.

    this.password = await bcrypt.hash(this.password,8);
    next();
})
// Hashed password before saving in the database.



userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
  }
  // Compare password with the hashed password in the database.
  
  
  userSchema.methods.generateAccessToken = function(){
      return jwt.sign(
          {
              _id: this._id,
              email: this.email,
              username : this.username,
              fullName : this.fullName
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
              expiresIn: process.env.ACCESS_TOKEN_EXPIRY
          }
      )
  }
  // Generate access token for the user.
  
  
  userSchema.methods.generateRefreshToken = function(){
      return jwt.sign(
          {
              _id: this._id
          },
          process.env.REFRESH_TOKEN_SECRET,
          {
              expiresIn: process.env.REFRESH_TOKEN_EXPIRY
          }
      )
  }
  // GENERATE A REFRESH_TOKEN
  




export const User = mongoose.model("User", userSchema);



