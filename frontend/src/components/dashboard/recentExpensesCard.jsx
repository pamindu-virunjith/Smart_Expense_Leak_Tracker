import { categoryConfig } from "../../utils/categories";

const RecentExpenses = ({ expenses }) => {
  return (
    <div>
      {/* Expense List */}
      <div>
        {expenses.map((expense, index) => {
          const config =
            categoryConfig[expense.category.toLowerCase()] ||
            categoryConfig.other;

          return (
            <div
              key={expense._id || index}
              className={`flex items-center justify-between py-4 ${
                index !== expenses.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="sm:flex items-center gap-4">
                {/* Category Badge */}
                <div
                  className={`flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight ${config.color}`}
                >
                  {config.icon}
                  {config.label}
                </div>

                {/* Title and Date */}
                <div className="px-3 mt-2 sm:px-0 sm:mt-0">
                  <h3 className="text-sm font-bold text-gray-900">
                    {expense.note}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {new Date(expense.date).toLocaleDateString("en-US")}
                  </p>
                </div>
              </div>

              {/* Amount */}
              <div className="sm:text-lg font-bold text-gray-900">
                Rs. {expense.amount.toLocaleString("en-IN")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentExpenses;
