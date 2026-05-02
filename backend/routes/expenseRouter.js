import express from "express";
import { addExpense, updateExpense, deleteExpense, searchExpenseByCategory, insightsDetails,   } from "../controller/expenseController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const expenseRouter = express.Router();

expenseRouter.post("/addExpense", verifyToken, addExpense);
expenseRouter.put("/updateExpense/:id", verifyToken, updateExpense);
expenseRouter.delete("/deleteExpense/:id", verifyToken, deleteExpense);
expenseRouter.get("/getExpense/:category", verifyToken, searchExpenseByCategory);
expenseRouter.get("/insights", verifyToken, insightsDetails)



export default expenseRouter