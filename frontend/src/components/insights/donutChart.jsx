import { ThreeDot } from "react-loading-indicators";
import { categoryColors } from "../../utils/categoryColors";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

function DonutChart({ insights, isLoading }) {
  return (
    <div className=" bg-white p-3 md:p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="font-bold mb-1 text-lg 2xl:text-2xl">
        This month by category
      </h3>
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <ThreeDot variant="pulsate" color="#bcbcbc" size="medium" />
        </div>
      ) : insights?.monthlyCategoryTotals === undefined || 0 ? (
        <p className="w-full h-full flex justify-center items-center text-gray-400">
          No data available
        </p>
      ) : (
        <div>
          <p className="text-gray-400 mb-4 text-sm md:text-lg">
            Total: <span>{`Rs. ${insights?.totalSpent?.toFixed(2)}`}</span>
          </p>
          <div className="h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height={250}>
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

                <Tooltip formatter={(value) => `Rs.${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Custom Legend */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
            {insights?.monthlyCategoryTotals.map((entry, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 text-sm md:text-[16px] md:font-medium text-gray-600"
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      categoryColors[entry.category.toLowerCase()],
                  }}
                ></div>
                {entry.category}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DonutChart;
