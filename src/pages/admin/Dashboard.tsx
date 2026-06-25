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
  Grid,
} from '@mui/material';
import SermonIcon from '@mui/icons-material/Mic';
import PeopleIcon from '@mui/icons-material/People';
import MinistryIcon from '@mui/icons-material/Handyman';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { adminApi } from '../../services/api/apiClient';
import { useNavigate } from 'react-router-dom';
import type { MemberType, SermonType, SpeakerType } from '../../types';

// ── StatCard ─────────────────────────────────────────────────────────────────
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
      height: '100%',
      transition: 'all 0.25s ease',
      '&:hover': { boxShadow: '0 10px 30px rgba(0,0,0,0.07)', transform: 'translateY(-2px)' },
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Stack direction="row" spacing={2.5} sx={{ alignItems: 'center' }}>
        <Box
          sx={{
            p: 1.75,
            borderRadius: 3,
            bgcolor: `${color}18`,
            color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontWeight: 700,  textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 0.5 }}
          >
            {label}
          </Typography>
          {loading ? (
            <Skeleton width="55%" height={38} />
          ) : (
            <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
              <Typography variant="h4" sx={{ fontWeight: 800 }}>
                {value}
              </Typography>
              {trend && (
                <Typography variant="caption" color="success.main" sx={{ fontWeight: 700,  display: 'flex', alignItems: 'center', gap: 0.25 }}>
                  <TrendingUpIcon sx={{ fontSize: 14 }} /> {trend}
                </Typography>
              )}
            </Stack>
          )}
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

// ── SectionHeader — module-level to avoid re-creation on every render ─────────
const SectionHeader: React.FC<{ title: string; link: string }> = ({ title, link }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 800 }}>
        {title}
      </Typography>
      <Button size="small" endIcon={<ArrowForwardIcon />} onClick={() => navigate(link)} sx={{ fontWeight: 700 }}>
        View All
      </Button>
    </Box>
  );
};

// ── Dashboard ─────────────────────────────────────────────────────────────────
interface DashboardStats {
  sermons: number;
  members: number;
  speakers: number;
  ministries: number;
}

interface RecentData {
  members: MemberType[];
  sermons: SermonType[];
  speakers: SpeakerType[];
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({ sermons: 0, members: 0, speakers: 0, ministries: 0 });
  const [recentData, setRecentData] = useState<RecentData>({ members: [], sermons: [], speakers: [] });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [sermonsRes, membersRes, speakersRes, ministriesRes] = await Promise.all([
        adminApi.get('/sermons', { params: { size: 5 } }),
        adminApi.get('/members', { params: { size: 10 } }),
        adminApi.get('/speakers', { params: { size: 5 } }),
        adminApi.get('/ministries', { params: { size: 5 } }),
      ]);

      const getCount = (res: { data: { total?: number } | unknown[] }) =>
        (res.data as { total?: number }).total ??
        (Array.isArray(res.data) ? res.data.length : 0);

      const getList = <T,>(res: { data: T[] | { data: T[] } }): T[] =>
        Array.isArray(res.data) ? res.data : ((res.data as { data: T[] }).data ?? []);

      setStats({
        sermons: getCount(sermonsRes),
        members: getCount(membersRes),
        speakers: getCount(speakersRes),
        ministries: getCount(ministriesRes),
      });

      setRecentData({
        sermons: (getList<SermonType>(sermonsRes)).slice(0, 3),
        members: (getList<MemberType>(membersRes)).slice(0, 5),
        speakers: (getList<SpeakerType>(speakersRes)).slice(0, 4),
      });
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Welcome back — here's what's happening at Global Family Church.
        </Typography>
      </Box>

