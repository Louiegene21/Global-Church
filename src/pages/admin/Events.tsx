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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminSidebar from '../../components/layout/AdminSidebar';
import { getAxiosInstance } from '../../services/api/apiClient';
import type { Event } from '../../types';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

// ==========================================
// DUMMY DATA
// ==========================================
const DUMMY_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Annual Family Retreat',
    description: 'A time for families to gather, grow, and have fun together in faith.',
    date: '2026-06-15',
    time: '08:00 AM',
    location: 'Mountain View Resort',
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300'
  },
  {
    id: '2',
    title: 'Youth Night Explosion',
    description: 'Energetic worship and powerful message for the next generation.',
    date: '2026-05-20',
    time: '06:30 PM',
    location: 'Main Sanctuary',
    imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94'
  },
  {
    id: '3',
    title: 'Leadership Conference 2026',
    description: 'Equipping deacons and ministry leaders for a greater impact.',
    date: '2026-08-10',
    time: '09:00 AM',
    location: 'Community Hall',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2'
  }
];

// ==========================================
// SUB-COMPONENT: EventTable
// ==========================================
interface EventTableProps {
  loading: boolean;
  events: Event[];
  search: string;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

function EventTable({
  loading,
  events,
  search,
  onEdit,
  onDelete,
}: EventTableProps) {
  const filtered = (events || []).filter((e) =>
    (e.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (e.location || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 1 }}>
      <Table>
        <TableHead sx={{ bgcolor: 'rgba(33, 150, 243, 0.05)' }}>
          <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
            <TableCell>Title</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <TableRow key={idx}>
                {Array.from({ length: 6 }).map((__, colIdx) => (
                  <TableCell key={colIdx}>
                    <Skeleton variant="text" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : filtered.length > 0 ? (
            filtered.map((e) => (
              <TableRow key={e.id} hover>
                <TableCell sx={{ fontWeight: '500' }}>{e.title}</TableCell>
                <TableCell>{e.date}</TableCell>
                <TableCell>{e.time}</TableCell>
                <TableCell>{e.location}</TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    maxWidth: 250
                  }}>
                    {e.description}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => onEdit(e)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="error" onClick={() => e.id && onDelete(e.id)} size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                No events found.
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
// SUB-COMPONENT: EventFormDialog
// ==========================================
interface FormProps {
  open: boolean;
  onClose: () => void;
  editing: Event | null;
  onSave: (data: any) => void | Promise<void>;
}

function EventFormDialog({
  open,
  onClose,
  editing,
  onSave,
}: FormProps) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [innerLoading, setInnerLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (editing) {
        setForm({
          title: editing.title || '',
          description: editing.description || '',
          date: editing.date || '',
          time: editing.time || '',
          location: editing.location || '',
        });
        setPreviewUrl(editing.imageUrl || null);
      } else {
        setForm({
          title: '',
          description: '',
          date: '',
          time: '',
          location: '',
        });
        setPreviewUrl(null);
      }
      setImageFile(null);
    }
  }, [open, editing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDateChange = (date: any) => {
    setForm({ ...form, date: date ? dayjs(date).format('YYYY-MM-DD') : '' });
  };

  const handleTimeChange = (time: any) => {
    setForm({ ...form, time: time ? dayjs(time).format('hh:mm A') : '' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setInnerLoading(true);
    try {
      const data = { ...form };
      if (editing?.id) {
        (data as any).id = editing.id;
      }
      // If we were using actual FormData for API:
      // const formData = new FormData();
      // formData.append('image', imageFile); ...
      
      await onSave(data);
      onClose();
    } catch (err) {
      console.error('❌ Error saving event:', err);
    } finally {
      setInnerLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle fontWeight="bold">{editing ? 'Edit Event' : 'Add Event'}</DialogTitle>
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
          <TextField
            margin="dense"
            label="Location"
            name="location"
            fullWidth
            variant="outlined"
            value={form.location}
            onChange={handleChange}
          />
          
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 1 }}>
            <DatePicker
              label="Date"
              value={form.date ? dayjs(form.date) : null}
              onChange={handleDateChange}
              slotProps={{ textField: { fullWidth: true } }}
            />
            <TimePicker
              label="Time"
              value={form.time ? dayjs(form.time, 'hh:mm A') : null}
              onChange={handleTimeChange}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Box>

          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={form.description}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />

          <Box mt={4} sx={{ borderTop: '1px solid #eee', pt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" fontWeight="900" sx={{ textTransform: 'uppercase', color: 'text.secondary' }}>
              Event Promotional Image
            </Typography>
            <Button variant="contained" component="label" disableElevation sx={{ textTransform: 'none', borderRadius: 1, bgcolor: '#4dabf5' }}>
              Choose Image
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </Button>
          </Box>

          {previewUrl && (
            <Box mt={2}>
              <img src={previewUrl} alt="Preview" style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 8 }} />
            </Box>
          )}
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
// MAIN COMPONENT: Events
// ==========================================
export default function Events() {
  const [events, setEvents] = useState<Event[]>(DUMMY_EVENTS);
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ title: '', message: '', onConfirm: () => { } });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Simulation of fetching (since we use dummy data)
  const fetchEvents = useCallback(
    async (searchQuery: string = '') => {
      setLoading(true);
      // Simulate network delay
      setTimeout(() => {
        setLoading(false);
      }, 500);
    },
    []
  );

  useEffect(() => {
    fetchEvents(search);
  }, [fetchEvents, search]);

  const handleOpenForm = (event: Event | null = null) => {
    setEditing(event);
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
        // Simulation of update
        setEvents(events.map(e => e.id === editing.id ? { ...e, ...data } : e));
      } else {
        // Simulation of create
        const newEvent = { ...data, id: String(Date.now()) };
        setEvents([newEvent, ...events]);
      }
      handleCloseForm();
      setConfirmOpen(false);
    } catch (err) {
      console.error('❌ Failed to save event:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (data: any) => {
    setConfirmConfig({
      title: 'Save Event',
      message: 'Are you sure you want to save this event?',
      onConfirm: () => executeSave(data),
    });
    setConfirmOpen(true);
  };

  const executeDelete = async (id: string) => {
    setLoading(true);
    try {
      setEvents(events.filter(e => e.id !== id));
      setConfirmOpen(false);
    } catch (err) {
      console.error('❌ Failed to delete event:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setConfirmConfig({
      title: 'Delete Event',
      message: 'Are you sure you want to delete this event?',
      onConfirm: () => executeDelete(id),
    });
    setConfirmOpen(true);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" mb={4} sx={{ fontWeight: 'bold' }}>
        Events
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
              placeholder="Search by title or location..."
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
            Add Event
          </Button>
        </Box>

        <EventTable
          events={events}
          search={search}
          onEdit={handleOpenForm}
          onDelete={handleDelete}
          loading={loading}
        />

        <TablePagination
          component="div"
          count={events.length}
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

        <EventFormDialog
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
