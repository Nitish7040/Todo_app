// app.js 
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import userRouter from "./routes/user.routes.js";

import { upload } from "./middlewares/multer.middleware.js";
import { registerUser } from "./controllers/Register.controller.js";

dotenv.config({
    path: './.env'
});

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:4000", // Use the environment variable or fallback to localhost:3000
    credentials: true
}));
//configuration of cors library for ors origin error.



app.use(express.json({limit:"16kb"})) 
//accept json with limit in express app

 
app.use(express.urlencoded({extended:true,limit:"16kb"})) 
// url-encoded in the express


app.use(express.static("public")) 
// used for stord public files on server and acess can anyone.

app.use(cookieParser());
//used for acess and set cookies {do CURD operation}




// Routes --------------------------
import userRouter from "./routes/user.routes.js";


//routes declaration______________________
app.use("/api/v1/users", userRouter);

// http://localhost:8000/api/v1/users/register

// Apply the middleware to the route
app.post('/register', upload.fields([{ name: 'avatar', maxCount: 1 }]), registerUser);


export{ app };
             