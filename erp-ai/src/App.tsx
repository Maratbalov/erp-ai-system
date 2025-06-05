import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { LoginPage } from './pages/LoginPage';

function AppRoutes() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/" />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<div>Товары - в разработке</div>} />
        <Route path="orders" element={<div>Заказы - в разработке</div>} />
        <Route path="clients" element={<div>Клиенты - в разработке</div>} />
        <Route path="warehouse" element={<div>Склады - в разработке</div>} />
        <Route path="reports" element={<div>Отчеты - в разработке</div>} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
