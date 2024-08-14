import { Router } from "express";

// controllers
import { loginController } from "../controllers/auth.controller.js";

// middlewares
import { validateData } from "../middlewares/validationMiddleware.js";

// schemas
import { userLoginSchema } from "../schemas/userSchemas.js";

const AuthRouter = Router();

// middleware
AuthRouter.use((req, res, next) => {
    console.log(req.ip);
    next();
});

AuthRouter.post('/login', validateData(userLoginSchema), loginController);

export default AuthRouter;