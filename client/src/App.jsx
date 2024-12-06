import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";

import RegisterPage from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { TaskProvider } from "./context/tasksContext";
import DashboardLayoutBasic from "./components/Dashboard";

function App() {
  const location = useLocation();

  useEffect(() => {
    // Rutas donde se quiere mostrar la imagen de fondo
    const routesWithBackground = ["/", "/login", "/register"];
    if (routesWithBackground.includes(location.pathname)) {
      document.body.classList.add("not-authenticated");
      document.body.classList.remove("authenticated");
    } else {
      document.body.classList.add("authenticated");
      document.body.classList.remove("not-authenticated");
    }
  }, [location.pathname]);

  return (
    <main className="container content-container px-10 md:px-0">
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayoutBasic />} />
        </Route>
      </Routes>
    </main>
  );
}

function Root() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default Root;
