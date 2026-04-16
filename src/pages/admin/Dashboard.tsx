import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Stack,
  Divider,
  Avatar,
  Skeleton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Button,
  Grid
} from '@mui/material';
import SermonIcon from '@mui/icons-material/Mic';
import PeopleIcon from '@mui/icons-material/People';
import MinistryIcon from '@mui/icons-material/Handyman';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import AnnouncementIcon from '@mui/icons-material/Campaign';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getAxiosInstance } from '../../services/api/apiClient';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

// ==========================================
// SUB-COMPONENT: StatCard
// ==========================================
interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: string;
  loading: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color, trend, loading }) => (
  <Card
    elevation={0}
    sx={{
      borderRadius: 4,
      border: '1px solid #eef2f6',
      transition: 'all 0.3s ease',
      height: '100%',
      width: '100%',
      '&:hover': {
        boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
        transform: 'translateY(-2px)'
      }
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Stack direction="row" spacing={3} alignItems="center">
        <Box
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: `${color}15`,
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body2" color="text.secondary" fontWeight="600" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, mb: 0.5 }}>
            {label}
          </Typography>
          {loading ? (
            <Skeleton width="60%" height={40} />
          ) : (
            <Stack direction="row" alignItems="baseline" spacing={1}>
              <Typography variant="h4" fontWeight="800">
                {value}
              </Typography>
              {trend && (
                <Typography variant="caption" color="success.main" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <TrendingUpIcon fontSize="inherit" /> {trend}
                </Typography>
              )}
            </Stack>
          )}
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

// ==========================================
// MAIN COMPONENT: Dashboard
// ==========================================
const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    sermons: 0,
    members: 0,
    speakers: 0,
    ministries: 0,
    events: 0,
    announcements: 0
  });

  const [recentData, setRecentData] = useState({
    members: [] as any[],
    sermons: [] as any[],
    speakers: [] as any[],
    ministries: [] as any[],
    events: [] as any[],
    announcements: [] as any[]
  });

  const axiosInstance = getAxiosInstance();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Parallel fetching for all modules
      const [sermonsRes, membersRes, speakersRes, ministriesRes] = await Promise.all([
        axiosInstance.get('/sermons', { params: { size: 5 } }),
        axiosInstance.get('/members', { params: { size: 10 } }),
        axiosInstance.get('/speakers', { params: { size: 5 } }),
        axiosInstance.get('/ministries', { params: { size: 5 } })
      ]);

      const getCount = (res: any) => res.data.total || (Array.isArray(res.data) ? res.data.length : 0);
      const getList = (res: any) => Array.isArray(res.data) ? res.data : (res.data.data || []);

      setStats({
        sermons: getCount(sermonsRes),
        members: getCount(membersRes),
        speakers: getCount(speakersRes),
        ministries: getCount(ministriesRes),
        events: 3, // Dummy count for now
        announcements: 3 // Dummy count for now
      });

      setRecentData({
        sermons: getList(sermonsRes).slice(0, 3),
        members: getList(membersRes).slice(0, 5),
        speakers: getList(speakersRes).slice(0, 4),
        ministries: getList(ministriesRes).slice(0, 4),
        events: [], // Would fetch if real
        announcements: [] // Would fetch if real
      });

    } catch (err) {
      console.error('❌ Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }, [axiosInstance]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const SectionHeader = ({ title, link }: { title: string, link: string }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography variant="h6" fontWeight="800">
        {title}
      </Typography>
      <Button 
        size="small" 
        endIcon={<ArrowForwardIcon />} 
        onClick={() => navigate(link)}
        sx={{ fontWeight: 'bold', textTransform: 'none' }}
      >
        View All
      </Button>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        Dashboard
      </Typography>
      
      {/* 1. Statistics Row */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'space-between' }}>
        {[
          { label: 'Members', value: stats.members, icon: <GroupIcon fontSize="large" />, color: '#2196f3', trend: '4.2%' },
          { label: 'Sermons', value: stats.sermons, icon: <SermonIcon fontSize="large" />, color: '#9c27b0', trend: '2.1%' },
          { label: 'Speakers', value: stats.speakers, icon: <PeopleIcon fontSize="large" />, color: '#2e7d32' },
          { label: 'Ministries', value: stats.ministries, icon: <MinistryIcon fontSize="large" />, color: '#ed6c02' },
        ].map((item) => (
          <Box key={item.label} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 24px)', md: '1 1 calc(25% - 24px)' }, minWidth: '220px' }}>
            <StatCard {...item} loading={loading} />
          </Box>
        ))}
      </Box>

      {/* 2. Primary Management Row (Members & Sermons) */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3 }}>
        {/* Latest Members */}
        <Box sx={{ flex: 1.5 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 5, border: '1px solid #eef2f6' }}>
            <SectionHeader title="Recent Member Activity" link="/admin/members" />
            <Divider sx={{ mb: 2 }} />
            {loading ? <Skeleton height={200} /> : (
              <List disablePadding>
                {recentData.members.map((m, idx) => (
                  <React.Fragment key={m.id}>
                    <ListItem sx={{ px: 0, py: 2 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: '#eff6ff', color: '#3b82f6', fontWeight: 'bold' }}>
                          {(m.first_name?.[0] || 'M').toUpperCase()}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary={<Typography variant="body1" fontWeight="700">{m.first_name} {m.last_name}</Typography>}
                        secondary={`Registry: ${m.gender || 'Active Member'}`}
                      />
                      <Chip label="New" size="small" variant="outlined" color="primary" />
                    </ListItem>
                    {idx < recentData.members.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Box>

        {/* Latest Sermons */}
        <Box sx={{ flex: 1 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 5, border: '1px solid #eef2f6' }}>
            <SectionHeader title="Latest Sermons" link="/admin/sermons" />
            <Divider sx={{ mb: 2 }} />
            {loading ? <Skeleton height={200} /> : (
              <Stack spacing={2.5}>
                {recentData.sermons.map(s => (
                  <Box key={s.id} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: '#f1f5f9' }}><SermonIcon color="secondary" /></Box>
                    <Box>
                      <Typography variant="body2" fontWeight="700" noWrap sx={{ maxWidth: 200 }}>{s.title}</Typography>
                      <Typography variant="caption" color="text.secondary">{s.date}</Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            )}
          </Paper>
        </Box>
      </Box>

      {/* 3. Secondary Modules Row (Speakers & Ministries) */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3 }}>
        {/* Speakers */}
        <Box sx={{ flex: 1 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 5, border: '1px solid #eef2f6' }}>
            <SectionHeader title="Active Speakers" link="/admin/speakers" />
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={2}>
              {loading ? <Skeleton width="100%" height={100} /> : recentData.speakers.map(s => (
                <Grid item xs={6} key={s.id}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ width: 40, height: 40 }} />
                    <Box>
                      <Typography variant="body2" fontWeight="700" noWrap>{s.first_name}</Typography>
                      <Typography variant="caption" color="text.secondary">Speaker</Typography>
                    </Box>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>

        {/* System Status */}
        <Box sx={{ flex: 1 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 5, border: '1px solid #eef2f6', bgcolor: 'white' }}>
            <Typography variant="h6" fontWeight="800" sx={{ mb: 3 }}>
              Network & Announcements
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckCircleIcon color="success" sx={{ fontSize: 20 }} />
                  <Typography variant="body2" fontWeight="600">Events & Announcements</Typography>
                </Box>
                <Chip label="Sync Active" size="small" color="success" variant="outlined" />
              </Box>
              <Typography variant="caption" color="text.secondary">
                You have 3 upcoming events and 2 urgent announcements currently active.
              </Typography>
              <Button 
                variant="outlined" 
                fullWidth 
                sx={{ mt: 2, borderRadius: 2, textTransform: 'none' }}
                onClick={() => navigate('/admin/announcements')}
              >
                Manage Notices
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Box>

    </Box>
  );
};

export default Dashboard;
