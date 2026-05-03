import { ThreeDot } from "react-loading-indicators";

function StatCard({ label, value, loading, icon, color = "blue" }) {

  const colorMap = {
    blue: "bg-blue-50 text-blue-600 border border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    orange: "bg-orange-50 text-orange-600 border border-orange-100",
    indigo: "bg-indigo-50 text-indigo-600 border border-indigo-100",
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-start">
      <div>
        <p className="2xl:text-lg font-semibold text-gray-500 tracking-wider mb-2">
          {label}
        </p>
        {loading ? (
          <div className="h-8 flex items-center">
            <ThreeDot variant="pulsate" color="#bcbcbc" size="small" />
          </div>
        ) : (
          <p className="2xl:text-2xl font-bold text-gray-900">{value}</p>
        )}
      </div>

      {/* The Right Side Icon Box */}
      <div className={`p-3 rounded-xl ${colorMap[color] || colorMap.blue}`}>
        {icon}
      </div>
    </div>
  );
}

export default StatCard;




// import { ThreeDot } from "react-loading-indicators";

// function StatCard({ label, value, loading }) {
//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//       <p className="xl:text-lg font-medium text-gray-500 mb-2">{label}</p>
//       {loading ? (
//         <p className="text-2xl font-bold text-gray-900">
//           <ThreeDot variant="pulsate" color="#bcbcbc" size="small" />
//         </p>
//       ) : (
//         <p className="text-2xl font-bold text-gray-900">{value}</p>
//       )}
//     </div>
//   );
// }

// export default StatCard;
