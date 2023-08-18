import { Request, Response } from "express";

export interface IRequestWithRole extends Request {
  id?: string;
  role?: string;
}

export interface IStatusResponse extends Response {
  statusCode: number;
}

export type TError = {
  statusCode: number;
  message: string;
  name?: string;
  stack?: string;
};
