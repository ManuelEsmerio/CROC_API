import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../shared/customHandleError.js";

// repositories
import { addDocument, downloadDocument, getAllDocumentsById, getDocumentByType } from "../repositories/user.documents.repositories.js";
import { getUserById } from "../repositories/user.repositories.js";

import {__dirname} from "../app.js";

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

// Add documents by user
const addUserDocumentsController = (async (req, res, next) => {
    let sampleFile;
    let uploadPath;
    try {
        const { userId } = req.params;
        const [userData] = await getUserById(userId);

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        sampleFile = req.files.sampleFile;
        uploadPath = `${__dirname}/doc/${userData.code}/${sampleFile.name}`;


        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(uploadPath, async function(err) {
            if (err) return res.status(500).send(err);

            const request = {
                type: req.body.type,
                path: uploadPath,
                document: sampleFile.name,
                data: req.body.base64,
                id_user: userId
            }

            const result = await addDocument(request);
            res.status(StatusCodes.OK).json(result);
        });

    } catch (error) {
        console.log(error)
        if(error instanceof CustomAPIError){
            res.status(error.statusCode).json({ success: false, message: error.message, stack: error.info });
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message});
        }
    }
});

const downloadDocumentsController = (async (req, res, next) => {
    try {
        const { id_user, type,  } = req.body;
        const [userData] = await downloadDocument(id_user, type);

        if(!userData){
            return res.status(StatusCodes.BAD_REQUEST).send({success: false, message: 'No file found it'});
        }

        res.status(StatusCodes.OK).download(`${userData.path}`)

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
    getUserDocumentsByTypeController,
    addUserDocumentsController,
    downloadDocumentsController
}
