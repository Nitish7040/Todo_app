// cloudinary.js

import {v2 as cloudinary} from "cloudinary"
import fs from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
     // Click 'View Credentials' below to copy your API secret
});


//  File upload on cloudinary


const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null
        // upload the file on cloudinary
       const responce = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
    // file has been uploaded
    // console.log("file is uploaded on cloudinary",
    // responce.url);

    // remove the locally saved temporary file
    fs.unlinkSync(localFilePath);
    return responce;

    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error.message);
        // remove the locally saved temporary file as the upload operation got failed
        if (fs.existsSync(localFilePath)) {
          fs.unlinkSync(localFilePath);
        }
        return null;
      }
    };

export {uploadOnCloudinary};









