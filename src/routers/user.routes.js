import { Router } from "express";

// controllers
import { addUserController, deleteUserController, getAllUserController, getUserByIdController, updateUserController } from "../controllers/user.controller.js";

// middlewares
import { verifyToken } from "../middlewares/authJwtMiddleware.js";

// schemas
// import { getUserByIdSchema } from "../schemas/userSchemas.js";


const UserRouter = Router();

// middleware validate JWT
UserRouter.use(verifyToken);

// Get all users
UserRouter.get("/getAllUsers", getAllUserController);

// Get user by id
UserRouter.get("/getUserById/:userId" ,getUserByIdController);

// Update user by id
UserRouter.put("/updateUser/:userId" ,updateUserController);

// Add user
UserRouter.post("/addUser/" ,addUserController);

// Add user
UserRouter.put("/deleteUser/:userId" ,deleteUserController);


export default UserRouter;