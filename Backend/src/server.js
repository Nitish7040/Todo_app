import express from 'express'; // this is a module js for this add module in type
import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/db.index.js";

// const app = express();


dotenv.config({
    path: './.env'
})

connectDB()
.then(() =>{

app.get('/',(req ,res) =>{
    res.send('server is online');
})

app.get('/api',(req,res) => {
    const nitish = ("hello")
    res.send('nitish');
})

app.on("error",(error) => {
    console.log("error",error)  // it may be neglated
    throw error
})


const port = process.env.PORT || 4000 ;

app.listen(process.env.PORT || 8000 , () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
  });
})
.catch((err) => {
    console.log("Mongo_DB coneection failed !!",err);
})