      {/* Stats */}
      <Grid container spacing={3}>
        {[
          { label: 'Members', value: stats.members, icon: <GroupIcon />, color: '#2196f3', trend: '+4.2%' },
          { label: 'Sermons', value: stats.sermons, icon: <SermonIcon />, color: '#9c27b0', trend: '+2.1%' },
          { label: 'Speakers', value: stats.speakers, icon: <PeopleIcon />, color: '#2e7d32' },
          { label: 'Ministries', value: stats.ministries, icon: <MinistryIcon />, color: '#ed6c02' },
        ].map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.label}>
            <StatCard {...item} loading={loading} />
          </Grid>
        ))}
      </Grid>

      {/* Members & Sermons */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #eef2f6', height: '100%' }}>
            <SectionHeader title="Recent Members" link="/admin/members" />
            <Divider sx={{ mb: 2 }} />
            {loading ? (
              <Skeleton height={220} variant="rounded" />
            ) : (
              <List disablePadding>
                {recentData.members.map((m, idx) => (
                  <React.Fragment key={m.id}>
                    <ListItem sx={{ px: 0, py: 1.75 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: '#eff6ff', color: '#3b82f6', fontWeight: 800 }}>
                          {(m.first_name?.[0] ?? 'M').toUpperCase()}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {m.first_name} {m.last_name}
                          </Typography>
                        }
                        secondary={m.gender ?? 'Active Member'}
                      />
                      <Chip label="New" size="small" variant="outlined" color="primary" />
                    </ListItem>
                    {idx < recentData.members.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
                {recentData.members.length === 0 && (
                  <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center' }}>
                    No members yet.
                  </Typography>
                )}
              </List>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #eef2f6', height: '100%' }}>
            <SectionHeader title="Latest Sermons" link="/admin/sermons" />
            <Divider sx={{ mb: 2 }} />
            {loading ? (
              <Skeleton height={220} variant="rounded" />
            ) : (
              <Stack spacing={2.5}>
                {recentData.sermons.map((s) => (
                  <Box key={s.id} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Box sx={{ p: 1.25, borderRadius: 2, bgcolor: '#f1f5f9', flexShrink: 0 }}>
                      <SermonIcon color="primary" fontSize="small" />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="body2" noWrap sx={{ fontWeight: 700 }}>
                        {s.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(s.date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </Typography>
                    </Box>
                  </Box>
                ))}
                {recentData.sermons.length === 0 && (
                  <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center' }}>
                    No sermons yet.
                  </Typography>
                )}
              </Stack>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Speakers & Status */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #eef2f6' }}>
            <SectionHeader title="Active Speakers" link="/admin/speakers" />
            <Divider sx={{ mb: 3 }} />
            {loading ? (
              <Skeleton height={120} variant="rounded" />
            ) : (
              <Grid container spacing={2}>
                {recentData.speakers.map((s) => (
                  <Grid size={{ xs: 6 }} key={s.id}>
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                      <Avatar sx={{ width: 38, height: 38, bgcolor: '#eff6ff', color: '#3b82f6', fontWeight: 800 }}>
                        {(s.first_name?.[0] ?? 'S').toUpperCase()}
                      </Avatar>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="body2" noWrap sx={{ fontWeight: 700 }}>
                          {s.first_name} {s.last_name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {s.role ?? 'Speaker'}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                ))}
                {recentData.speakers.length === 0 && (
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                      No speakers yet.
                    </Typography>
                  </Grid>
                )}
              </Grid>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #eef2f6' }}>
            <Typography variant="h6" sx={{ fontWeight: 800,  mb: 3 }}>
              System Status
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Stack spacing={2.5}>
              {[
                { label: 'Events & Announcements', status: 'Active' },
                { label: 'Media & Sermons', status: 'Active' },
                { label: 'Member Registry', status: 'Active' },
              ].map(({ label, status }) => (
                <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CheckCircleIcon color="success" sx={{ fontSize: 18 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {label}
                    </Typography>
                  </Box>
                  <Chip label={status} size="small" color="success" variant="outlined" />
                </Box>
              ))}
            </Stack>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 3, borderRadius: 2 }}
              onClick={() => window.location.href = '/admin/announcements'}
            >
              Manage Notices
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
