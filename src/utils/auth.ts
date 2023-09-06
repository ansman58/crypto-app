import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import { getEnv } from "./general";
import { HTTP_STATUS_CODES } from "../constants";

export class Authorize {
  static async generateToken(req: Request, res: Response) {
    const { email } = req.body;
    try {
      const user = await User.findOne({ where: { email } });

      const token = jwt.sign({ id: user?.id }, getEnv("JWT_SECRET") as string, {
        expiresIn: getEnv("JWT_EXPIRES_IN"),
      });

      return token;
    } catch (error) {
      res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({ error });
    }
  }

  static isVeryfied(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.headers.authorization;

      if (authorization) {
        const token = authorization?.split(" ")[1]; //"Bearer XXXXXXXXXXXXXXXXXX"

        jwt.verify(token, getEnv("JWT_SECRET"), (error) => {
          if (error) {
            return res
              .status(HTTP_STATUS_CODES.BAD_REQUEST)
              .send({ msg: "something went wrong", error });
          }

          next();
        });
      }
    } catch (error) {
      res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({ error });
    }
  }
}
