import express, { Response, Request } from "express";
import routes from "./src/routes/auth";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


const app = express();

dotenv.config();

const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/auth", routes);

app.get('/set-cookies', (req: Request, res: Response) => {
  res.cookie('username', 'Tony');
  res.cookie('isAuthenticated', true, { maxAge: 24 * 60 * 60 * 1000 }, );
  res.send('Cookies are set');
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
