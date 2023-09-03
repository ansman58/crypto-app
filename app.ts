import express, {Response, Request} from "express";
import routes from "./src/routes/auth"

const app = express();

const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/auth", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
