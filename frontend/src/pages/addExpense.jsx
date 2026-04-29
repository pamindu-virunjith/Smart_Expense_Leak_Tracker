import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import FormCard from "../components/expenseFormCard";

const AddExpensePage = () => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [expense, setExpense] = useState({
    amount: "",
    category: "",
    date: "",
    note: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/api/expense/addExpense",
        expense,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((res) => {
        toast.success(res.data.message);
        setExpense({ amount: "", category: "", date: "", note: "" });
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Something went wrong");
        console.log(err.response.data);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Add expense</h1>
        <p className="text-gray-500 mt-2">
          Log a new transaction to keep your insights sharp.
        </p>
      </header>

      {/* Form Card */}
      <FormCard
        expense={expense}
        setExpense={setExpense}
        handleSubmit={handleSubmit}
        loading={loading}
        method="Add"
      />
    </div>
  );
};

export default AddExpensePage;
