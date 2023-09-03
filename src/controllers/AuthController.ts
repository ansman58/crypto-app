import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { HTTP_STATUS_CODES } from "../constants";

const { CREATED, INTERNAL_SERVER_ERROR, BAD_REQUEST, NOT_FOUND } =
  HTTP_STATUS_CODES;

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user?.email) {
        return res.status(NOT_FOUND).send({ msg: "Email does not exist" });
      }

      const comparePassword = await bcrypt.compare(
        password,
        user?.password as string
      );

      if (!comparePassword) {
        return res.status(BAD_REQUEST).send({ msg: "Password is incorrect" });
      }

      const token = jsonwebtoken.sign(
        { id: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      return res.send({
        msg: "Login successful",
        user,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(INTERNAL_SERVER_ERROR).send({ msg: error });
    }
  }

  static async register(req: Request, res: Response) {
    const { email, fullname, password, meta } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await User.create({
        email,
        fullname,
        password: hashedPassword,
        meta,
      });

      await newUser.save();

      res.status(CREATED).send({ msg: "User created", newUser });
    } catch (error) {
      console.log("error", error);
      res.status(INTERNAL_SERVER_ERROR).send({ msg: error });
    }
  }
}
