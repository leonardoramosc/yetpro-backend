import { Router } from "express";
import { checkSchema } from "express-validator";
import authController from "../controllers/auth.controller";
import { createCard } from "../controllers/card.controller";
import validator from "../utils/validator";
import cardSchema from "../validators/card.schema";

const cardRouter = Router({ mergeParams: true });

cardRouter.route("/").post(checkSchema(cardSchema), validator, createCard);

export default cardRouter;