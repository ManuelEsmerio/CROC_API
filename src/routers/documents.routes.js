import { Router } from "express";

// Controllers
import { getAllUserDocumentsController, getUserDocumentsByTypeController } from "../controllers/user.documents.controller.js";

import { verifyToken } from "../middlewares/authJwtMiddleware.js";

const DocumentRouter = Router();

// middleware validate JWT
DocumentRouter.use(verifyToken);

// Get all documents by id
DocumentRouter.get("/getAllDocumentsById/:userId", getAllUserDocumentsController);

// Get documents by id and type
DocumentRouter.get("/geDocumentsByType/:userId/:type" ,getUserDocumentsByTypeController);

export default DocumentRouter;