export function groupByCategory(expenses) {
  const totals = {};
  expenses.forEach((exp) => {
    if (!totals[exp.category]) {
      totals[exp.category] = 0;
    }
    totals[exp.category] += exp.amount;
  });

  return totals;
}
