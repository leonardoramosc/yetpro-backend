import { Router } from "express";
import { checkSchema } from "express-validator";
import authController from "../controllers/auth.controller";
import boardController from "../controllers/board.controller";
import boardSchema from "../schemas/board.schema";
import validator from "../utils/validator";

const boardRouter = Router();

boardRouter.use(authController.protect);

boardRouter
  .route("/")
  .post(checkSchema(boardSchema), validator, boardController.createBoard)
  .get(boardController.getAllBoards);

boardRouter
  .route("/:id")
  .get(boardController.getOneBoard)
  .patch(boardController.updateOneBoard)
  .delete(boardController.deleteOneBoard)

export default boardRouter;
