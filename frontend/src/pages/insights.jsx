import axios from "axios";
import { Flame, Smile, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import LeakCard from "../components/insights/leakCard";
import { ThreeDot } from "react-loading-indicators";
import { categoryConfig } from "../utils/categories";
import DonutChart from "../components/insights/donutChart";
import InsightBarChart from "../components/insights/barChart";
import TopCategories from "../components/insights/topCategories";

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
          ) : insights?.leaks?.length === undefined || 0 ? (
            <div>
              <p className="w-full py-5 flex items-center justify-center text-gray-400 font-bold md:text-lg">
                No Leaks Detected this month.{" "}
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
                    yearlyTotal={leak?.yearlyTotal}
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
        <DonutChart insights={insights} isLoading={isLoading}/>

        {/* Bar Chart */}
        <InsightBarChart insights={insights} isLoading={isLoading}/>
      </div>

      {/* Top Categories List */}
      <TopCategories insights={insights} isLoading={isLoading} />
    </div>
  );
};

export default InsightsPage;
