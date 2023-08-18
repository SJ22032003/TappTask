import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { IRequestWithRole } from "../types/network.type";
import { getUserDataService } from "../services/user.service";

const protect = async ( req: IRequestWithRole, res: Response, next: NextFunction ) => {
  let token = "";
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
      if (typeof decoded === "string") {
        return res.status(401).json({ message: "Not authorized, token failed" }).end();
      }

      // Getting the Admin Type
      const { id, role } = decoded.user;
      req.id = id;
      req.role = role;
      if (req.id) {
        const queryMap = { conditions: { _id: req.id }, attributes: { _id: 1 } };
        const userData = await getUserDataService(queryMap);
        if (!userData) {
          res.statusCode = 404;
          throw new Error("User not found");
        }
      } else {
        res.statusCode = 404;
        throw new Error("No user id found");
      }
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Not authorized, token failed" })
        .end();
    }
  }
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" }).end();
  }
  next();
};

export default protect;
