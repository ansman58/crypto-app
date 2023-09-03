import { Request, Response } from "express";
import { User } from "../models/User";

export async function authController(req: Request, res: Response) {
  const { email, fullname, password, meta } = req.body;

  try {
    const newUser = await User.create({
      email,
      fullname,
      password,
      meta,
    });

    await newUser.save();

    res.send({ msg: "User created", newUser });
  } catch (error) {
    console.log(error);
  }
}
