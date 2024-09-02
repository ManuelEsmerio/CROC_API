import pkg from 'jsonwebtoken';

import generator from 'generate-password';

import { loginRepository, resetPassword } from "../repositories/auth.repositories.js";
import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../shared/customHandleError.js";
import { getUserByEmail } from '../repositories/user.repositories.js';
import { mailData, transporter } from '../configs/emailerConfig.js';
import { templateResetPassword } from '../templates/templateResetPassword.js';

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
            res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message});
        }
    }
});

// Reset Password
const resetPasswordController = (async (req, res, next) => {
    try {
        const { email } = req.body;
        const [result] = await getUserByEmail(email);
        if (!result) throw new CustomAPIError("Invalid email.", StatusCodes.BAD_REQUEST, "Incorrect email, please verify your email and try again.");

        // generate new password
        const temporalPassword = generator.generate({ length: 10, numbers: true });

        // change password
        const data = await resetPassword(temporalPassword, result.id);
        console.log('data: ', data)
         if(!data) throw new CustomAPIError("Your password wasn't changed, please try again.", StatusCodes.INTERNAL_SERVER_ERROR, "Error occurs trying to change your password.");

        // Send email with the new password
        transporter.sendMail(mailData({
            to: result.email,   // list of receivers
            subject: 'Reset password',
            html: templateResetPassword(temporalPassword, `${result.name} ${result.lastname}`),
        }), (error, info) => {
            if(error) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);

            res.status(StatusCodes.OK).json({ success: true, message: info.messageId });
        })
    } catch (error) {
        console.log(error)
        if(error instanceof CustomAPIError){
            res.status(error.statusCode).json({ success: false, message: error.message, stack: error.info });
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({ success:false, message: error.message });
        }
    }
})

// Logout
const logOutController = (async (req, res, next) => {
    try {
        res.clearCookie().status(StatusCodes.OK).json({ success: true, message: "Logged out successfully", stack: "Session closed successfully."});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message});
    }
});

export {
    loginController,
    logOutController,
    resetPasswordController
}