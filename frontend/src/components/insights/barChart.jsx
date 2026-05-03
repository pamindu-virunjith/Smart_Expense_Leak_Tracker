import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { ThreeDot } from "react-loading-indicators";

function InsightBarChart({ insights, isLoading }) {
  return (
    <div className="xl:col-span-2 bg-white p-3 md:p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="font-bold mb-1 text-lg 2xl:text-2xl">Month over month</h3>
      <p className="text-gray-400 mb-4 text-sm md:text-lg">
        This month vs last month per category
      </p>
      <div className="h-64 w-full min-w-0">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <ThreeDot variant="pulsate" color="#bcbcbc" size="medium" />
          </div>
        ) : insights?.categoryComparison === undefined || 0 ? (
          <p className="w-full h-full flex justify-center items-center text-gray-400">
            No data available
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={insights?.categoryComparison}>
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
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={true}
                horizontal={true}
                stroke="#e2e8f0"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
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
  );
}

export default InsightBarChart;
