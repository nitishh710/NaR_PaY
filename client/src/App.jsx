import { Routes, Route } from "react-router-dom";
import GetAmount from "./pages/GetAmount";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transfer from "./pages/Transfer";
import History from "./pages/History";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/transfer" element={<Transfer />} />
      <Route path="/history" element={<History />} />
      <Route path="/get-amount" element={<GetAmount />} />
    </Routes>
  );
}
export default App;