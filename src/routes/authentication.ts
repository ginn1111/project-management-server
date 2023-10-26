import { Router } from "express";
import { forgotPassword, login } from "../controllers/authentication";

const authenticationRouter = Router();

authenticationRouter.post("/login", login);
authenticationRouter.post("/forgot-password", forgotPassword);

export default authenticationRouter;
