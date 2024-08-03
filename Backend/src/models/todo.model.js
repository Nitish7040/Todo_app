import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
      content:{
        type: String,
        required : true
      },
      description:{
        type:String
      },
      createdby:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
      },
      complete:{
        type:Boolean,
        default:false,
      },
      subtodo :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "subtodo"
        } //------------ Array of subtodo
      ]
    },
    {
        timestamps:true
    }
)

export const Todo = mongoose.model("Todo",todoSchema);
