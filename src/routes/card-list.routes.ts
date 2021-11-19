import { Router } from "express";
import { checkSchema } from "express-validator";
import validator from "../utils/validator";
import cardListSchema from "../validators/card-list.schema";
import { createCardList, deleteOneCardList, getAllCardList, getOneCardList, updateOneCardList } from "../controllers/card-list.controller";
import cardRouter from "./card.routes";

const cardListRouter = Router({ mergeParams: true });

cardListRouter.use(`/:cardListId/cards`, cardRouter);

cardListRouter
  .route("/")
  .get(getAllCardList)
  .post(checkSchema(cardListSchema), validator, createCardList);

cardListRouter
  .route("/:cardListId")
  .get(getOneCardList)
  .patch(checkSchema(cardListSchema), updateOneCardList)
  .delete(deleteOneCardList)

export default cardListRouter;
