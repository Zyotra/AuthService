import Elysia, { Context } from "elysia";
import { verifyAccessToken } from "../jwt/verifyTokens";
import { StatusCode } from "../types/types";

const checkAuth = new Elysia().derive(async ({ headers, set,cookie }: Context) => {
    const authHeader=headers['authorization'];
    var token:string="";
    if(authHeader){
        token=authHeader.split(' ')[1];
    }else{
        token=cookie.refreshToken.value as string;
    }
    if(!token){
        set.status = StatusCode.UNAUTHORIZED
        return {
            message: "No token provided"
        }
    }
    console.log("Verifying token:", token);
    const isValid = await verifyAccessToken(token)
    console.log("Token verification result:", isValid);
    if (!isValid) {
        set.status = StatusCode.EXPIRED_TOKEN
        return {
            message: "Invalid Access Token"
        }
    }
    console.log("Authenticated user:", isValid);
    return {
        userId: isValid.userId
    }
}).as("scoped")

const checkAuthPlugin = new Elysia()
    .use(checkAuth)
    .guard({
        beforeHandle: async ({ userId, set }:Context | any) => {
            if(!userId){
                set.status = StatusCode.UNAUTHORIZED
                return {
                    message: "Unauthorized"
                }
            }
        }
    }).as("scoped")
    export default checkAuthPlugin;