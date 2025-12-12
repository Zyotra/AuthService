import dashboardController from "./controllers/auth/dashboardController";
import loginController from "./controllers/auth/loginController";
import registerController from "./controllers/auth/registerController";
import sendOtpController from "./controllers/auth/sendOtpController";
import getAccessTokenController from "./controllers/getAccessTokenController";
import { apiRoute } from "./types/types";

const routes:apiRoute[]=[
    {
        path:"/login",
        method:"post",
        handler:loginController,
        isProtected:false
    },
    {
        path:"/send-otp",
        method:"post",
        handler:sendOtpController,
        isProtected:false
    },
    {
        path:"/register",
        method:"post",
        handler:registerController,
        isProtected:false
    },{
        path:"/dashboard",
        method:"get",
        handler:dashboardController,
        isProtected:true
    },{
        path:"/get-access-token",
        method:"get",
        handler:getAccessTokenController,
        isProtected:false
    }
]
export default routes