import { NextFunction, Response } from "express";
import db from "../db";
import { UserIdRequest } from "../types/userIdRequest";
import AppError from "../utils/app-error";

export const createCard = async (
  req: UserIdRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = {
      card_list_id: req.params.cardListId,
      name: req.body.name,
    };

    const card = await db("cards")
      .insert(body, "*")
      .then((result) => result[0]);

    res.status(201).json({
      status: "success",
      card,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllCards = async (
  req: UserIdRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const cards = await db("cards").where({
      card_list_id: req.params.cardListId,
    });

    res.status(200).json({
      status: "success",
      cards,
    });
  } catch (err) {
    next(err);
  }
};

export const getOneCard = async (
  req: UserIdRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const card = await db("cards").where({
      card_list_id: req.params.cardListId,
      card_id: req.params.cardId,
    }).then(result => result[0]);

    res.status(200).json({
      status: "success",
      card,
    });
  } catch (err) {
    next(err);
  }
};

export const updateCard = async (
  req: UserIdRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cardListId: card_list_id, cardId: card_id } = req.params;

    const body = {
      name: req.body.name,
    };

    const card = await db("cards")
      .where({ card_list_id, card_id })
      .update(body, "*")
      .then((result) => result[0]);

    if (!card) {
      return next(
        new AppError(`The card with Id(${card_id}): doesn't exist`, 400)
      );
    }

    res.status(200).json({
      status: "success",
      card,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteOneCard = async (
  req: UserIdRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await db("cards").where({
      card_list_id: req.params.cardListId,
      card_id: req.params.cardId,
    }).delete();

    if (result === 0) {
      return next(new AppError(`Card with id(${req.params.cardId}): doesn't exist`, 400));
    }

    res.status(204).json({
      status: "success"
    });
  } catch (err) {
    next(err);
  }
};
