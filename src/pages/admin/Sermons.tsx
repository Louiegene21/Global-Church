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
  CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminSidebar from '../../components/layout/AdminSidebar';
import { getAxiosInstance } from '../../services/api/apiClient';
import type { SermonType, SpeakerType } from '../../types';

// ==========================================
// SUB-COMPONENT: SermonTable
// ==========================================
interface SermonTableProps {
  loading: boolean;
  sermons: SermonType[];
  search: string;
  onEdit: (sermon: SermonType) => void;
  onDelete: (id: number) => void;
  speakers: SpeakerType[];
}

function SermonTable({
  loading,
  sermons,
  search,
  onEdit,
  onDelete,
  speakers,
}: SermonTableProps) {
  const filtered = sermons.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  const getSpeakerName = (id: string | number): string => {
    const speaker = speakers.find((s) => String(s.id) === String(id));
    return speaker ? `${speaker.first_name} ${speaker.last_name}` : 'Unknown';
  };

  return (
    <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 1 }}>
      <Table>
        <TableHead sx={{ bgcolor: 'rgba(33, 150, 243, 0.05)' }}>
          <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
            <TableCell>Title</TableCell>
            <TableCell>Speaker</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Duration (mins)</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Watch URL</TableCell>
            <TableCell>Image URL</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <TableRow key={idx}>
                {Array.from({ length: 8 }).map((__, colIdx) => (
                  <TableCell key={colIdx}>
                    <Skeleton variant="text" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : filtered.length > 0 ? (
            filtered.map((s) => (
              <TableRow key={s.id} hover>
                <TableCell sx={{ fontWeight: '500' }}>{s.title}</TableCell>
                <TableCell>{getSpeakerName(s.speaker_id)}</TableCell>
                <TableCell>{s.date}</TableCell>
                <TableCell>{s.duration}</TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    maxWidth: 200
                  }}>
                    {s.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  <a href={s.watch_url} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>
                    Link
                  </a>
                </TableCell>
                <TableCell>
                  <a href={s.image_url_address} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>
                    View Image
                  </a>
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => onEdit(s)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="error" onClick={() => s.id && onDelete(Number(s.id))} size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center" sx={{ py: 5 }}>
                No sermons found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// ==========================================
// SUB-COMPONENT: SermonFormDialog
// ==========================================
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

interface FormProps {
  open: boolean;
  onClose: () => void;
  editing: SermonType | null;
  onSave: (formData: FormData) => void | Promise<void>;
  speakers: SpeakerType[];
}

function SermonFormDialog({
  open,
  onClose,
  editing,
  onSave,
  speakers,
}: FormProps) {
  const [form, setForm] = useState({
    title: '',
    speaker_id: '',
    date: '',
    duration: '',
    description: '',
    watch_url: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (editing) {
        setForm({
          title: editing.title || '',
          speaker_id: String(editing.speaker_id) || '',
          date: editing.date || '',
          duration: editing.duration || '',
          description: editing.description || '',
          watch_url: editing.watch_url || '',
        });
        setPreviewUrl(editing.image_url_address || editing.image_url || null);
      } else {
        setForm({
          title: '',
          speaker_id: '',
          date: '',
          duration: '',
          description: '',
          watch_url: '',
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (imageFile) {
        formData.append('image', imageFile);
      }
      if (editing?.id) {
        formData.append('id', String(editing.id));
      }

      await onSave(formData);
      onClose();
    } catch (err) {
      console.error('❌ Error saving sermon:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle fontWeight="bold">{editing ? 'Edit Sermon' : 'Add Sermon'}</DialogTitle>
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
          />

          <Autocomplete
            options={speakers}
            getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
            isOptionEqualToValue={(option, value) => String(option.id) === String(value.id)}
            value={speakers.find((s) => String(s.id) === String(form.speaker_id)) || null}
            onChange={(_, newValue) =>
              setForm({ ...form, speaker_id: newValue ? String(newValue.id) : '' })
            }
            renderInput={(params) => (
              <TextField {...params} margin="dense" label="Speaker" fullWidth variant="outlined" />
            )}
          />

          <DatePicker
            label="Date"
            value={form.date ? dayjs(form.date) : null}
            onChange={handleDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: 'dense',
                variant: 'outlined'
              }
            }}
          />

          <TextField
            margin="dense"
            label="Duration (mins)"
            name="duration"
            placeholder="e.g. 45"
            fullWidth
            variant="outlined"
            value={form.duration}
            onChange={handleChange}
          />
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
          />
          <TextField
            margin="dense"
            label="Watch URL"
            name="watch_url"
            placeholder="https://youtube.com/..."
            fullWidth
            variant="outlined"
            value={form.watch_url}
            onChange={handleChange}
          />

          <Box mt={4} sx={{ borderTop: '1px solid #eee', pt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" fontWeight="900" sx={{ textTransform: 'uppercase', letterSpacing: 1, color: 'text.secondary' }}>
              Upload Sermon Image
            </Typography>
            <Button
              variant="contained"
              component="label"
              disableElevation
              sx={{
                textTransform: 'none',
                borderRadius: 1,
                px: 3,
                bgcolor: '#4dabf5',
                '&:hover': { bgcolor: '#2196f3' }
              }}
            >
              Choose Image
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </Button>
          </Box>

          {previewUrl && (
            <Box mt={2} sx={{ position: 'relative' }}>
              <Typography variant="caption" color="text.secondary">
                {imageFile ? `Selected: ${imageFile.name}` : 'Current Image'}
              </Typography>
              <Box mt={1}>
                <img
                  src={previewUrl}
                  alt="Sermon Preview"
                  style={{ width: '100%', maxWidth: '100%', height: 160, objectFit: 'cover', borderRadius: 8 }}
                />
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} disabled={loading} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} disabled={loading} sx={{ px: 4 }}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
          </Button>
        </DialogActions>
      </LocalizationProvider>
    </Dialog>
  );
}

// ==========================================
// MAIN COMPONENT: SermonMinistry (Sermons page)
// ==========================================
export default function Sermons() {
  const [sermons, setSermons] = useState<SermonType[]>([]);
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<SermonType | null>(null);
  const [loading, setLoading] = useState(false);
  const [speakers, setSpeakers] = useState<SpeakerType[]>([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalSermons, setTotalSermons] = useState(0);

  const axiosInstance = getAxiosInstance();

  const fetchSermons = useCallback(
    async (searchQuery: string = '') => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/sermons', {
          params: {
            page: page + 1,
            size: rowsPerPage,
            search: searchQuery.trim(),
          },
        });
        const response = res.data;
        // Normalize: some APIs return array directly, some in .data
        const sermonData = Array.isArray(response) ? response : (response.data || []);
        setSermons(sermonData);
        setTotalSermons(response.total || sermonData.length || 0);
      } catch (err) {
        console.error('❌ Failed to fetch sermons:', err);
      } finally {
        setLoading(false);
      }
    },
    [axiosInstance, page, rowsPerPage]
  );

  const fetchSpeakers = useCallback(async () => {
    try {
      const res = await axiosInstance.get('/speakers');
      setSpeakers(Array.isArray(res.data) ? res.data : (res.data.data || []));
    } catch (err) {
      console.error('❌ Failed to fetch speakers:', err);
    }
  }, [axiosInstance]);

  useEffect(() => {
    fetchSpeakers();
  }, [fetchSpeakers]);

  useEffect(() => {
    fetchSermons(search);
  }, [fetchSermons, search, page, rowsPerPage]);

  const handleOpenForm = (sermon: SermonType | null = null) => {
    setEditing(sermon);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditing(null);
  };

  const handleSave = async (formData: FormData) => {
    try {
      if (editing) {
        await axiosInstance.post(`/sermons/${editing.id}`, formData, {
          params: { _method: 'PUT' }, // Using method tunneling for multipart PUT
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axiosInstance.post('/sermons', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      handleCloseForm();
      await fetchSermons(search);
    } catch (err) {
      console.error('❌ Failed to save sermon:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this sermon?')) {
      try {
        await axiosInstance.delete(`/sermons/${id}`);
        await fetchSermons(search);
      } catch (err) {
        console.error('❌ Failed to delete sermon:', err);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f7fa', minHeight: '100vh' }}>
        <Typography variant="h4" mb={4} sx={{ fontWeight: 'bold' }}>
          Sermons
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
              placeholder="Search by sermon title..."
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
              '&:hover': {
                boxShadow: '0 6px 16px rgba(25, 118, 210, 0.3)',
              }
            }}
          >
            Add Sermon
          </Button>
        </Box>

        <SermonTable
          sermons={sermons}
          search={search}
          onEdit={handleOpenForm}
          onDelete={handleDelete}
          loading={loading}
          speakers={speakers}
        />

        <TablePagination
          component="div"
          count={totalSermons}
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

        <SermonFormDialog
          open={openForm}
          onClose={handleCloseForm}
          onSave={handleSave}
          editing={editing}
          speakers={speakers}
        />
      </Box>
    </Box>
  );
}
