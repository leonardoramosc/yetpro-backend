import { NextFunction, Request, Response, Router } from "express";
import { checkSchema, validationResult } from 'express-validator';
import authController from "../controllers/auth.controller";
import userSchema from "../schemas/user.schema";
import validator from "../utils/validator";

const userRouter = Router();

userRouter.post("/signup", checkSchema(userSchema), validator, authController.signUp);

userRouter.post("/login", authController.signIn);

export default userRouter;