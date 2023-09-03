import express from "express";
import { AuthController } from "./../controllers/auth";

const router = express.Router();

router.post("/login", AuthController.register);

export default router;
