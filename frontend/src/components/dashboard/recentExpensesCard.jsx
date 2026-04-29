import {
  Film,
  Car,
  ShoppingBag,
  Utensils,
  Receipt,
  GraduationCap,
  HeartPulse,
  RefreshCw,
  MoreHorizontal,
  CupSoda,
} from "lucide-react";

const RecentExpenses = ({ expenses }) => {
  // Helper to get category-specific styles and icons
  const categoryConfig = {
    food: {
      color: "bg-orange-50 text-orange-700",
      icon: <Utensils size={14} className="mr-1" />,
      label: "Food",
    },
    drinks: {
      color: "bg-amber-50 text-amber-700",
      icon: <CupSoda size={14} className="mr-1" />,
      label: "Drinks",
    },
    shopping: {
      color: "bg-pink-50 text-pink-600",
      icon: <ShoppingBag size={14} className="mr-1" />,
      label: "Shopping",
    },
    bills: {
      color: "bg-red-50 text-red-600",
      icon: <Receipt size={14} className="mr-1" />,
      label: "Bills",
    },
    education: {
      color: "bg-indigo-50 text-indigo-600",
      icon: <GraduationCap size={14} className="mr-1" />,
      label: "Education",
    },
    health: {
      color: "bg-emerald-50 text-emerald-600",
      icon: <HeartPulse size={14} className="mr-1" />,
      label: "Health",
    },
    entertainment: {
      color: "bg-purple-50 text-purple-600",
      icon: <Film size={14} className="mr-1" />,
      label: "Entertainment",
    },
    transport: {
      color: "bg-blue-50 text-blue-600",
      icon: <Car size={14} className="mr-1" />,
      label: "Transport",
    },
    subscriptions: {
      color: "bg-cyan-50 text-cyan-600",
      icon: <RefreshCw size={14} className="mr-1" />,
      label: "Subscriptions",
    },
    other: {
      color: "bg-gray-50 text-gray-600",
      icon: <MoreHorizontal size={14} className="mr-1" />,
      label: "Other",
    },
  };

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
