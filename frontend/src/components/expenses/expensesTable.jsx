import { Pencil, Trash2 } from "lucide-react";
import { ThreeDot } from "react-loading-indicators";
import { categoryConfig } from "../../utils/categories";
import { useNavigate } from "react-router-dom";

function ExpensesTable({ expenses, isLoading, setTargetId, setIsOpen }) {
  const navigate = useNavigate();
  return (
    <div className="overflow-auto">
      <table className="w-full text-left border-collapse min-w-150">
        <thead>
          <tr className="text-gray-400 text-sm  border-b border-gray-100">
            <th className="pb-4 lg:text-lg">Date</th>
            <th className="pb-4 lg:text-lg">Category</th>
            <th className="pb-4 lg:text-lg">Note</th>
            <th className="pb-4 lg:text-lg text-right">Amount (Rs.)</th>
            <th className="pb-4 lg:text-lg px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {isLoading ? (
            <tr>
              <td
                colSpan={6}
                className="text-center text-gray-400 font-semibold text-lg py-5"
              >
                <ThreeDot variant="pulsate" color="#bcbcbc" size="small" />
              </td>
            </tr>
          ) : expenses.length != 0 ? (
            expenses.map((_, i) => (
              <tr
                key={i}
                className="group hover:bg-gray-50/50 transition-colors"
              >
                <td className="py-5">{expenses[i].date.split("T")[0]}</td>
                <td className="py-5 capitalize">
                  {/* {expenses[i].category} */}
                  <p
                    className={`flex items-center w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight ${categoryConfig[expenses[i].category.toLowerCase()].color}`}
                  >
                    {categoryConfig[expenses[i].category.toLowerCase()].icon}
                    {categoryConfig[expenses[i].category.toLowerCase()].label}
                  </p>
                </td>
                <td className="py-5 capitalize">{expenses[i].note}</td>
                <td className="py-5 text-right">
                  {expenses[i].amount.toFixed(2)}
                </td>
                <td className="py-5">
                  <div className="flex justify-end gap-4 px-4 text-gray-400 ">
                    <button
                      onClick={() => {
                        navigate("/editExpense/" + expenses[i]._id, {
                          state: expenses[i],
                        });
                      }}
                      className="hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setIsOpen(true);
                        setTargetId(expenses[i]._id);
                      }}
                      className="hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="text-center text-gray-400 font-semibold text-lg py-5"
              >
                Nothing to Show
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ExpensesTable;
