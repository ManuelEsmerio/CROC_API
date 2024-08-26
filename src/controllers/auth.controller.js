import pkg from 'jsonwebtoken';

import { loginRepository } from "../repositories/auth.repositories.js";
import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../shared/customHandleError.js";

//  loginController
const loginController = (async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await loginRepository({ email, password });
        if (result) {
            // Create JWTs
            const accessToken = pkg.sign(
                {userCode : result.code, userId: result.id},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1y"}
            );
            const refreshToken = pkg.sign(
                {userCode : result.code, userId: result.id},
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '15d' }
            );
            res.cookie("authToken", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: process.env.NODE_ENV === "production" });
            res.status(StatusCodes.OK).json({ success: true, message: 'successful authentication.', accessToken});
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({ success:false,  message: 'Invalid username and/or password.', stack: 'An error occurred while validating your credentials, please verify them and try again.'});
        }
    } catch (error) {
        if(error instanceof CustomAPIError){
            res.status(error.statusCode).json({ success: false, message: error.message, stack: error.info });
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({ error });
        }
    }
});

const logOutController = (async (req, res, next) => {
    try {
        res.clearCookie().status(StatusCodes.OK).json({ success: true, message: "Logged out successfully", stack: "Session closed successfully."});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
});

export {
    loginController,
    logOutController
}