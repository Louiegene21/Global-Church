import React from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Paper, 
  Card, 
  CardContent, 
  Stack,
  Divider
} from '@mui/material';
import AdminSidebar from '../../components/layout/AdminSidebar';
import SermonIcon from '@mui/icons-material/Mic';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import AnnouncementIcon from '@mui/icons-material/Campaign';

const stats = [
  { label: 'Total Sermons', value: '42', icon: <SermonIcon color="primary" />, color: '#e3f2fd' },
  { label: 'Upcoming Events', value: '5', icon: <EventIcon color="secondary" />, color: '#f3e5f5' },
  { label: 'Active Pastors', value: '4', icon: <PeopleIcon color="success" />, color: '#e8f5e9' },
  { label: 'Announcements', value: '12', icon: <AnnouncementIcon color="warning" />, color: '#fff3e0' },
];

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f7fa', minHeight: '100vh' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
          Dashboard Overview
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.label}>
              <Card elevation={2}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: stat.color }}>
                      {stat.icon}
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                      <Typography variant="h5" fontWeight="bold">
                        {stat.value}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Recent Activity
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary">
                - Sermon "The Power of Grace" was uploaded by Admin.<br />
                - Annual Family Retreat event was updated.<br />
                - 2 New announcements were published today.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                System Status
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Server Status</Typography>
                <Typography variant="body2" color="success.main" fontWeight="bold">Online</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Database</Typography>
                <Typography variant="body2" color="success.main" fontWeight="bold">Healthy</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
