import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import FormGoalsPage from "./pages/FormGoalsPage";
import GoalsPage from "./pages/GoalsPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/form-goals" element={<FormGoalsPage />} />
          <Route path="/goals" element={<GoalsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
