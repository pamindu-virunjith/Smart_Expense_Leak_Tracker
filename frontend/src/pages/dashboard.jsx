import {
  AlertTriangle,
  ArrowRight,
  Plus,
  Receipt,
  TrendingDown,
  Wallet,
} from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import StatCard from "../components/dashboard/statCard";
import { ThreeDot } from "react-loading-indicators";
import RecentExpenses from "../components/dashboard/recentExpensesCard";
import { generateTopInsight } from "../utils/mainInsight";
import TopLeakCard from "../components/dashboard/topLeakCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [insights, setInsights] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/expense/insights", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setInsights(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  return (
    <div>
      <header className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          {!isLoading &&
            (insights?.dominanceOfCategories === undefined ? (
              <p className="text-gray-500 mt-1">No insights available.</p>
            ) : (
              <p className="text-gray-500 mt-1">
                {generateTopInsight(insights?.dominanceOfCategories[0])}
              </p>
            ))}
        </div>
        <button
          onClick={() => navigate("/addExpense")}
          className="hidden lg:flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
        >
          <Plus size={18} />
          Add expenses
        </button>
        <button
          className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full text-sm font-semibold transition-colors cursor-pointer lg:hidden"
          onClick={() => navigate("/addExpense")}
        >
          <Plus size={18} />
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Spent this month"
          value={`Rs.${insights.totalSpent?.toFixed(2) || 0}`}
          loading={isLoading}
          icon={<Wallet size={20} />}
          color="indigo"
        />
        <StatCard
          label="Transactions"
          value={insights?.transactions || 0}
          loading={isLoading}
          icon={<Receipt size={20} />}
          color="emerald"
        />
        <StatCard
          label="Avg per day"
          value={`Rs. ${insights?.avgPerDay?.toFixed(2) || 0}`}
          loading={isLoading}
          icon={<TrendingDown size={20} />}
          color="blue"
        />
        <StatCard
          label="Leaks detected"
          value={insights?.leakCount || 0}
          loading={isLoading}
          icon={<AlertTriangle size={20} />}
          color="orange"
        />
      </div>

      <div className="grid xl:grid-cols-3 items-start gap-6">
        {/* Recent Expenses Section */}
        <section className="xl:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="sm:text-xl font-extrabold">Recent expenses</h2>
            <div className="">
              <button
                className="flex items-center text-blue-600 cursor-pointer font-semibold"
                onClick={() => navigate("/expenses")}
              >
                <span className="hidden sm:block">View all</span>
                <span className="ml-1">
                  <ArrowRight size={20} />
                </span>
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {isLoading ? (
              <ThreeDot variant="pulsate" color="#bcbcbc" size="small" />
            ) : (
              <div>
                {insights.recentExpenses === undefined ? (
                  <p className="text-center text-gray-400">
                    No recent expenses found.
                  </p>
                ) : (
                  <RecentExpenses expenses={insights.recentExpenses} />
                )}
              </div>
            )}
          </div>
        </section>

        {/* Top Leak Card */}
        <TopLeakCard insights={insights} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Dashboard;
