import express, { Response, Request } from "express";
import routes from "./src/routes/auth";
import cookieParser from "cookie-parser";
import { getEnv } from "./src/utils/general";
import { SocialAuthController } from "./src/controllers/SocialAuthController";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

const app = express();

dotenv.config();

const port = getEnv("PORT") || 3001;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req: Request, res: Response) => {
  // res.send("Hello World");
  res.render("home");
});

app.use("/auth", routes);

passport.use(SocialAuthController.googleAuth());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
