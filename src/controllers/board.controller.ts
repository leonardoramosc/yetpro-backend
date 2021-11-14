import { NextFunction, Request, Response } from "express";
import db from "../db";

const createBoard = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;

  try {

    const board = await db('boards').insert(body, "*").then(result => result[0]);

    res.status(201).json({
      status: 'success',
      board
    })

  } catch (err) {
    next(err);
  }
};

export default {
  createBoard
}
