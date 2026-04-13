import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Alert,
  IconButton,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { isAxiosError } from 'axios';
import logo from '../../assets/logo.jpg';
import { authService } from '../../services/api/authService';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.login(email, password);
      
      if (response.token?.access_token) {
        navigate('/admin/dashboard');
      } else {
        setError('Token not found in server response.');
      }
    } catch (err: unknown) {
      console.error('Login error:', err);
      if (isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError('Invalid email or password.');
        } else {
          setError('Unexpected server error. Please try again.');
        }
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        height: '90vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ p: 5, borderRadius: 4, textAlign: 'center' }}>
          <Box 
            sx={{ 
              width: 80, 
              height: 80, 
              margin: '0 auto 20px',
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: 3
            }}
          >
            <Box 
              component="img"
              src={logo}
              alt="Global Family Logo"
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
          
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Admin Access
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Please enter your credentials to manage church content.
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              fullWidth
              size="large"
              variant="contained"
              type="submit"
              disabled={isLoading}
              sx={{ mt: 4, py: 1.5, fontWeight: 'bold' }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
            </Button>
          </form>
          
          <Button 
            variant="text" 
            sx={{ mt: 2 }} 
            onClick={() => navigate('/')}
          >
            Back to Website
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
