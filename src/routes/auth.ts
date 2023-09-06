import express, { Request, Response } from "express";
import { AuthController } from "../controllers/AuthController";
import passport from "passport";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req: Request, res: Response) => {
    console.log(req.body);
    // res.send(req.body)
    res.send("you reached the callback URL");
  }
);

export default router;
