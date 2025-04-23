import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GoalsPage from "./pages/GoalsPage";
import FormGoalsPage from "./pages/FormGoalsPage";
import NavBar from "./components/NavBar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <NavBar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/form-goals" element={<FormGoalsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
