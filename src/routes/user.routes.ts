import { NextFunction, Request, Response, Router } from "express";
import { checkSchema, validationResult } from 'express-validator';
import authController from "../controllers/auth.controller";
import userSchema from "../schemas/user.schema";

const userRouter = Router();

const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  next();
}

userRouter.post("/signup", checkSchema(userSchema), validator, authController.signUp);

export default userRouter;