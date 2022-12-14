import express, { Request, Response, NextFunction } from "express";
import routes from "./routes";
import cors from "cors";
import bodyParser from "body-parser";
import httpStatusCodes from "http-status-codes";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatusCodes.BAD_REQUEST).json({ message: err });
});

export default app;
