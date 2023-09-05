import express, { Response, Request } from "express";
import routes from "./src/routes/auth";
import cookieParser from "cookie-parser";
import { getEnv } from "./src/utils/general";
import passport from "passport";
import dotenv from "dotenv";
import * as GoogleStrategy from "passport-google-oauth20";
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
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req: Request, res: Response) => {
  // res.send("Hello World");
  res.render("home");
});

app.use("/auth", routes);

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });
    }
  )
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
