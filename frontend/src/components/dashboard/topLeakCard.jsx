import { Smile, Sparkles } from "lucide-react"
import { ThreeDot } from "react-loading-indicators"
import { useNavigate } from "react-router-dom"
import { categoryConfig } from "../../utils/categories"

function TopLeakCard({insights, isLoading}) {
    const navigate = useNavigate()
  return (
    <section className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 flex flex-col min-h-100">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-orange-500 size-5" />
            <h2 className="text-xl font-extrabold text-gray-900">Top leak</h2>
          </div>

          {isLoading ? (
            <div className="w-full flex-1 flex items-center justify-center">
              <ThreeDot variant="pulsate" color="#bcbcbc" size="small" />
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              {insights.topLeak === null || insights.topLeak === undefined ? (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-2">
                  <Smile size={40} strokeWidth={1.5} />
                  <p className="text-sm">No leaks detected this month.</p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 capitalize">
                      <div
                        className={`flex w-fit items-center px-3 py-1 rounded-xl text-sm xl:text-lg font-bold tracking-tight ${categoryConfig[insights?.topLeak?.category.toLowerCase()].color}`}
                      >
                        {
                          categoryConfig[
                            insights?.topLeak?.category.toLowerCase()
                          ].largeIcon
                        }
                        {
                          categoryConfig[
                            insights?.topLeak?.category.toLowerCase()
                          ].label
                        }
                      </div>
                    </h3>

                    {insights?.topLeak?.type === "frequent_small_expense" && (
                      <p className="text-sm text-gray-500 mt-1">
                        {`${insights?.topLeak?.count}× in this month, (avg Rs.${insights?.topLeak?.avg?.toFixed(2)})`}
                      </p>
                    )}
                  </div>

                  <div className="my-4 p-5 bg-orange-50 rounded-2xl border border-orange-100">
                    <p className="text-sm font-bold text-orange-800/60 mb-1 uppercase tracking-widest">
                      Yearly Impact
                    </p>
                    <p className="text-3xl font-extrabold text-orange-500">
                      {`Rs.${insights?.topLeak?.yearlyTotal?.toLocaleString()}`}
                    </p>
                  </div>

                  <p className="text-sm text-center text-gray-600 leading-relaxed mb-1">
                    {insights?.topLeak?.message}
                  </p>
                </div>
              )}
            </div>
          )}

          <button
            className="w-full py-3 border cursor-pointer border-gray-200 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-bold transition-all shadow-sm"
            onClick={() => navigate("/insights")}
          >
            See all insights
          </button>
        </section>
  )
}

export default TopLeakCard