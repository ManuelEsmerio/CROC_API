import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../shared/customHandleError.js";

// Controllers
import { addCompany, deleteCompany, getAllCompanies, getCompanyById, updateCompany } from "../repositories/company.repositories.js";

//  Get all companies controller
const getAllCompanyController = (async (req, res, next) => {
    try {
        const result = await getAllCompanies();
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

// Get company by id
const getCompanyByIdController = (async (req, res, next) => {
    try {
        const { companyId } = req.params;
        const result = await getCompanyById(companyId);
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

// Update company by id
const updateCompanyController = (async (req, res, next) => {
    try {
        const { companyId } = req.params;
        const result = await updateCompany(req.body, companyId);
        res.status(StatusCodes.OK).json({ success: true, message: "Company successfully updated.", data: result });
    } catch (error) {
        console.log(error)
        if(error instanceof CustomAPIError){
            res.status(error.statusCode).json({ success: false, message: error.message, stack: error.info });
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message});
        }
    }
});

// Add company
const addCompanyController = (async (req, res, next) => {
    try {
        const result = await addCompany(req.body);
        res.status(StatusCodes.OK).json({ success: true, message: "Company successfully created.", data: result });
    } catch (error) {
        if(error instanceof CustomAPIError){
            res.status(error.statusCode).json({ success: false, message: error.message, stack: error.info });
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message});
        }
    }
});

// delete by id
const deleteCompanyController = (async (req, res, next) => {
    try {
        const { companyId } = req.params;
        const result = await deleteCompany(companyId);
        if(!result) {
             res.status(StatusCodes.OK).json({ success: false, message: "The company wasn't deleted, please try again.", stack: "Cause: The user was already deleted or was not found in the database" });
        }
        res.status(StatusCodes.OK).json({ success: true, message: "Company successfully deleted." });
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
    getAllCompanyController,
    getCompanyByIdController,
    addCompanyController,
    updateCompanyController,
    deleteCompanyController
}