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
        yearlyTotal: total * 12,
        avg: Math.round(total / count),
        message: `You made ${count} small ${category} expenses totaling Rs.${total}`,
      });
    }
  }
  return leaks;
}
