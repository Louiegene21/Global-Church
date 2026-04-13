import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';

// Layouts
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Public Pages
import Home from './pages/public/Home';
import Login from './pages/public/Login';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';

import { authService } from './services/api/authService';

// Mock Auth Check (Simple placeholder)
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = authService.isAuthenticated();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isAdminPage && <Navbar />}
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      {!isAdminPage && <Footer />}
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <LayoutWrapper>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            
            {/* Placeholder routes for now */}
            <Route path="/sermons" element={<div style={{ padding: '100px', textAlign: 'center' }}>Sermons Page Coming Soon</div>} />
            <Route path="/pastors" element={<div style={{ padding: '100px', textAlign: 'center' }}>Pastors Page Coming Soon</div>} />
            <Route path="/events" element={<div style={{ padding: '100px', textAlign: 'center' }}>Events Page Coming Soon</div>} />
            <Route path="/ministries" element={<div style={{ padding: '100px', textAlign: 'center' }}>Ministries Page Coming Soon</div>} />
            <Route path="/contact" element={<div style={{ padding: '100px', textAlign: 'center' }}>Contact Page Coming Soon</div>} />

            {/* Protected Admin Routes */}
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="sermons" element={<Dashboard />} />
                    <Route path="pastors" element={<Dashboard />} />
                    <Route path="events" element={<Dashboard />} />
                    <Route path="ministries" element={<Dashboard />} />
                    <Route path="announcements" element={<Dashboard />} />
                  </Routes>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </LayoutWrapper>
      </Router>
    </ThemeProvider>
  );
};

export default App;
