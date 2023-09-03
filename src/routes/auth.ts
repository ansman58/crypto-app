import express, { Request, Response } from "express";

const router = express.Router();

//@ts-ignore
router.post("/login", (req: Request, res: Response) => {
  res.send("Hello Login");
});

export default router;
