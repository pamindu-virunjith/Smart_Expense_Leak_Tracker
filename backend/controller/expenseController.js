import Expense from "../model/expense.js";
import { categoryDominance } from "../utils/categoryDominance.js";
import { currentMonthCategoryTotals } from "../utils/currentMonthCategoryTotals.js";
import { detectLeaks } from "../utils/detectLeaks.js";
import { getMonthlyCategoryStatus } from "../utils/monthlyCategoryStatus.js";

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

    const result = await Expense.find(filter).sort({ createdAt: -1 });

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
    const now  = new Date();
    const startOfCurrentMonth = new Date(Date.UTC(now.getFullYear(), now.getMonth(),1))
    const startOfNextMonth = new Date(Date.UTC(now.getFullYear(),now.getMonth()+1,1))
    const startOfLastMonth = new Date(Date.UTC(now.getFullYear(), now.getMonth()-1,1));

    const currentMonthExpenses = await Expense.find({
      user: req.user._id,
      date: {
        $gte: startOfCurrentMonth,
        $lt: startOfNextMonth
      }
    })

    const lastMonthExpenses = await Expense.find({
      user: req.user._id,
      date: {
        $gte: startOfLastMonth,
        $lt: startOfCurrentMonth
      }
    })

    // recent expenses
    const recentExpenses = await Expense.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5);

    // total spent in current month
    const totalSpent = currentMonthExpenses.reduce(
      (sum, exp) => sum + exp.amount,
      0,
    );

    // total transactions in current month(count)
    const transactions = currentMonthExpenses.length;

    // avg per day
    const days = now.getDate();
    const avgPerDay = totalSpent / days;

    // Leak Detection
    const leaks = detectLeaks(currentMonthExpenses);

    // top leak
    let topLeak = null;
    if (leaks.length > 0) {
      topLeak = leaks.reduce((a, b) => (a.total > b.total ? a : b));
    }

    // category dominance
    const dominanceOfCategories = categoryDominance(currentMonthExpenses);

    // currentMonth Category totals
    const monthlyCategoryTotals = currentMonthCategoryTotals(currentMonthExpenses);

    //expenses of last Month over current Month
    const monthlyCategoryComparison = getMonthlyCategoryStatus(currentMonthExpenses, lastMonthExpenses);

    res.status(200).json({
      totalSpent,
      transactions,
      avgPerDay: avgPerDay,
      leaks,
      topLeak,
      leakCount: leaks.length,
      dominanceOfCategories,
      recentExpenses,
      monthlyCategoryComparison,
      monthlyCategoryTotals
    });
  } catch (err) {
    res.status(400).json({
      message: "error",
      error: err.message,
    });
  }
}
