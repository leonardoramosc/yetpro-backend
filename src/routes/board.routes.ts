import { Router } from "express";
import { checkSchema } from 'express-validator';
import boardController from "../controllers/board.controller";
import boardSchema from "../schemas/board.schema";
import validator from "../utils/validator";

const boardRouter = Router();

boardRouter.post("/", checkSchema(boardSchema), validator, boardController.createBoard);

export default boardRouter;