import { ThreeDot } from "react-loading-indicators";

function StatCard({ label, value, loading }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <p className="xl:text-lg font-medium text-gray-500 mb-2">{label}</p>
      {loading ? (
        <p className="text-2xl font-bold text-gray-900">
          <ThreeDot variant="pulsate" color="#bcbcbc" size="small" />
        </p>
      ) : (
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      )}
    </div>
  );
}

export default StatCard;
