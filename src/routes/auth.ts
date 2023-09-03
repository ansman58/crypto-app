import express, { Request, Response } from "express";

const router = express.Router();

router.post("/login", (req: Request, res: Response) => {
  res.send("Hello Login");
});

export default router;
