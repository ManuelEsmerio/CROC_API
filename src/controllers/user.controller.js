import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../shared/customHandleError.js";
import { addUser, deleteUser, getAllUsers, getUserById, updateUser } from "../repositories/user.repositories.js";

//  Get all users controller
const getAllUserController = (async (req, res, next) => {
    try {
        const result = await getAllUsers();
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        if(error instanceof CustomAPIError){
            res.status(error.statusCode).json({ success: false, message: error.message, stack: error.info });
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({ error });
        }
    }
});

// Get user by id
const getUserByIdController = (async (req, res, next) => {
    try {
        const { userId } = req.params;
        const result = await getUserById(userId);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        console.log(error)
        if(error instanceof CustomAPIError){
            res.status(error.statusCode).json({ success: false, message: error.message, stack: error.info });
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({ error });
        }
    }
});

const getUserByEmailController = (async (req, res, next) => {
    try {
        const { email } = req.body;
        const result = await getUserByEmail(email);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        console.log(error)
        if(error instanceof CustomAPIError){
            res.status(error.statusCode).json({ success: false, message: error.message, stack: error.info });
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({ error });
        }
    }
});

// Update user by id
const updateUserController = (async (req, res, next) => {
    try {
        const { userId } = req.params;
        const result = await updateUser(req.body, userId);
        res.status(StatusCodes.OK).json({ success: true, message: "User successfully updated.", data: result });
    } catch (error) {
        console.log(error)
        if(error instanceof CustomAPIError){
            res.status(error.statusCode).json({ success: false, message: error.message, stack: error.info });
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({ error });
        }
    }
});

// Add user
const addUserController = (async (req, res, next) => {
    try {
        const result = await addUser(req.body);
        res.status(StatusCodes.OK).json({ success: true, message: "User successfully created.", data: result });
    } catch (error) {
        if(error instanceof CustomAPIError){
            res.status(error.statusCode).json({ success: false, message: error.message, stack: error.info });
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({ error });
        }
    }
});

// Update user by id
const deleteUserController = (async (req, res, next) => {
    try {
        const { userId } = req.params;
        const result = await deleteUser(userId);
        if(!result) {
             res.status(StatusCodes.OK).json({ success: false, message: "The user wasn't deleted, please try again.", stack: "Cause: The user was already deleted or was not found in the database" });
        }
        res.status(StatusCodes.OK).json({ success: true, message: "User successfully deleted." });
    } catch (error) {
        console.log(error)
        if(error instanceof CustomAPIError){
            res.status(error.statusCode).json({ success: false, message: error.message, stack: error.info });
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({ error });
        }
    }
});


export {
    getAllUserController,
    getUserByIdController,
    addUserController,
    updateUserController,
    deleteUserController,
    getUserByEmailController
}