import axios from "axios";
import { Flame, Frown, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import LeakCard from "../components/insights/leakCard";
import { ThreeDot } from "react-loading-indicators";
import { categoryConfig } from "../utils/categories";

const InsightsPage = () => {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const [insights, setInsights] = useState({});

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

  // Mock Data for Charts
  const pieData = [
    { name: "Shopping", value: 40, color: "#ec4899" },
    { name: "Food", value: 16, color: "#f97316" },
    { name: "Bills", value: 13, color: "#3b82f6" },
    { name: "Entertainment", value: 9, color: "#a855f7" },
    { name: "Coffee", value: 8, color: "#b45309" },
    { name: "Transport", value: 7, color: "#60a5fa" },
    { name: "Subscriptions", value: 7, color: "#6366f1" },
    { name: "Other", value: 5, color: "#fbbf24" },
  ];

  const barData = [
    { name: "Food", last: 3000, current: 4200 },
    { name: "Coffee", last: 2000, current: 1800 },
    { name: "Transport", last: 2500, current: 2800 },
    { name: "Subscriptions", last: 1500, current: 1600 },
    { name: "Shopping", last: 1500, current: 7500 },
    { name: "Bills", last: 3200, current: 3500 },
    { name: "Entertainment", last: 2800, current: 2500 },
    { name: "Other", last: 1000, current: 1200 },
  ];

  return (
    <div>
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="text-blue-500" size={24} />
          <h1 className="text-3xl font-bold text-gray-900">Smart Insights</h1>
        </div>
      </header>

      {/* Section: Expense Leaks */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <Flame className="text-orange-500" size={20} />
          <h2 className="text-lg font-bold">Repeated small-expense leaks</h2>
        </div>
        <p className="text-xs text-gray-400 mb-6">
          Small recurring purchases under Rs. 200.00 that add up over the last
          30 days.
        </p>
        <div>
          {isLoading ? (
            <div className="w-full text-center py-5">
              <ThreeDot variant="pulsate" color="#bcbcbc" size="medium" />
            </div>
          ) : insights?.leaks === undefined ? (
            <div>
              <p className="w-full py-5 flex items-center justify-center text-gray-400 font-bold md:text-lg">No Leaks Detected yet. <span className="ml-2"><Frown /></span></p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {
                insights?.leaks.map((leak,i)=>{
                  const config =
                              categoryConfig[leak?.category.toLowerCase()] ||
                              categoryConfig.other;
                  return(
                    <div key={i}>
                    <LeakCard percentage={leak?.percentage} message={leak?.message} total={leak?.total} count={leak?.count} avg={leak?.avg} config={config} type={leak?.type}/>
                  </div>
                  )
                })
              }
            </div>
          )}
        </div>
      </section>

      {/* Section: Category Insights */}
      <div className="grid xl:grid-cols-2 gap-6 mb-8">
        {/* Donut Chart */}
        <div className="bg-white p-3 md:p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold mb-1">This month by category</h3>
          <p className="text-[10px] text-gray-400 mb-4">Total: ₹18,074</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Custom Legend */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
            {pieData.map((entry) => (
              <div
                key={entry.name}
                className="flex items-center gap-1.5 text-[10px] font-medium text-gray-600"
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></div>
                {entry.name}
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-3 md:p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold mb-1">Month over month</h3>
          <p className="text-[10px] text-gray-400 mb-4">
            This month vs last month per category
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                {/* rotate x axis text to vertical direction */}
                <XAxis
                  dataKey="name"
                  fontSize={10}
                  angle={-40}
                  textAnchor="end"
                  tickLine={false}
                  interval={0}
                  height={60}
                />
                <YAxis
                  fontSize={10}
                  axisLine={false}
                  axisLine={true}
                  tickLine={false}
                />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar
                  dataKey="last"
                  fill="#64748b"
                  radius={[4, 4, 0, 0]}
                  barSize={12}
                />
                <Bar
                  dataKey="current"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  barSize={12}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4 text-[10px] font-medium text-gray-500">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-slate-500 rounded-sm"></div> Last month
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div> This month
            </div>
          </div>
        </div>
      </div>

      {/* Top Categories List */}
      {/* <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold mb-8">Top categories</h3>
          <div className="space-y-6">
            {pieData.map((cat) => (
              <div key={cat.name} className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-2">
                    <span className="text-gray-400">🛍️</span> {cat.name} <span className="font-normal text-gray-400">{cat.value}%</span>
                  </span>
                  <span className="text-gray-900">₹7,199</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${cat.value}%`, backgroundColor: cat.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </section> */}
    </div>
  );
};

export default InsightsPage;
