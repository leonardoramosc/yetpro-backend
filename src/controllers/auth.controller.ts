import { Request, Response } from "express";
import db from "../db";

const signUp = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const user = await db("users").insert(body, "*").then(result => result[0]);

    res.status(201).json({
      status: "success",
      user,
    });
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({
      status: "fail",
      message: "Unable to create user.",
    });
  }
};

export default {
  signUp,
};
