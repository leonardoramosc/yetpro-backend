import { Router } from "express";
import { checkSchema } from "express-validator";
import authController from "../controllers/auth.controller";
import validator from "../utils/validator";
import cardListSchema from "../validators/card-list.schema";
import { createCardList } from "../controllers/card-list.controller";

const cardListRouter = Router({ mergeParams: true });

cardListRouter.use(authController.protect);

cardListRouter
  .route("/")
  .post(checkSchema(cardListSchema), validator, createCardList);

// cardListRouter
//   .route("/")
//   .post(checkSchema(boardSchema), validator, boardController.createBoard)
//   .get(boardController.getAllBoards);

// cardListRouter
//   .route("/:id")
//   .get(boardController.getOneBoard)
//   .patch(boardController.updateOneBoard)
//   .delete(boardController.deleteOneBoard)

export default cardListRouter;
