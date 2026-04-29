import { Info } from "lucide-react";

const LeakCard = ({percentage, message, total, count, avg, config, type}) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
    <div className="flex justify-between items-start mb-4">
      <div>
        <div
                  className={`flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight ${config.color}`}
                >
                  {config.icon}
                  {config.label}
                </div>
        <h4 className="font-bold text-gray-900 mt-1">{percentage}%</h4>
      </div>
    </div>
    <div className="space-y-1 mb-6 text-[10px]">
      {
        type == "frequent_small_expense" && (
          <>
          <div className="flex justify-between">
        <span className="text-gray-400">Frequency</span>{" "}
        <span className="font-bold">{count}× / 30 days</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Avg amount</span>{" "}
        <span className="font-bold">{avg}</span>
      </div>
          </>
        )
      }
       <div className="flex justify-between">
        <span className="text-gray-400">Percentage</span>{" "}
        <span className="font-bold">{percentage}%</span>
      </div>
    </div>
    <div className="space-y-1 mb-6">
      <div className="flex justify-between text-[9px] text-gray-400 uppercase font-bold">
        <span>Monthly Impact</span>{" "}
        <span className="text-gray-900">{total}</span>
      </div>
    </div>
    <div className="mt-auto bg-blue-50 p-3 rounded-xl flex gap-2">
      <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
      <p className="text-[10px] leading-relaxed text-blue-900">{message}</p>
    </div>
  </div>
);

export default LeakCard;
