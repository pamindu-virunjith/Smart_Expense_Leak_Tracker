import { ThreeDot } from "react-loading-indicators";
import { categoryConfig } from "../../utils/categories";
import { categoryColors } from "../../utils/categoryColors";

function TopCategories({ insights, isLoading }) {
  return (
    <div>
      <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold mb-8">Top categories this month</h3>
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <ThreeDot variant="pulsate" color="#bcbcbc" size="medium" />
          </div>
        ) : insights?.dominanceOfCategories === undefined || 0 ? (
          <p className="w-full h-full flex justify-center items-center text-gray-400">
            No data available
          </p>
        ) : (
          <div className="space-y-6">
            {insights?.dominanceOfCategories?.map((category, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <span
                      className={`flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight ${categoryConfig[category.category.toLowerCase()].color}`}
                    >
                      {categoryConfig[category.category.toLowerCase()].icon}
                      {categoryConfig[category.category.toLowerCase()].label}
                    </span>
                    <span className="font-normal text-gray-400 ml-3 sm:ml-0">
                      {category.percentage}%
                    </span>
                  </div>
                  <div className="flex flex-col-reverse sm:flex-row items-end sm:items-center">
                    <span
                      className={`flex items-center gap-1 sm:mr-5 ${
                        category.change > 0
                          ? "text-red-500"
                          : category.change < 0
                            ? "text-green-500"
                            : "text-gray-400"
                      } text-xs xl:text-sm`}
                    >
                      {category.change > 0
                        ? "↑"
                        : category.change < 0
                          ? "↓"
                          : "→"}
                      {Math.abs(category.change)}%
                    </span>
                    <span className="text-gray-600 text-xs xl:text-lg">{` Rs. ${category.total.toLocaleString("en-US")}`}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${category.percentage}%`,
                      backgroundColor:
                        categoryColors[category.category.toLowerCase()],
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default TopCategories;
