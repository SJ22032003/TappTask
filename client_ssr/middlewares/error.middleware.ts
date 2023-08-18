import { Request, NextFunction } from "express";
import { TError, IStatusResponse } from "@/types/network.type";

const environment = process.env.NODE_ENV || "development";

const errorHandler = (
  err: TError,
  req: Request,
  res: IStatusResponse,
  next: NextFunction
) => {
  let status: number = Number(res.statusCode) === 200 ? 500 : res.statusCode;
  console.warn(`Failed\nurl = ${req.url}\nmethod = ${req.method}\nmessage = ${err.message}`);
  res.status(status).json({
    status: "error",
    message: err.message || "Something went wrong",
    stack: environment !== "production" ? err.stack : undefined,
  });
};

export default errorHandler;
