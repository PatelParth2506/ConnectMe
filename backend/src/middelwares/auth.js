import { ApiError } from "../utils/ApiError.js";
import jwt from 'jsonwebtoken'
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/UserModel.js";


export const auth=asyncHandler(async(req,res,next)=>{
    console.log(req.cookies)
    try {
        const token=req.cookies.AccessToken || req.header("auth").replace("Bearer","");
        if(!token){
            throw new ApiError(402,"Unauthorized Token")
        }

        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        console.log(decodedToken)
        const user=await User.findById(decodedToken._id).select("-password -refreshToken")
        if(!user){
            throw new ApiError(402,"Invalid Token")
        }
        req.user=user;
        next()
    } catch (error) {
        next(new ApiError(404, error.message));
    }
})