import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import bodyParser from "body-parser";
import cors from "cors";
import expenseRouter from "./routes/expenseRouter.js";
dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to the Database");
  })

  .catch((e) => {
    console.log("Database connnection is failed");
    console.log(e);
  });


app.use("/api/user/", userRouter)
app.use("/api/expense/", expenseRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
