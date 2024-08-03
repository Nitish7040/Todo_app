import mongoose from "mongoose";

const subtudoschema = new mongoose.Schema(
    {
        content:{
            type:String,
            required: true,

        },
        complete:{
            type:Boolean,
            default: false
        },
        createdby :{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    },
    {timestamp:true}
)

export const subtodo = mongoose.model("subtodo",subtudoschema);
