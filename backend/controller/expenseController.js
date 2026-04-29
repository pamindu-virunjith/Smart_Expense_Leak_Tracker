import Expense from "../model/expense.js";
import { detectLeaks } from "../utils/detectLeaks.js";

export async function addExpense(req, res) {
  try {
    const { amount, category, note, date } = req.body;

    const expense = new Expense({
      user: req.user._id,
      amount,
      category,
      note,
      date,
    });

    await expense.save();

    res.status(201).json({
      message: "Expense added successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Expense not added",
      error: error.message,
    });
  }
}

export async function getExpenses(req, res) {
  try {
    const allExpenses = await Expense.find({ user: req.user._id });

    if (allExpenses.length === 0) {
      return res.status(400).json({
        message: "Expenses not found",
      });
    }

    res.status(200).json({
      message: "Expenses fetched successfully",
      data: allExpenses,
    });
  } catch (error) {
    res.status(400).json({
      message: "Expenses not fetched",
      error: error.message,
    });
  }
}

export async function updateExpense(req, res) {
  try {
    const expenseId = req.params.id;
    const updatedExpense = req.body;

    const result = await Expense.updateOne(
      { _id: expenseId, user: req.user._id },
      updatedExpense,
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Expences not found or not authorized",
      });
    }

    res.status(200).json({
      message: "Expense updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Expense not updated",
      error: error.message,
    });
  }
}

export async function deleteExpense(req, res) {
  try {
    const expenseId = req.params.id;

    const result = await Expense.deleteOne({
      _id: expenseId,
      user: req.user._id,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Expences not found or not authorized",
      });
    }

    res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Expense not deleted",
      error: error.message,
    });
  }
}

export async function searchExpenseByCategory(req, res) {
  try {
    const { category } = req.params;
    let filter = {
      user: req.user._id,
    };

    if (category && category !== "all") {
      filter.category = category;
    }

    const result = await Expense.find(filter).sort({ date: -1 });

    // if(result.length === 0){
    //   return res.status(404).json({
    //     message: "Expences not found"
    //   })
    // }else{
    res.status(200).json({
      message: "Expense fetched successfully",
      data: result,
    });
    // }
  } catch (err) {
    res.status(400).json({
      message: "Error Fetching Data",
      error: err.message,
    });
  }
}

export async function insightsDetails(req, res) {
  try {
    const expenses = await Expense.find({ user: req.user._id });
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const monthlyExpenses = expenses.filter((exp) => {
      const d = new Date(exp.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });
    // total spent in current month
    const totalSpent = monthlyExpenses.reduce(
      (sum, exp) => sum + exp.amount,
      0,
    );

    // total transactions in current month(count)
    const transactions = monthlyExpenses.length;

    // avg per day
    const days = now.getDate();
    const avgPerDay = totalSpent / days;

    // Leak Detection
    const leaks = detectLeaks(monthlyExpenses);

    // top leak
    let topLeak = null;
    if (leaks.length > 0) {
      const normalizedLeaks = leaks.map((leak) => ({
        ...leak,
        impact:
          leak.type === "frequent_small_expense"
            ? leak.total
            : parseFloat(leak.percentage),
      }));

      normalizedLeaks.sort((a, b) => b.impact - a.impact);

      topLeak = normalizedLeaks[0];
    }
    // recent expenses
    const recentExpenses = expenses
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    res.status(200).json({
      totalSpent,
      transactions,
      avgPerDay: avgPerDay.toFixed(2),
      leaks,
      topLeak,
      leakCount: leaks.length,
      recentExpenses,
    });
  } catch (err) {
    res.status(400).json({
      message: "error",
      error: err.message,
    });
  }
}
