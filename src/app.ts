import express, { NextFunction, Request, Response } from 'express';
import errorController from './controllers/error.controller';
import boardRouter from './routes/board.routes';
import userRouter from './routes/user.routes';
import AppError from './utils/app-error';

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/boards", boardRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorController);

export default app;