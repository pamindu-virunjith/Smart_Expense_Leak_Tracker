import { ArrowRight, Plus, Smile } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import StatCard from "../components/dashboard/statCard";
import { ThreeDot } from "react-loading-indicators";
import RecentExpenses from "../components/dashboard/recentExpensesCard";

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
        console.log(res.data);
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
          <p className="text-gray-500 mt-1">
            {insights?.topLeak?.message}
          </p>
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
          value={`Rs. ${insights.totalSpent?.toFixed(2) || 0}`}
          loading={isLoading}
        />
        <StatCard
          label="Transactions"
          value={insights?.transactions || 0}
          loading={isLoading}
        />
        <StatCard
          label="Avg per day"
          value={`Rs. ${insights?.avgPerDay || 0}`}
          loading={isLoading}
        />
        <StatCard
          label="Leaks detected"
          value={insights?.leakCount || 0}
          loading={isLoading}
        />
      </div>

      <div className="grid xl:grid-cols-3 items-start gap-6">
        {/* Recent Expenses Section */}
        <section className="xl:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="sm:text-xl font-bold">Recent expenses</h2>
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
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Top leak</h2>

          {isLoading ? (
            <div className="w-full text-center py-5">
              <ThreeDot variant="pulsate" color="#bcbcbc" size="small" />
            </div>
          ) : (
            // if no leaks
            <div>
              {insights.topLeak === null ? (
                <div className="flex flex-col items-center text-gray-400 py-5 gap-1">
                  <p>
                  No leaks detected for this month.
                </p>
                <p><Smile/></p>
                </div>
              ) : (
                <div>
                  <div className="mb-1">
            <h3 className="text-xl md:text-2xl font-bold">
              {`${insights?.topLeak?.category}`}{" "}
            </h3>
            {insights?.topLeak?.type === "frequent_small_expense" && (
              <p className="text-sm text-gray-400">
                {`${insights?.topLeak?.count}x in last month (avg: Rs. ${insights?.topLeak?.avg?.toFixed(2)})`}
              </p>
            )}
            {insights?.topLeak?.type === "category_dominance" && (
              <p className="text-xs text-gray-400">
                {insights?.topLeak?.message}
              </p>
            )}
          </div>

          <div className="my-6 p-6 bg-gray-50 rounded-xl">
            <p className="text-xs font-medium text-gray-500 mb-1 uppercase">
              Total impact (monthly)
            </p>
            <p className="text-3xl font-bold text-gray-900">{`Rs. ${insights?.topLeak?.total.toFixed(2)}`}</p>
          </div>
          {insights?.topLeak?.type === "frequent_small_expense" && (
            <p className="text-xs text-gray-400 text-center pb-2">
              {insights?.topLeak?.message}
            </p>
          )}
                </div>
              )}
            </div>
          )}

          <button
            className="mt-auto w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer"
            onClick={() => navigate("/insights")}
          >
            See all insights
          </button>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
