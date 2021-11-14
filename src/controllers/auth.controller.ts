import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from "../db";
import AppError from "../utils/app-error";


const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { first_name, last_name, email } = req.body;

  const password = await _encryptPassword(req.body.password);

  console.log(password);

  const userToInsert = { first_name, last_name, email, password };

  try {
    const user = await db("users").insert(userToInsert, "*").then(result => result[0]);

    res.status(201).json({
      status: "success",
      user,
    });
  } catch (err: any) {
    next(err);
  }
};

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Invalid email or password', 400));
  }

  try {

    const [user] = await db("users").where({ email }).select();

    if (!user) {
      return next(new AppError("Invalid email or password", 400));
    }

    const isPasswordCorrect = await _checkPassword(password, user.password);

    if (!isPasswordCorrect) {
      return next(new AppError("Invalid Email or password", 400));
    }

    const jwt = _signToken(user.id);

    res.status(200).json({
      status: 'success',
      jwt
    })

  } catch(err) {
    return next(err);
  }
};

const _encryptPassword = (password: string) => {
  return bcrypt.hash(password, 12);
}

const _checkPassword = (incomingPass: string, userActualPass: string) => {
  return bcrypt.compare(incomingPass, userActualPass);
}

const _signToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string);
}

export default {
  signUp,
  signIn
};
