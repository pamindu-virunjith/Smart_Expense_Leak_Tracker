export function categoryDominance(expenses) {
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const dominantLeaks = [];
  const categoryTotals = {};

  expenses.forEach((exp) => {
    if (!categoryTotals[exp.category]) {
      categoryTotals[exp.category] = 0;
    }
    categoryTotals[exp.category] += exp.amount;
  });

  for (let category in categoryTotals) {
    const percentage = (categoryTotals[category] / totalSpent) * 100;
    dominantLeaks.push({
      type: "category_dominance",
      category,
      percentage: Math.round(percentage),
      total: categoryTotals[category],
      message: `${category} accounts for ${percentage.toFixed(1)}% of your spending`,
    });
  }

  return dominantLeaks;
}
