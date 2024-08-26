import { Router } from "express";

// controllers
import { loginController, logOutController } from "../controllers/auth.controller.js";

// middlewares
import { validateData } from "../middlewares/validationMiddleware.js";
import { verifyToken } from "../middlewares/authJwtMiddleware.js";

// schemas
import { userLoginSchema } from "../schemas/userSchemas.js";

const AuthRouter = Router();

// middleware
AuthRouter.use((req, res, next) => {
    console.log(req.ip);
    next();
});

// login
AuthRouter.post('/login', validateData(userLoginSchema), loginController);

// Protected logout
AuthRouter.get('/logout', verifyToken , logOutController);


export default AuthRouter;