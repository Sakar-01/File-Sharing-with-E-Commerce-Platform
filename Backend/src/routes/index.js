import {Router} from "express";
import userRoutes from "./users-routes.js";
import fileRoutes from "./file-routes.js";

const appRouter = Router();

appRouter.use("/user", userRoutes); //domain/api/v1/user
appRouter.use("/file", fileRoutes); //domain/api/v1/user

export default appRouter;