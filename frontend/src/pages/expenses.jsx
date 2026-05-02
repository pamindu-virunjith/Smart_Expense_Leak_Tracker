import { Pencil, Trash2, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThreeDot } from "react-loading-indicators";
import axios from "axios";
import DeleteModal from "../components/expenses/dialogModal";
import toast from "react-hot-toast";
import { categoryConfig } from "../utils/categories";

const ExpensesPage = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const token = localStorage.getItem("token");
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND_URL +
          "/api/expense/getExpense/" +
          category,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((res) => {
        setExpenses(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [category, token]);

  const confirmDelete = () => {
    setIsLoading(true);
    axios
      .delete(
        import.meta.env.VITE_BACKEND_URL +
          "/api/expense/deleteExpense/" +
          targetId,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((res) => {
        // console.log(res.data.message)
        toast.success(res?.data?.message || "Expense deleted successfully");
        setExpenses((prevExpenses) =>
          prevExpenses.filter((exp) => exp._id !== targetId),
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message || "Something went wrong");
      })
      .finally(() => {
        setIsOpen(false);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Expenses</h1>
        <p className="text-gray-500 mt-2 font-medium">
          {expenses.length} of {expenses.length} transactions
        </p>
      </header>

      {/* Transactions Table Card */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900">
              All transactions
            </h2>

            {/* Filters */}
            <div className="relative flex items-center w-full max-w-50">
              <select
                className="w-full bg-[#F3F4F6] border-none rounded-lg py-2 pl-3 pr-8 focus:ring-2 focus:ring-blue-500 appearance-none text-sm text-gray-600 font-medium cursor-pointer"
                defaultValue="all"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">All categories</option>
                <option value="food">Food</option>
                <option value="drinks">Drinks</option>
                <option value="shopping">Shopping</option>
                <option value="bills">Bills</option>
                <option value="education">Education</option>
                <option value="health">Health</option>
                <option value="entertainment">Entertainment</option>
                <option value="transport">Transport</option>
                <option value="subscriptions">Subscriptions</option>
                <option value="other">Other</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-left border-collapse">
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
                        {
                          categoryConfig[expenses[i].category.toLowerCase()]
                            .icon
                        }
                        {
                          categoryConfig[expenses[i].category.toLowerCase()]
                            .label
                        }
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
          <DeleteModal
            open={isOpen}
            setOpen={setIsOpen}
            onDelete={confirmDelete}
          />
        </div>
      </section>
    </div>
  );
};

export default ExpensesPage;
