import { Router } from "express";
import {registerUser} from "../controllers/Register.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import {loginUser} from "../controllers/Login.controller.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";
import { logoutUser } from "../controllers/Logout.controller.js";
const router = Router();

// routes for register........
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    registerUser
)

//routes for login 
router.route("/login").post(loginUser)

// routes for logout
router.route("/logout").post(verifyJWT , logoutUser)

export default  router;