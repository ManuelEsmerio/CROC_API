import { Router } from "express";

// controllers
import { addCompanyController, deleteCompanyController, getAllCompanyController, getCompanyByIdController, updateCompanyController } from "../controllers/company.controller.js";

// middlewares
import { verifyToken } from "../middlewares/authJwtMiddleware.js";

// schemas
// import { getUserByIdSchema } from "../schemas/userSchemas.js";


const CompanyRouter = Router();

// middleware validate JWT
CompanyRouter.use(verifyToken);

// Get all company
CompanyRouter.get("/getAllCompanies", getAllCompanyController);

// Get company by id
CompanyRouter.get("/getCompanyById/:companyId" ,getCompanyByIdController);

// Update company by id
CompanyRouter.put("/updateCompany/:companyId" ,updateCompanyController);

// Add company
CompanyRouter.post("/addCompany/" ,addCompanyController);

// delete company
CompanyRouter.put("/deleteCompany/:companyId" ,deleteCompanyController);


export default CompanyRouter;