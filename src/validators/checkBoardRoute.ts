import { param } from "express-validator";
import { requestParams } from "../constants/request-params";
import db from "../db";

// Chequea que el parametro boardId y cardListId sean validos y que el usuario
// que quiera acceder a este cardList o boardId, efectivamente sea dueño del mismo
export const checkAllBoardParams = param([requestParams.BOARD_ID])
  .exists()
  .toInt()
  .isNumeric()
  .custom(async (boardId, { req, path }) => {
    if (req.params && req.params[requestParams.CARD_LIST_ID]) {
      return handleCardListParam(req, path);
    }

    return handleOnlyBoardIdParam(req, boardId);
  });

const handleCardListParam = async (req: any, path: string) => {
  try {
    const { boardId, cardListId } = req.params as any;

    const [cardList] = await db
      .from("card_lists")
      .innerJoin("boards", "card_lists.board_id", "boards.board_id")
      .where({
        "boards.board_id": boardId,
        "card_lists.card_list_id": cardListId,
        "boards.user_id": req.userId,
      });

    if (!cardList) {
      throw new Error(`This resource doesn't exists`);
    }

    return true;
  } catch (err) {
    throw err;
  }
};

const handleOnlyBoardIdParam = async (req: any, boardId: number) => {
  try {
    const [board] = await db("boards")
      .where({ board_id: boardId, user_id: req.userId })
      .select();

    if (!board) {
      throw new Error(`This resource doesn't exists`);
    }

    return true;
  } catch (err) {
    throw err;
  }
};
