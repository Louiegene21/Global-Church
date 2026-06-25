import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';

import Home from './pages/public/Home';
import Login from './pages/public/Login';
import About from './pages/public/About';
import Sermons from './pages/public/Sermons';
import Pastors from './pages/public/Pastors';
import Events from './pages/public/Events';
import Ministries from './pages/public/Ministries';
import Contact from './pages/public/Contact';

import Dashboard from './pages/admin/Dashboard';
import AdminSermons from './pages/admin/Sermons';
import AdminSpeakers from './pages/admin/Speakers';
import Members from './pages/admin/Members';
import AdminMinistries from './pages/admin/Ministries';
import AdminEvents from './pages/admin/Events';
import Announcements from './pages/admin/Announcements';

import { authService } from './services/api/authService';

const ProtectedRoute = () => {
  return authService.isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

const PublicLayout = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isLogin && <Navbar />}
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      {!isLogin && <Footer />}
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public layout wraps all public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sermons" element={<Sermons />} />
            <Route path="/pastors" element={<Pastors />} />
            <Route path="/events" element={<Events />} />
            <Route path="/ministries" element={<Ministries />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Route>

          {/* Protected admin routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="sermons" element={<AdminSermons />} />
              <Route path="speakers" element={<AdminSpeakers />} />
              <Route path="members" element={<Members />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="ministries" element={<AdminMinistries />} />
              <Route path="announcements" element={<Announcements />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
