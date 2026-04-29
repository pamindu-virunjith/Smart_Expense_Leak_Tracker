import express from "express";
import { signup, login, getProfile } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/profile", getProfile);

export default userRouter;