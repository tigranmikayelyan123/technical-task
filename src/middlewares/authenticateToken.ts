import * as jwt from "jsonwebtoken";
import { NextFunction } from "express";
import { Response } from "express";
import { Request } from "express";

export interface CustomRequest extends Request {
  user: any;
  fileValidationError: string;
}

export function authenticateToken(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
