import { Request, Response, NextFunction } from 'express';

type expressMiddleare = (req: Request, res: Response, next: NextFunction) => any;

export default (fn: expressMiddleare) => (req: Request, res: Response, next: NextFunction) => {
  fn(req, res, next).catch(next);
}; 