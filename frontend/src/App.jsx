import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
    <Toaster/>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<MainPage />} />
        <Route path="/register" element={<MainPage/>} />
        <Route path="/dashboard" element={<MainPage />} />
        <Route path="/addExpense" element={<MainPage />} />
        <Route path="/editExpense/:id" element={<MainPage />} />
        <Route path="/expenses" element={<MainPage />} />
        <Route path="/insights" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
