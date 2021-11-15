import { NextFunction, Response } from "express";
import db from "../db";
import { UserIdRequest } from "../types/userIdRequest";
import AppError from "../utils/app-error";

export const createCardList = async (req: UserIdRequest, res: Response, next: NextFunction) => {
  const body = {
    name: req.body.name,
    board_id: req.params.boardId
  }

  try {
    const cardList = await db("card_lists").insert(body, "*").then(result => result[0]);

    res.status(201).json({
      status: 'success',
      cardList,
    });
  } catch (err) {
    next(err);
  }
}