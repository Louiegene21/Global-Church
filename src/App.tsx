import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';

// Layouts
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import About from './pages/public/About';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Sermons from './pages/admin/Sermons';
import Speakers from './pages/admin/Speakers';
import Members from './pages/admin/Members';
import Ministries from './pages/admin/Ministries';
import Events from './pages/admin/Events';
import Announcements from './pages/admin/Announcements';

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
            <Route path="/about" element={<About />} />

            {/* Protected Admin Routes */}
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Routes>
                      <Route index element={<Navigate to="/admin/dashboard" replace />} />
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="sermons" element={<Sermons />} />
                      <Route path="speakers" element={<Speakers />} />
                      <Route path="members" element={<Members />} />
                      <Route path="pastors" element={<Dashboard />} />
                      <Route path="events" element={<Events />} />
                      <Route path="ministries" element={<Ministries />} />
                      <Route path="announcements" element={<Announcements />} />
                    </Routes>
                  </AdminLayout>
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
