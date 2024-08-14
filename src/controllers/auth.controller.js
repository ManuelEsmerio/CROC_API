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
                { expiresIn: 4860}
            );
            res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            })
            .status(StatusCodes.OK)
            .json({ success: true, message: 'successful authentication.', token: `${accessToken}`});
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({ success:false,  message: 'Invalid username and/or password.', stack: 'An error occurred while validating your credentials, please verify them and try again.'});
        }
    } catch (error) {
        console.log(error)
        if(error instanceof CustomAPIError){
            res.status(error.statusCode).json({ success: false, message: error.message, stack: error.info });
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({error});
        }
    }
});

export {
    loginController
}