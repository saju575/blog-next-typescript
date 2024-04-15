import express from "express";
import {
  getProfileController,
  loginController,
  registerController,
} from "../controllers/user/user.controller";
const userRouter = express.Router();

/* Register */
userRouter.post("/register", registerController);

/* Login */
userRouter.post("/login", loginController);

/* get profile */
userRouter.get("/profile", getProfileController);

export default userRouter;
