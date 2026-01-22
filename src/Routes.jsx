import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import AdminDashboard from './pages/admin-dashboard';
import ChatInterface from './pages/chat-interface';
import Login from './pages/login';
import UserProfileSettings from './pages/user-profile-settings';
import ConversationHistory from './pages/conversation-history';
import Register from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/chat-interface" element={<ChatInterface />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="/conversation-history" element={<ConversationHistory />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
