import { Router } from "express";
import { checkSchema, param } from "express-validator";
import authController from "../controllers/auth.controller";
import boardController from "../controllers/board.controller";
import boardSchema from "../validators/board.schema";
import validator from "../utils/validator";
import cardListRouter from "./card-list.routes";
import { checkBoardIdParam } from "../validators/checkBoardIdParam";

const boardRouter = Router();

boardRouter.use(authController.protect);

boardRouter.use(
  "/:boardId/card-lists",
  checkBoardIdParam,
  validator,
  cardListRouter
);

boardRouter
  .route("/")
  .post(checkSchema(boardSchema), validator, boardController.createBoard)
  .get(boardController.getAllBoards);

boardRouter
  .route("/:id")
  .get(boardController.getOneBoard)
  .patch(boardController.updateOneBoard)
  .delete(boardController.deleteOneBoard);

export default boardRouter;
