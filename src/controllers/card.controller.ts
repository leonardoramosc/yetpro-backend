import { NextFunction, Response } from "express";
import db from "../db";
import { UserIdRequest } from "../types/userIdRequest";
import AppError from "../utils/app-error";

export const createCard = async (req: UserIdRequest, res: Response, next: NextFunction) => {
  try {

    const body = {
      card_list_id: req.params.cardListId,
      name: req.body.name
    }

    // const card = await db("cards").insert(body, "*").then(result => result[0]);
    const card= {}

    res.status(201).json({
      status: 'success',
      card
    })

  } catch (err) {
    next(err);
  }
}