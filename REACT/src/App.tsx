import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Analytics from "@/pages/Analytics";
import Reports from "@/pages/Reports";
import ReportViewer from "@/pages/ReportViewer";
import DataManagement from "@/pages/DataManagement";
import Users from "@/pages/Users";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import Error500 from "@/pages/Error500";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/500" element={<Error500 />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/:id" element={<ReportViewer />} />
          <Route path="/data" element={<DataManagement />} />
          <Route path="/users" element={<Users />} />
          <Route path="/permissions" element={<Settings />} />
          <Route path="/logs" element={<Settings />} />
          <Route path="/integrations" element={<Settings />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
