import express, {Res} from "express";

const router = express.Router();

router.post("/login", (req, res) => {
  res.send("Hello Login");
});

export default router;