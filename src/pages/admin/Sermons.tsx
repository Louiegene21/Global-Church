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
  Autocomplete,
  CircularProgress,
  DialogContentText,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { adminApi } from '../../services/api/apiClient';
import type { SermonType, SpeakerType } from '../../types';

// ── SermonTable ───────────────────────────────────────────────────────────────
interface SermonTableProps {
  loading: boolean;
  sermons: SermonType[];
  search: string;
  onEdit: (sermon: SermonType) => void;
  onDelete: (id: string) => void;
  speakers: SpeakerType[];
}

function SermonTable({ loading, sermons, search, onEdit, onDelete, speakers }: SermonTableProps) {
  const filtered = sermons.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  const getSpeakerName = (id?: string): string => {
    if (!id) return '—';
    const speaker = speakers.find((s) => s.id === id);
    return speaker ? `${speaker.first_name} ${speaker.last_name}` : '—';
  };

  return (
    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: '1px solid #eef2f6' }}>
      <Table>
        <TableHead sx={{ bgcolor: '#f8fafc' }}>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Speaker</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Watch</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <TableRow key={idx}>
                {Array.from({ length: 7 }).map((__, col) => (
                  <TableCell key={col}>
                    <Skeleton variant="text" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : filtered.length > 0 ? (
            filtered.map((s) => (
              <TableRow key={s.id} hover>
                <TableCell sx={{ fontWeight: 600 }}>{s.title}</TableCell>
                <TableCell>{getSpeakerName(s.speaker_id)}</TableCell>
                <TableCell>
                  {s.date
                    ? new Date(s.date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })
                    : '—'}
                </TableCell>
                <TableCell>{s.duration ? `${s.duration} min` : '—'}</TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      maxWidth: 200,
                    }}
                  >
                    {s.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  {s.watch_url ? (
                    <a
                      href={s.watch_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#1976d2', fontWeight: 600, textDecoration: 'none', fontSize: '0.875rem' }}
                    >
                      Watch
                    </a>
                  ) : (
                    '—'
                  )}
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => onEdit(s)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(s.id)} size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                No sermons found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// ── ConfirmDialog ─────────────────────────────────────────────────────────────
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
    <Dialog open={open} onClose={onCancel} slotProps={{ paper: { sx: { borderRadius: 3, p: 1 } } }}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCancel} color="inherit" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error" disabled={loading}>
          {loading ? <CircularProgress size={22} color="inherit" /> : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ── SermonFormDialog ──────────────────────────────────────────────────────────
interface FormProps {
  open: boolean;
  onClose: () => void;
  editing: SermonType | null;
  onSave: (formData: FormData) => Promise<void>;
  speakers: SpeakerType[];
  saving: boolean;
}

function SermonFormDialog({ open, onClose, editing, onSave, speakers, saving }: FormProps) {
  const [form, setForm] = useState({
    title: '', speaker_id: '', date: '', duration: '', description: '', watch_url: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    if (editing) {
      setForm({
        title: editing.title ?? '',
        speaker_id: editing.speaker_id ?? '',
        date: editing.date ?? '',
        duration: editing.duration ?? '',
        description: editing.description ?? '',
        watch_url: editing.watch_url ?? '',
      });
      setPreviewUrl(editing.thumbnail_url ?? null);
    } else {
      setForm({ title: '', speaker_id: '', date: '', duration: '', description: '', watch_url: '' });
      setPreviewUrl(null);
    }
    setImageFile(null);
  }, [open, editing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Dayjs | null) => {
    setForm((prev) => ({ ...prev, date: date ? date.format('YYYY-MM-DD') : '' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (imageFile) formData.append('image', imageFile);
    if (editing?.id) formData.append('id', editing.id);
    await onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>{editing ? 'Edit Sermon' : 'Add Sermon'}</DialogTitle>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DialogContent>
          <TextField margin="dense" label="Title" name="title" fullWidth value={form.title} onChange={handleChange} />

          <Autocomplete
            options={speakers}
            getOptionLabel={(o) => `${o.first_name} ${o.last_name}`}
            isOptionEqualToValue={(o, v) => o.id === v.id}
            value={speakers.find((s) => s.id === form.speaker_id) ?? null}
            onChange={(_, val) => setForm((prev) => ({ ...prev, speaker_id: val?.id ?? '' }))}
            renderInput={(params) => (
              <TextField {...params} margin="dense" label="Speaker" fullWidth />
            )}
          />

          <DatePicker
            label="Date"
            value={form.date ? dayjs(form.date) : null}
            onChange={handleDateChange}
            slotProps={{ textField: { fullWidth: true, margin: 'dense' } }}
          />

          <TextField
            margin="dense" label="Duration (mins)" name="duration"
            placeholder="e.g. 45" fullWidth value={form.duration} onChange={handleChange}
          />
          <TextField
            margin="dense" label="Description" name="description"
            fullWidth multiline rows={3} value={form.description} onChange={handleChange}
          />
          <TextField
            margin="dense" label="Watch URL" name="watch_url"
            placeholder="https://youtube.com/..." fullWidth value={form.watch_url} onChange={handleChange}
          />

          <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ fontWeight: 700,  textTransform: 'uppercase', letterSpacing: 1, color: 'text.secondary' }}>
              Sermon Thumbnail
            </Typography>
            <Button variant="outlined" component="label" size="small" sx={{ borderRadius: 2 }}>
              Choose Image
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </Button>
          </Box>

          {previewUrl && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="text.secondary">
                {imageFile ? `Selected: ${imageFile.name}` : 'Current thumbnail'}
              </Typography>
              <Box
                component="img"
                src={previewUrl}
                alt="Sermon thumbnail"
                sx={{ display: 'block', mt: 1, width: '100%', height: 160, objectFit: 'cover', borderRadius: 2 }}
              />
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} disabled={saving} color="inherit">Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={saving} sx={{ px: 4 }}>
            {saving ? <CircularProgress size={22} color="inherit" /> : 'Save'}
          </Button>
        </DialogActions>
      </LocalizationProvider>
    </Dialog>
  );
}

// ── Main Sermons Page ─────────────────────────────────────────────────────────
export default function AdminSermons() {
  const [sermons, setSermons] = useState<SermonType[]>([]);
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<SermonType | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [speakers, setSpeakers] = useState<SpeakerType[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalSermons, setTotalSermons] = useState(0);

  const fetchSermons = useCallback(async (q = '') => {
    setLoading(true);
    try {
      const res = await adminApi.get('/sermons', {
        params: { page: page + 1, size: rowsPerPage, search: q.trim() },
      });
      const raw = res.data;
      const data: SermonType[] = Array.isArray(raw) ? raw : (raw?.data ?? []);
      setSermons(data);
      setTotalSermons(raw?.total ?? data.length);
    } catch (err) {
      console.error('Failed to fetch sermons:', err);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage]);

  const fetchSpeakers = useCallback(async () => {
    try {
      const res = await adminApi.get('/speakers');
      setSpeakers(Array.isArray(res.data) ? res.data : (res.data?.data ?? []));
    } catch (err) {
      console.error('Failed to fetch speakers:', err);
    }
  }, []);

  useEffect(() => { fetchSpeakers(); }, [fetchSpeakers]);
  useEffect(() => { fetchSermons(search); }, [fetchSermons, search, page, rowsPerPage]);

  const handleSave = async (formData: FormData) => {
    setSaving(true);
    try {
      if (editing) {
        await adminApi.post(`/sermons/${editing.id}`, formData, {
          params: { _method: 'PUT' },
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await adminApi.post('/sermons', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      setOpenForm(false);
      setEditing(null);
      await fetchSermons(search);
    } catch (err) {
      console.error('Failed to save sermon:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    setDeleting(true);
    try {
      await adminApi.delete(`/sermons/${deletingId}`);
      setConfirmOpen(false);
      setDeletingId(null);
      await fetchSermons(search);
    } catch (err) {
      console.error('Failed to delete sermon:', err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" sx={{ fontWeight: 800,  mb: 1 }}>
        Sermons
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Manage and publish sermon recordings and messages.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Paper
          elevation={0}
          sx={{
            px: 2, py: 0.75,
            display: 'flex', alignItems: 'center', gap: 1,
            width: 420, borderRadius: 3,
            border: '1px solid #e2e8f0',
            bgcolor: 'white',
          }}
        >
          <SearchIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
          <InputBase
            sx={{ flex: 1, fontSize: '0.9375rem' }}
            placeholder="Search sermons..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
          />
        </Paper>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => { setEditing(null); setOpenForm(true); }}
          sx={{ borderRadius: 2, px: 3, height: 44, fontWeight: 700 }}
        >
          Add Sermon
        </Button>
      </Box>

      <SermonTable
        sermons={sermons}
        search={search}
        onEdit={(s) => { setEditing(s); setOpenForm(true); }}
        onDelete={(id) => { setDeletingId(id); setConfirmOpen(true); }}
        loading={loading}
        speakers={speakers}
      />

      <TablePagination
        component="div"
        count={totalSermons}
        page={page}
        onPageChange={(_, p) => setPage(p)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{ mt: 2 }}
      />

      <SermonFormDialog
        open={openForm}
        onClose={() => { setOpenForm(false); setEditing(null); }}
        onSave={handleSave}
        editing={editing}
        speakers={speakers}
        saving={saving}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Sermon"
        message="Are you sure you want to delete this sermon? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => { setConfirmOpen(false); setDeletingId(null); }}
        loading={deleting}
      />
    </Box>
  );
}
