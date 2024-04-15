import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { errorResponse } from "./controllers/response/response.controller";
import categoryRouter from "./routes/category.route";
import postRouter from "./routes/post.route";
import userRouter from "./routes/user.route";
const app = express();

app.use(cors());

/* default middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Routes */
app.use("/api", userRouter);

app.use("/api", categoryRouter);

app.use("/api", postRouter);

/*
    Client error handler
 */
app.use((req, res, next) => {
  next(createHttpError(404, "Route Not Found"));
});

/*
Server error handler
-> all the error comes here
*/
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return errorResponse(res, { statusCode: err.status, message: err.message });
});

export default app;
