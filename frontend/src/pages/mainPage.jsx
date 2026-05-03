import Dashboard from "./dashboard";
import AddExpensePage from "./addExpense";
import ExpensesPage from "./expenses";
import InsightsPage from "./insights";
import LoginPage from "./loginPage";
import RegisterPage from "./registerPage";
import { useLocation, matchPath } from "react-router-dom";
import SidePannel from "../components/sidePannel";
import MobileNav from "../components/mobileNav";
import EditExpense from "./editExpense";

function MainPage() {
  const location = useLocation();
  const path = location.pathname;

  const isEditPage = matchPath("/editExpense/:id", path);

  return (
    <div className="lg:flex h-screen lg:min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <SidePannel />
      <MobileNav />

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 p-5 md:p-10 overflow-y-auto">
        {(path === "/dashboard" || path === "/") && <Dashboard />}
        {path === "/addExpense" && <AddExpensePage />}
        {isEditPage && <EditExpense />}
        {path === "/expenses" && <ExpensesPage />}
        {path === "/insights" && <InsightsPage />}
        {path === "/login" && <LoginPage/>}
        {path === "/register" && <RegisterPage/>}
      </main>
    </div>
  );
}

export default MainPage;
