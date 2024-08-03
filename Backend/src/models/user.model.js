import mongoose from "mongoose";
import bcrypt from "bcrypt";

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



export const User = mongoose.model("User", userSchema);
