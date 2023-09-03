import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";

export class AuthController {
    
  public static async register(req: Request, res: Response) {
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

      res.send({ msg: "User created", newUser });
    } catch (error) {
      console.log("error", error);
    }
  }
}
