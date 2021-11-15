import { param } from "express-validator";
import db from "../db";

export const checkBoardIdParam = param("boardId").exists().toInt().isNumeric().custom(async (boardId, { req }) => {
  try {
    console.log(req.userId);
    const [board] = await db("boards").where({board_id: boardId, user_id: req.userId}).select();

    if (!board) {
      throw new Error(`Board with ID: ${boardId}: doesn't exists`);
    }
  } catch(err) {
    throw err;
  }
});
