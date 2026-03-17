import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useThemeMode, getTokens } from './context/ThemeContext';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

import Dashboard from './pages/customer/Dashboard';
import Withdraw from './pages/customer/Withdraw';
import Transfer from './pages/customer/Transfer';
import Passbook from './pages/customer/Passbook';
import Loans from './pages/customer/Loans';
import EMICalculator from './pages/customer/EMICalculator';
import FixedDeposit from './pages/customer/FixedDeposit';
import RecurringDeposit from './pages/customer/RecurringDeposit';
import Beneficiaries from './pages/customer/Beneficiaries';
import Support from './pages/customer/Support';
import Profile from './pages/customer/Profile';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManageCustomers from './pages/admin/ManageCustomers';
import ManageAccounts from './pages/admin/ManageAccounts';
import ManageLoans from './pages/admin/ManageLoans';
import ManageBeneficiaries from './pages/admin/ManageBeneficiaries';
import AdminSupport from './pages/admin/AdminSupport';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Layout = ({ children }) => {
  const { isDark } = useThemeMode();
  const t = getTokens(isDark);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{
      display: 'flex', minHeight: '100vh',
      backgroundColor: isDark ? '#050b14' : '#eef2f8',
      backgroundImage: isDark ? 'none' : 'radial-gradient(ellipse at 15% 10%, rgba(11,37,69,0.05) 0%, transparent 45%), radial-gradient(ellipse at 85% 85%, rgba(22,53,104,0.04) 0%, transparent 45%)',
      transition: 'background-color 0.3s ease',
      position: 'relative',
    }}>
      {/* Subtle bg texture — dark only */}
      {isDark && (
        <Box sx={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.018,
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      )}
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: isMobile ? 0 : '250px',
          mt: '62px',
          p: { xs: 2, sm: 3, md: 3.5 },
          width: isMobile ? '100%' : 'calc(100vw - 250px)',
          minHeight: 'calc(100vh - 62px)',
          boxSizing: 'border-box',
          overflowX: 'hidden',
          position: 'relative', zIndex: 1,
          transition: 'background-color 0.3s ease',
        }}
      >
        {children}
      </Box>
      <Navbar />
    </Box>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/dashboard" element={<ProtectedRoute role="CUSTOMER"><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/withdraw" element={<ProtectedRoute role="CUSTOMER"><Layout><Withdraw /></Layout></ProtectedRoute>} />
        <Route path="/transfer" element={<ProtectedRoute role="CUSTOMER"><Layout><Transfer /></Layout></ProtectedRoute>} />
        <Route path="/passbook" element={<ProtectedRoute role="CUSTOMER"><Layout><Passbook /></Layout></ProtectedRoute>} />
        <Route path="/loans" element={<ProtectedRoute role="CUSTOMER"><Layout><Loans /></Layout></ProtectedRoute>} />
        <Route path="/emi-calculator" element={<ProtectedRoute role="CUSTOMER"><Layout><EMICalculator /></Layout></ProtectedRoute>} />
        <Route path="/fixed-deposit" element={<ProtectedRoute role="CUSTOMER"><Layout><FixedDeposit /></Layout></ProtectedRoute>} />
        <Route path="/recurring-deposit" element={<ProtectedRoute role="CUSTOMER"><Layout><RecurringDeposit /></Layout></ProtectedRoute>} />
        <Route path="/beneficiaries" element={<ProtectedRoute role="CUSTOMER"><Layout><Beneficiaries /></Layout></ProtectedRoute>} />
        <Route path="/support" element={<ProtectedRoute role="CUSTOMER"><Layout><Support /></Layout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute role="CUSTOMER"><Layout><Profile /></Layout></ProtectedRoute>} />

        <Route path="/admin/dashboard" element={<ProtectedRoute role="ADMIN"><Layout><AdminDashboard /></Layout></ProtectedRoute>} />
        <Route path="/admin/customers" element={<ProtectedRoute role="ADMIN"><Layout><ManageCustomers /></Layout></ProtectedRoute>} />
        <Route path="/admin/accounts" element={<ProtectedRoute role="ADMIN"><Layout><ManageAccounts /></Layout></ProtectedRoute>} />
        <Route path="/admin/loans" element={<ProtectedRoute role="ADMIN"><Layout><ManageLoans /></Layout></ProtectedRoute>} />
        <Route path="/admin/beneficiaries" element={<ProtectedRoute role="ADMIN"><Layout><ManageBeneficiaries /></Layout></ProtectedRoute>} />
        <Route path="/admin/support" element={<ProtectedRoute role="ADMIN"><Layout><AdminSupport /></Layout></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;