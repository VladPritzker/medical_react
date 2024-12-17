import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login_page/LoginPage";
import ClientDashboard from "./components/client_dashboard/ClientDashboard";
import SpecialistDashboard from "./components/specialist_dashboard/SpecialistDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/specialist" element={<SpecialistDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
