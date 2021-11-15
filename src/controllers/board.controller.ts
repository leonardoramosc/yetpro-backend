import { NextFunction, Request, Response } from "express";
import db from "../db";
import { UserIdRequest } from "../types/userIdRequest";
import AppError from "../utils/app-error";

const createBoard = async (req: UserIdRequest, res: Response, next: NextFunction) => {
  const { board_name } = req.body;
  const user_id = req.userId;

  try {

    const board = await db('boards').insert({ board_name, user_id}, "*").then(result => result[0]);

    res.status(201).json({
      status: 'success',
      board
    })

  } catch (err) {
    next(err);
  }
};

const getAllBoards = async (req: UserIdRequest, res: Response, next: NextFunction) => {
  try {
    const boards = await db('boards').where({user_id: req.userId}).select();

    res.status(200).json({
      status: 'success',
      boards
    });

  } catch(err) {
    next(err);
  }
}

const getOneBoard = async (req: UserIdRequest, res: Response, next: NextFunction) => {

  const filter: any = { user_id: req.userId, board_id: req.params.id };

  try {

    const [board] = await db('boards').where(filter);

    res.status(200).json({
      status: 'success',
      board: board || null
    });

  } catch(err) {
    next(err);
  }
}

const updateOneBoard = async (req: UserIdRequest, res: Response, next: NextFunction) => {

  const filter: any = { user_id: req.userId, board_id: req.params.id };

  try {

    const [board] = await db('boards').where(filter).update({board_name: req.body.board_name}, "*");

    if (!board) {
      return next(new AppError(`You don't have a board with ID ${req.params.id}`, 400));
    }

    res.status(200).json({
      status: 'success',
      board: board || null
    });

  } catch(err) {
    next(err);
  }
}

const deleteOneBoard = async (req: UserIdRequest, res: Response, next: NextFunction) => {

  const filter: any = { user_id: req.userId, board_id: req.params.id };

  try {

    const board = await db('boards').where(filter).delete();

    if (!board) {
      return next(new AppError(`You don't have a board with ID ${req.params.id}`, 400));
    }

    res.status(204).json({
      status: 'success',
    });

  } catch(err) {
    next(err);
  }
}

export default {
  createBoard,
  getAllBoards,
  getOneBoard,
  updateOneBoard,
  deleteOneBoard
}
