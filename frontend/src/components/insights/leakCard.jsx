import { Info } from "lucide-react";

const LeakCard = ({ percentage, message, total, count, avg, config, type, yearlyTotal }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
    <div className="flex flex-col justify-start items-start mb-4">
      <div
        className={`flex items-center px-3 py-1 rounded-full text-sm font-bold uppercase tracking-tight ${config.color}`}
      >
        {config.icon}
        {config.label}
      </div>
    </div>
    <div className="space-y-1 mb-6 flex flex-col justify-end h-full">
      {type === "frequent_small_expense"? (
        <div>
          <div className="flex justify-between">
            <span className="text-gray-400">Frequency</span>{" "}
            <span className="font-bold">{count}× / 30 days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Avg amount</span>{" "}
            <span className="font-bold">{avg}</span>
          </div>
        </div>
      ):(
      <div className="flex justify-between">
        <span className="text-gray-400">Percentage</span>{" "}
        <span className="font-bold">{percentage}%</span>
      </div>
      )}
    </div>
    <div className="space-y-1 mb-6 text-sm flex flex-col justify-end h-full">
      <div className="flex justify-between text-gray-400 uppercase font-semibold">
        <span>Monthly Impact</span>{" "}
        <span className="text-gray-900 font-bold capitalize">{`Rs. ${total.toLocaleString("en-US")}`}</span>
      </div>
      <div className="flex justify-between text-gray-400 uppercase font-semibold">
        <span>Yearly Impact</span>{" "}
        <span className="text-red-600 font-bold capitalize">{`Rs. ${yearlyTotal.toLocaleString("en-US")}`}</span>
      </div>
    </div>
    <div className="mt-auto bg-blue-50 p-3 rounded-xl flex gap-2 items-start">
      <Info size={24} className="text-blue-500 shrink-0 mt-0.5" />
      <p className="text-xs leading-relaxed text-blue-900 font-semibold">
        {message}
      </p>
    </div>
  </div>
);

export default LeakCard;
