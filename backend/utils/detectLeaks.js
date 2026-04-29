export function detectLeaks(expenses) {
  const SMALL_LIMIT = 200; // small expense threshold
  const FREQUENCY_LIMIT = 3; // frequency threshold

  const grouped = {};

  // Group small expenses by category
  expenses.forEach((exp) => {
    if (exp.amount <= SMALL_LIMIT) {
      if (!grouped[exp.category]) {
        grouped[exp.category] = [];
      }
      grouped[exp.category].push(exp);
    }
  });

  const leaks = [];

  //Detect frequent categories
  for (let category in grouped) {
    const count = grouped[category].length;

    if (count >= FREQUENCY_LIMIT) {
      const total = grouped[category].reduce((sum, e) => sum + e.amount, 0);

      leaks.push({
        type: "frequent_small_expense",
        category,
        count,
        total,
        avg: Math.round(total / count),
        message: `You made ${count} small ${category} expenses totaling Rs.${total}`,
      });
    }
  }

  //   category Dominance
 const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const categoryTotals = {};

  expenses.forEach(exp => {
    if (!categoryTotals[exp.category]) {
      categoryTotals[exp.category] = 0;
    }
    categoryTotals[exp.category] += exp.amount;
  });

  for (let category in categoryTotals) {
    const percentage = (categoryTotals[category] / totalSpent) * 100;
    // const alreadyAdded = leaks.some(l => l.category === category);

    // if ( !alreadyAdded && percentage >= 40) {
    if (percentage >= 40) {
      leaks.push({
        type: "category_dominance",
        category,
        percentage: percentage.toFixed(1),
        total: categoryTotals[category],
        message: `${category} accounts for ${percentage.toFixed(1)}% of your spending`
      });
    }
  }
  return leaks;
}
