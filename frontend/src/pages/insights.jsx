import axios from "axios";
import { Flame, Smile, Sparkles } from "lucide-react";
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

  const categoryColors = {
    food: "#f97316",
    shopping: "#ec4899",
    bills: "#306BC9",
    education: "#E31414",
    health: "#00BA00",
    entertainment: "#a855f7",
    transport: "#14FCFF",
    subscriptions: "#6F71F2",
    drinks: "#b45309",
    other: "#fbbf24",
  };

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
          <h2 className="text-lg xl:text-xl font-bold">
            Repeated small-expense leaks
          </h2>
        </div>
        <p className="text-sm text-gray-400 mb-6">
          Small recurring purchases under Rs. 200.00 that add up over the last
          30 days.
        </p>
        <div>
          {isLoading ? (
            <div className="w-full text-center py-5">
              <ThreeDot variant="pulsate" color="#bcbcbc" size="medium" />
            </div>
          ) : insights?.leaks.length === 0 ? (
            <div>
              <p className="w-full py-5 flex items-center justify-center text-gray-400 font-bold md:text-lg">
                No Leaks Detected for this month yet.{" "}
                <span className="ml-2">
                  <Smile />
                </span>
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {insights?.leaks.map((leak, i) => {
                const config =
                  categoryConfig[leak?.category.toLowerCase()] ||
                  categoryConfig.other;
                return (
                  <LeakCard
                    percentage={leak?.percentage}
                    message={leak?.message}
                    total={leak?.total}
                    count={leak?.count || 6}
                    avg={leak?.avg || 138.5}
                    config={config}
                    type={leak?.type}
                    key={i}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Section: Category Insights */}
      <div className="grid xl:grid-cols-3 gap-6 mb-8">
        {/* Donut Chart */}
        <div className=" bg-white p-3 md:p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold mb-1 text-lg 2xl:text-2xl">
            This month by category
          </h3>
          <p className="text-gray-400 mb-4 text-sm md:text-lg">
            Total: <span>{`Rs. ${insights?.totalSpent?.toFixed(2)}`}</span>
          </p>
          <div className="h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height={250}>
              {!isLoading && (
                <PieChart>
                  <Pie
                    data={insights?.monthlyCategoryTotals}
                    innerRadius={65}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey={"amount"}
                    nameKey={"category"}
                  >
                    {insights?.monthlyCategoryTotals.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          categoryColors[entry.category.toLowerCase()] ||
                          "#9ca3af"
                        }
                      />
                    ))}
                  </Pie>
                  {/* should show category name(label) and value */}

                  <Tooltip formatter={(value) => `Rs.${value.toFixed(2)}`}/>
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
          {/* Custom Legend */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
            {!isLoading && insights?.monthlyCategoryTotals.map((entry,i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 text-sm md:text-[16px] md:font-medium text-gray-600"
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: categoryColors[entry.category.toLowerCase()] }}
                ></div>
                {entry.category}
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="xl:col-span-2 bg-white p-3 md:p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold mb-1 text-lg 2xl:text-2xl">
            Month over month
          </h3>
          <p className="text-gray-400 mb-4 text-sm md:text-lg">
            This month vs last month per category
          </p>
          <div className="h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={insights?.monthlyCategoryComparison}>
                {/* rotate x axis text to vertical direction */}
                <XAxis
                  dataKey="category"
                  fontSize={12}
                  angle={-30}
                  textAnchor="end"
                  tickLine={false}
                  interval={0}
                  height={60}
                />
                <YAxis fontSize={10} axisLine={true} tickLine={false} />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar
                  dataKey="lastMonth"
                  fill="#64748b"
                  radius={[4, 4, 0, 0]}
                  barSize={10}
                />
                <Bar
                  dataKey="currentMonth"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  barSize={10}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4 font-medium text-gray-500 text-sm md:text-[16px]">
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
      <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold mb-8">Top categories</h3>
          <div className="space-y-6">
            {insights?.monthlyCategoryComparison?.map((category,i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="flex items-center gap-2">
                    <div
                  className={`flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight ${categoryConfig[category.category.toLowerCase()].color}`}
                >
                  {categoryConfig[category.category.toLowerCase()].icon}
                  {categoryConfig[category.category.toLowerCase()].label}
                </div>
                     <span className="font-normal text-gray-400">{category.change}%</span>
                  </span>
                  <span className="text-gray-900">{` Rs. ${category.currentMonth.toFixed(2)}`}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  {/* <div className="h-full rounded-full" style={{ width: `${category.change}%`, backgroundColor: categoryColors[category.category.toLowerCase()]}}></div> */}
                  <div className={`h-full rounded-full ${categoryConfig[category.category.toLowerCase()].bgColor} w-[${category.change}%]`}></div>
                </div>
              </div>
            ))}
          </div>
        </section>
    </div>
  );
};

export default InsightsPage;
