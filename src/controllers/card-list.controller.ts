import { NextFunction, Response } from "express";
import db from "../db";
import { UserIdRequest } from "../types/userIdRequest";
import AppError from "../utils/app-error";

export const createCardList = async (
  req: UserIdRequest,
  res: Response,
  next: NextFunction
) => {
  const body = {
    name: req.body.name,
    board_id: req.params.boardId,
  };

  try {
    const cardList = await db("card_lists")
      .insert(body, "*")
      .then((result) => result[0]);

    res.status(201).json({
      status: "success",
      cardList,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllCardList = async (
  req: UserIdRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const cardLists = await db
      .select()
      .from("card_lists")
      .where({ board_id: req.params.boardId });

    res.status(200).json({
      status: "success",
      cardLists,
    });
  } catch (err) {
    next(err);
  }
};

export const getOneCardList = async (
  req: UserIdRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const [cardLists] = await db.select().from("card_lists").where({
      card_list_id: req.params.cardListId,
      board_id: req.params.boardId,
    });

    res.status(200).json({
      status: "success",
      cardLists,
    });
  } catch (err) {
    next(err);
  }
};

export const updateOneCardList = async (
  req: UserIdRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cardListId, boardId } = req.params;
    const [cardList] = await db("card_lists")
      .where({ card_list_id: cardListId, board_id: boardId })
      .update({ name: req.body.name }, "*");

    if (!cardList) {
      return next(
        new AppError(`CardList doesn't exist`, 400)
      );
    }

    res.status(200).json({
      message: 'success',
      cardList
    });

  } catch (err) {
    next(err);
  }
};

export const deleteOneCardList = async (
  req: UserIdRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cardListId, boardId } = req.params;
    const cardList = await db("card_lists")
      .where({ card_list_id: cardListId, board_id: boardId })
      .delete();

    if (!cardList) {
      return next(
        new AppError(`CardList doesn't exist`, 400)
      );
    }

    res.status(204).json({
      message: 'success'
    });
    
  } catch (err) {
    next(err);
  }
};
