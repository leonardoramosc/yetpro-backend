import { Router } from "express";
import { checkSchema } from 'express-validator';
import authController from "../controllers/auth.controller";
import userSchema from "../validators/user.schema";
import validator from "../utils/validator";

const userRouter = Router();

userRouter.post("/signup", checkSchema(userSchema), validator, authController.signUp);

userRouter.post("/login", authController.signIn);

export default userRouter;