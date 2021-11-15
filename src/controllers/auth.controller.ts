import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import db from "../db";
import AppError from "../utils/app-error";
import { UserIdRequest } from "../types/userIdRequest";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { first_name, last_name, email } = req.body;

  const password = await _encryptPassword(req.body.password);

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

    const jwt = _signToken(user.user_id);

    res.status(200).json({
      status: 'success',
      jwt
    })

  } catch(err) {
    return next(err);
  }
};

const protect = async (req: UserIdRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new AppError("Invalid token", 401));
  }

  const unauthorizedError = new AppError("You're not authorized to access this route", 401);

  try {
    const token = authorization.split(' ')[1];

    const decodedToken = await _decodeToken(token);

    if (!decodedToken.userId) {
      return next(unauthorizedError);
    }

    // check if the user in the token exist
    const [user] = await db("users").where({ user_id: decodedToken.userId }).select();

    if (!user) {
      return next(unauthorizedError);
    }

    req.userId = user.user_id;
  
    next();
  } catch(err: any) {
    if (err instanceof JsonWebTokenError) {
      return next(unauthorizedError);
    }
    next(err);
  }
}

const _encryptPassword = (password: string) => {
  return bcrypt.hash(password, 12);
}

const _checkPassword = (incomingPass: string, userActualPass: string) => {
  return bcrypt.compare(incomingPass, userActualPass);
}

const _signToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string);
}

const _decodeToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, payload) => {
      if (err) return reject(err);

      return resolve(payload);
    });
  });
} 

export default {
  signUp,
  signIn,
  protect
};
