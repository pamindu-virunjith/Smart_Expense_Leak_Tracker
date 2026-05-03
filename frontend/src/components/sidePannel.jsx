import {
  LayoutDashboard,
  PlusCircle,
  BarChart3,
  ListCollapseIcon,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function SidePannel() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isActive = (route) => path === route;

  // active and inactive styles
  const activeStyle =
    "flex items-center w-full gap-3 px-3 py-2 bg-white/20 rounded-lg text-white transition-all";
  const inactiveStyle =
    "flex items-center w-full gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all";

  return (
    <aside className="hidden lg:flex w-64 bg-[#111827] text-white  flex-col p-6 fixed h-full">
      <div className="flex flex-col items-center mb-10 mt-4">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-white mb-3 border border-gray-600 shadow-lg">
          <img
            src="https://img.magnific.com/premium-vector/animator-vector-character-flat-style_1033579-57808.jpg?w=360"
            alt="Profile"
            className="w-full h-full object-contain"
          />
        </div>
        {token ? (
          <>
           <div className="mb-5 text-center">
             <h4 className="font-bold">Welcome Back,</h4>
             <h3 className="capitalize">{JSON.parse(localStorage.getItem("user"))}</h3>
            <p className="text-xs text-white/70">
              {new Date().toDateString()}
            </p>
           </div>
            <button
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-sm text-sm font-semibold transition-colors cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <div className=" mb-3 text-center">
              <h4 className="font-bold">Welcome</h4>
              <h3>Guest</h3>
            </div>
            <button
              className={
                "bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-sm text-sm font-semibold transition-colors cursor-pointer"
              }
              onClick={() => navigate("/login")}
            >
              <span className="text-white">Login</span>
            </button>
          </>
        )}
      </div>

      <nav className="space-y-2">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 px-3">
          Navigate
        </p>

        <Link
          to="/dashboard"
          className={
            isActive("/dashboard") || path === "/" ? activeStyle : inactiveStyle
          }
        >
          <LayoutDashboard size={20} />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>

        <Link
          to="/addExpense"
          className={isActive("/addExpense") ? activeStyle : inactiveStyle}
        >
          <PlusCircle size={20} />
          <span className="text-sm font-medium">Add Expenses</span>
        </Link>

        <Link
          to="/expenses"
          className={isActive("/expenses") ? activeStyle : inactiveStyle}
        >
          <ListCollapseIcon size={20} />
          <span className="text-sm font-medium">Expenses</span>
        </Link>

        <Link
          to="/insights"
          className={isActive("/insights") ? activeStyle : inactiveStyle}
        >
          <BarChart3 size={20} />
          <span className="text-sm font-medium">Insights</span>
        </Link>
      </nav>
    </aside>
  );
}

export default SidePannel;
