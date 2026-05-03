export function generateTopInsight(top) {
  if (!top) return "No insights available.";

  const { category, percentage, change } = top;

  let changeText;

  if (change > 0) {
    changeText = `increased by ${change}% compared to last month`;
  } else if (change < 0) {
    changeText = `decreased by ${Math.abs(change)}% compared to last month`;
  } else {
    changeText = `remained the same as last month`;
  }

  return `${category.charAt(0).toUpperCase() + category.slice(1)} accounts for ${percentage}% of your spending and has ${changeText}.`;
}
