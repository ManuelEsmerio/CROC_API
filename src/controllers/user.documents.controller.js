import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../shared/customHandleError.js";

// repositories
import { getAllDocumentsById, getDocumentByType } from "../repositories/user.documents.repositories.js";


//  Get all documents controller
const getAllUserDocumentsController = (async (req, res, next) => {
    try {
        const { userId } = req.params;
        const result = await getAllDocumentsById(userId);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        console.log(error)
        if(error instanceof CustomAPIError){
            res.status(error.statusCode).json({ success: false, message: error.message, stack: error.info });
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message});
        }
    }
});

// Get documents by type
const getUserDocumentsByTypeController = (async (req, res, next) => {
    try {
        const { userId, type } = req.params;
        const result = await getDocumentByType(userId, type);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        console.log(error)
        if(error instanceof CustomAPIError){
            res.status(error.statusCode).json({ success: false, message: error.message, stack: error.info });
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message});
        }
    }
});

export {
    getAllUserDocumentsController,
    getUserDocumentsByTypeController
}
