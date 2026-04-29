import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import FormCard from "../components/expenseFormCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function EditExpense() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [expense, setExpense] = useState({
    amount: location.state.amount,
    category: location.state.category,
    date: location.state.date,
    note: location.state.note,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "/api/expense/updateExpense/" + params.id,
        expense,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((res) => {
        toast.success(res.data.message);
        setExpense({ amount: "", category: "", date: "", note: "" });
        navigate("/expenses")
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err.response.data);
      }).finally(() => setLoading(false));
  };
  return (
    <div>
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Edit expense</h1>
        <p className="text-gray-500 mt-2">
          Update your transactions when you need.
        </p>
      </header>

      {/* Form Card */}
      <FormCard
        expense={expense}
        setExpense={setExpense}
        handleSubmit={handleSubmit}
        method="Update"
        loading={loading}
      />
    </div>
  );
}

export default EditExpense;
