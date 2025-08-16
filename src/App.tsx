import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import UserLayout from "./components/layout/UserLayout";
import LoginPage from "./components/auth/LoginPage";
import Dashboard from "./pages/Dashboard";
import CompareVillages from "./pages/CompareVillages";
import UpdateStatus from "./pages/UpdateStatus";
import Analytics from "./pages/Analytics";
import CropAdvisor from "./pages/CropAdvisor";
import CostEstimator from "./pages/CostEstimator";
import UserDashboard from "./pages/user/UserDashboard";
import Chatbot from "./pages/user/Chatbot";
import ReportIssue from "./pages/user/ReportIssue";
import StatusTracker from "./pages/user/StatusTracker";
import UserCropAdvisor from "./pages/user/UserCropAdvisor";
import EduPath from "./pages/user/EduPath";
import UserInsights from "./pages/user/UserInsights";
import SoulScan from "./pages/user/SoulScan";
import SoulScanInsights from "./pages/SoulScanInsights";
import Web3Dashboard from "./pages/Web3Dashboard";
import DAOVoting from "./pages/user/DAOVoting";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [userType, setUserType] = useState<'admin' | 'user' | null>(() => {
    // Check for persisted session
    const saved = localStorage.getItem('demo_session');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (type: 'admin' | 'user') => {
    setUserType(type);
    localStorage.setItem('demo_session', JSON.stringify(type));
  };

  const handleLogout = () => {
    setUserType(null);
    localStorage.removeItem('demo_session');
  };

  if (!userType) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <LoginPage onLogin={handleLogin} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Admin Routes */}
            {userType === 'admin' && (
              <>
                <Route path="/" element={
                  <AdminLayout onLogout={handleLogout}>
                    <Dashboard />
                  </AdminLayout>
                } />
                <Route path="/compare" element={
                  <AdminLayout onLogout={handleLogout}>
                    <CompareVillages />
                  </AdminLayout>
                } />
                <Route path="/update-status" element={
                  <AdminLayout onLogout={handleLogout}>
                    <UpdateStatus />
                  </AdminLayout>
                } />
                <Route path="/analytics" element={
                  <AdminLayout onLogout={handleLogout}>
                    <Analytics />
                  </AdminLayout>
                } />
                <Route path="/crop-advisor" element={
                  <AdminLayout onLogout={handleLogout}>
                    <CropAdvisor />
                  </AdminLayout>
                } />
                <Route path="/cost-estimator" element={
                  <AdminLayout onLogout={handleLogout}>
                    <CostEstimator />
                  </AdminLayout>
                } />
                <Route path="/soulscan-insights" element={
                  <AdminLayout onLogout={handleLogout}>
                    <SoulScanInsights />
                  </AdminLayout>
                } />
                <Route path="/web3-dashboard" element={
                  <AdminLayout onLogout={handleLogout}>
                    <Web3Dashboard />
                  </AdminLayout>
                } />
              </>
            )}
            
            {/* User Routes */}
            {userType === 'user' && (
              <>
                <Route path="/" element={
                  <UserLayout onLogout={handleLogout}>
                    <UserDashboard />
                  </UserLayout>
                } />
                <Route path="/user" element={
                  <UserLayout onLogout={handleLogout}>
                    <UserDashboard />
                  </UserLayout>
                } />
                <Route path="/user/chatbot" element={
                  <UserLayout onLogout={handleLogout}>
                    <Chatbot />
                  </UserLayout>
                } />
                <Route path="/user/report" element={
                  <UserLayout onLogout={handleLogout}>
                    <ReportIssue />
                  </UserLayout>
                } />
                <Route path="/user/status" element={
                  <UserLayout onLogout={handleLogout}>
                    <StatusTracker />
                  </UserLayout>
                } />
                <Route path="/user/crop-advisor" element={
                  <UserLayout onLogout={handleLogout}>
                    <UserCropAdvisor />
                  </UserLayout>
                } />
                <Route path="/user/edupath" element={
                  <UserLayout onLogout={handleLogout}>
                    <EduPath />
                  </UserLayout>
                } />
                <Route path="/user/insights" element={
                  <UserLayout onLogout={handleLogout}>
                    <UserInsights />
                  </UserLayout>
                } />
                <Route path="/user/soulscan" element={
                  <UserLayout onLogout={handleLogout}>
                    <SoulScan />
                  </UserLayout>
                } />
                <Route path="/user/dao-voting" element={
                  <UserLayout onLogout={handleLogout}>
                    <DAOVoting />
                  </UserLayout>
                } />
              </>
            )}
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;