import express, { Request, Response } from "express";
import { AuthController } from "../controllers/AuthController";
import passport from "passport";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("google/redirect", (req: Request, res: Response) => {
  res.send({ msg: "you reached the callback URL" });
});

export default router;
