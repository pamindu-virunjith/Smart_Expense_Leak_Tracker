import { groupByCategory } from "./groupByCategory.js";

export function categoryDominance(current, last) {
  const totalSpent = current.reduce((sum, e) => sum + e.amount, 0);
  const currentTotals = groupByCategory(current);
  const lastTotals = groupByCategory(last);
  
  const allCategories = new Set([
    ...Object.keys(currentTotals),
    ...Object.keys(lastTotals),
  ]);

  const dominantLeaks = [];

  allCategories.forEach((category) => {
    const currentMonthTotal = currentTotals[category] || 0;
    const lastMonthTotal = lastTotals[category] || 0;
    const percentage = totalSpent === 0 ? 0 : (currentMonthTotal / totalSpent) * 100;

    let change = 0;

    if (lastMonthTotal === 0) {
      change = currentMonthTotal > 0 ? 100 : 0;
    }else {
      change = (((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100);
    }

    dominantLeaks.push({
      category,
      percentage: Math.round(percentage),
      total: currentMonthTotal,
      change: Number(change.toFixed(1)),
    });
  });

  // Sort leaks by percentage in descending order
  dominantLeaks.sort((a, b) => b.percentage - a.percentage);

  return dominantLeaks;
}
