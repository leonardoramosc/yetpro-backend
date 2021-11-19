import { Router } from "express";
import { checkSchema } from "express-validator";
import {
  createCard,
  deleteOneCard,
  getAllCards,
  getOneCard,
  updateCard,
} from "../controllers/card.controller";
import validator from "../utils/validator";
import cardSchema from "../validators/card.schema";

const cardRouter = Router({ mergeParams: true });

cardRouter
  .route("/")
  .get(getAllCards)
  .post(checkSchema(cardSchema), validator, createCard);

cardRouter
  .route("/:cardId")
  .get(getOneCard)
  .patch(checkSchema(cardSchema), validator, updateCard)
  .delete(deleteOneCard);

export default cardRouter;
