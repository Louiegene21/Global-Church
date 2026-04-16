import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  InputBase,
  Paper,
  Typography,
  TablePagination,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  DialogContentText,
  Chip,
  Switch,
  FormControlLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminSidebar from '../../components/layout/AdminSidebar';
import type { Announcement } from '../../types';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// ==========================================
// DUMMY DATA
// ==========================================
const DUMMY_ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'Monthly Prayer Meeting',
    content: 'Join us this Saturday for our corporate prayer and worship at 6:00 PM.',
    date: '2026-04-20',
    isUrgent: true,
  },
  {
    id: '2',
    title: 'Special Offering Sunday',
    content: 'We will be having a special offering for our upcoming building renovation project.',
    date: '2026-04-27',
    isUrgent: false,
  },
  {
    id: '3',
    title: "Children's Ministry Update",
    content: 'New volunteers are needed for the Sunday School. Please reach out to Sis. Grace for details.',
    date: '2026-05-05',
    isUrgent: false,
  }
];

// ==========================================
// SUB-COMPONENT: AnnouncementTable
// ==========================================
interface TableProps {
  loading: boolean;
  announcements: Announcement[];
  search: string;
  onEdit: (announcement: Announcement) => void;
  onDelete: (id: string) => void;
}

function AnnouncementTable({
  loading,
  announcements,
  search,
  onEdit,
  onDelete,
}: TableProps) {
  const filtered = (announcements || []).filter((a) =>
    (a.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (a.content || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 1 }}>
      <Table>
        <TableHead sx={{ bgcolor: 'rgba(33, 150, 243, 0.05)' }}>
          <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
            <TableCell>Title</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Content</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <TableRow key={idx}>
                {Array.from({ length: 5 }).map((__, colIdx) => (
                  <TableCell key={colIdx}>
                    <Skeleton variant="text" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : filtered.length > 0 ? (
            filtered.map((a) => (
              <TableRow key={a.id} hover>
                <TableCell sx={{ fontWeight: '500' }}>{a.title}</TableCell>
                <TableCell>{a.date}</TableCell>
                <TableCell>
                  <Chip
                    label={a.isUrgent ? 'Urgent' : 'Normal'}
                    size="small"
                    color={a.isUrgent ? 'error' : 'primary'}
                    variant={a.isUrgent ? 'contained' : 'outlined'}
                    sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    maxWidth: 350
                  }}>
                    {a.content}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => onEdit(a)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="error" onClick={() => a.id && onDelete(a.id)} size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                No announcements found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// ==========================================
// SUB-COMPONENT: ConfirmDialog
// ==========================================
interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

function ConfirmDialog({ open, title, message, onConfirm, onCancel, loading }: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel} PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
      <DialogTitle fontWeight="bold">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCancel} color="inherit" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color={title.toLowerCase().includes('delete') ? 'error' : 'primary'} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ==========================================
// SUB-COMPONENT: AnnouncementFormDialog
// ==========================================
interface FormProps {
  open: boolean;
  onClose: () => void;
  editing: Announcement | null;
  onSave: (data: any) => void | Promise<void>;
}

function AnnouncementFormDialog({
  open,
  onClose,
  editing,
  onSave,
}: FormProps) {
  const [form, setForm] = useState({
    title: '',
    content: '',
    date: '',
    isUrgent: false,
  });

  const [innerLoading, setInnerLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (editing) {
        setForm({
          title: editing.title || '',
          content: editing.content || '',
          date: editing.date || '',
          isUrgent: !!editing.isUrgent,
        });
      } else {
        setForm({
          title: '',
          content: '',
          date: '',
          isUrgent: false,
        });
      }
    }
  }, [open, editing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDateChange = (date: any) => {
    setForm({ ...form, date: date ? dayjs(date).format('YYYY-MM-DD') : '' });
  };

  const handleUrgentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, isUrgent: e.target.checked });
  };

  const handleSubmit = async () => {
    setInnerLoading(true);
    try {
      const data = { ...form };
      if (editing?.id) {
        (data as any).id = editing.id;
      }
      await onSave(data);
      onClose();
    } catch (err) {
      console.error('❌ Error saving announcement:', err);
    } finally {
      setInnerLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle fontWeight="bold">{editing ? 'Edit Announcement' : 'Add Announcement'}</DialogTitle>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            fullWidth
            variant="outlined"
            value={form.title}
            onChange={handleChange}
            sx={{ mt: 1 }}
          />

          <Box sx={{ mt: 2, mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <DatePicker
              label="Announcement Date"
              value={form.date ? dayjs(form.date) : null}
              onChange={handleDateChange}
              slotProps={{ textField: { fullWidth: true, sx: { maxWidth: '280px' } } }}
            />
            <FormControlLabel
              control={<Switch checked={form.isUrgent} onChange={handleUrgentChange} color="error" />}
              label={<Typography variant="body2" fontWeight="700">Urgent</Typography>}
              sx={{ mr: 0 }}
            />
          </Box>

          <TextField
            margin="dense"
            label="Announcement Content"
            name="content"
            fullWidth
            variant="outlined"
            multiline
            rows={5}
            value={form.content}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} disabled={innerLoading} color="inherit">Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={innerLoading} sx={{ px: 4 }}>
            {innerLoading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </LocalizationProvider>
    </Dialog>
  );
}

// ==========================================
// MAIN COMPONENT: Announcements
// ==========================================
export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(DUMMY_ANNOUNCEMENTS);
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ title: '', message: '', onConfirm: () => { } });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleOpenForm = (announcement: Announcement | null = null) => {
    setEditing(announcement);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditing(null);
  };

  const executeSave = async (data: any) => {
    setLoading(true);
    try {
      if (editing) {
        setAnnouncements(announcements.map(a => a.id === editing.id ? { ...a, ...data } : a));
      } else {
        const newAnn = { ...data, id: String(Date.now()) };
        setAnnouncements([newAnn, ...announcements]);
      }
      handleCloseForm();
      setConfirmOpen(false);
    } catch (err) {
      console.error('❌ Failed to save announcement:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (data: any) => {
    setConfirmConfig({
      title: 'Save Announcement',
      message: 'Are you sure you want to save this announcement?',
      onConfirm: () => executeSave(data),
    });
    setConfirmOpen(true);
  };

  const executeDelete = async (id: string) => {
    setLoading(true);
    try {
      setAnnouncements(announcements.filter(a => a.id !== id));
      setConfirmOpen(false);
    } catch (err) {
      console.error('❌ Failed to delete announcement:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setConfirmConfig({
      title: 'Delete Announcement',
      message: 'Are you sure you want to delete this announcement?',
      onConfirm: () => executeDelete(id),
    });
    setConfirmOpen(true);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" mb={4} sx={{ fontWeight: 'bold' }}>
        Announcements
      </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, mt: 2 }}>
          <Paper
            elevation={0}
            sx={{
              p: '6px 16px',
              display: 'flex',
              alignItems: 'center',
              width: 450,
              borderRadius: 3,
              border: '1px solid #e0e0e0',
              bgcolor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, fontSize: '0.95rem' }}
              placeholder="Search announcements..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
            />
          </Paper>
          <Button
            variant="contained"
            onClick={() => handleOpenForm()}
            sx={{
              borderRadius: 1,
              px: 4,
              height: 48,
              fontWeight: 'bold',
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
            }}
          >
            Add Announcement
          </Button>
        </Box>

        <AnnouncementTable
          announcements={announcements}
          search={search}
          onEdit={handleOpenForm}
          onDelete={handleDelete}
          loading={loading}
        />

        <TablePagination
          component="div"
          count={announcements.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{ mt: 2 }}
        />

        <AnnouncementFormDialog
          open={openForm}
          onClose={handleCloseForm}
          onSave={handleSave}
          editing={editing}
        />

        <ConfirmDialog
          open={confirmOpen}
          title={confirmConfig.title}
          message={confirmConfig.message}
          onConfirm={confirmConfig.onConfirm}
          onCancel={() => setConfirmOpen(false)}
          loading={loading}
        />
      </Box>
    );
}
