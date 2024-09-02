import { Router } from "express";

// controllers
import { addUserController, deleteUserController, getAllUserController, getUserByIdController, updateUserController } from "../controllers/user.controller.js";

// middlewares
import { validateData } from "../middlewares/validationMiddleware.js";
import { verifyToken } from "../middlewares/authJwtMiddleware.js";

// schemas
import { userSchema } from "../schemas/userSchemas.js";


const UserRouter = Router();

// middleware validate JWT
UserRouter.use(verifyToken);

// Get all users
UserRouter.get("/getAllUsers", getAllUserController);

// Get user by id
UserRouter.get("/getUserById/:userId" ,getUserByIdController);

// Update user by id
UserRouter.put("/updateUser/:userId", validateData(userSchema) ,updateUserController);

// Add user
UserRouter.post("/addUser/", validateData(userSchema) ,addUserController);

// Add user
UserRouter.put("/deleteUser/:userId" ,deleteUserController);


export default UserRouter;