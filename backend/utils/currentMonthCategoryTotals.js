import { groupByCategory } from "./groupByCategory.js";

export function currentMonthCategoryTotals(expenses) {
   const totals = groupByCategory(expenses);

   const categories = Object.keys(totals).map((category) => ({
      category,
      amount: totals[category],
   }));

   return categories;
}