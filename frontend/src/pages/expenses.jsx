import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteModal from "../components/expenses/deleteModal";
import toast from "react-hot-toast";
import ExpensesTable from "../components/expenses/expensesTable";

const ExpensesPage = () => {
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
          <div className="flex justify-between items-start mb-8">
            <h2 className="sm:text-xl font-semibold text-gray-900">
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
          <ExpensesTable
            expenses={expenses}
            isLoading={isLoading}
            setTargetId={setTargetId}
            setIsOpen={setIsOpen}
          />
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
