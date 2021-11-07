import { NextFunction, Request, Response } from "express";
import db from "../db";
import AppError from "../utils/app-error";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;

  try {
    const user = await db("users").insert(body, "*").then(result => result[0]);

    res.status(201).json({
      status: "success",
      user,
    });
  } catch (err: any) {
    next(err);
  }
};

export default {
  signUp,
};
