import { NextFunction, Request, Response } from "express";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (`${err.statusCode}`.startsWith("5")) {
    console.log(err);
  }
  
  err.message = err.statusCode !== 500 ? err.message : "Something wrent wrong!";

  /**
   * err.code comes from a postgres error instance.
   * postgres error that belongs to class 23 mostly are
   * related to user errors. for more information
   * visit: https://www.postgresql.org/docs/13/errcodes-appendix.html
   */
  if (err.code && `${err.code}`.startsWith("23")) {
    err.statusCode = 400;
    err.message = err.detail;
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
